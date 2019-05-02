import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import { DotLoader } from 'react-spinners';
import Chance from 'chance';
import isBrowser from 'is-browser';
import moment from 'moment';
import Papa from 'papaparse';
import AdminAreaDealsTable from '../components/AdminAreaDealsTable';
import debounce from '../utils/debounce';
import { capitalize } from '../utils/stringUtils';
import { padStringToDecimalString } from '../utils/Math';

const chance = new Chance();

const Loader = DotLoader;

const returnAgentType = number => {
  if (number < 33) {
    return 60;
  } else if (number < 66) {
    return 70;
  } else {
    return 80;
  }
};

const styles = theme => ({
  root: {
    position: 'relative',
  },
  progress: {
    margin: theme.spacing.unit * 2,
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'block',
  },
  progressWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '60px 20px',
    borderRadius: '3px',
    backgroundColor: '#fff',
    zIndex: 2,
  },
});

const columns = [
  { name: 'dealID', title: 'Deal ID' },
  { name: 'date', title: 'Date' },
  { name: 'agentName', title: 'Agent Name' },
  { name: 'agentType', title: 'Agent Type' },
  { name: 'dealType', title: 'Deal Type' },
  { name: 'clientName', title: 'Client Name' },
  { name: 'clientEmail', title: 'Client Email' },
  { name: 'propertyAddress', title: 'Property Address' },
  { name: 'propertyCity', title: 'Property City' },
  { name: 'propertyState', title: 'Property State' },
  { name: 'managementOrCobrokeCompany', title: 'Mgmt/Co-Broke Co.' },
  { name: 'rentOrSalePrice', title: 'Rent/Sale Price' },
  { name: 'deductionsTotal', title: 'Deductions Total' },
  { name: 'paymentsTotal', title: 'Payments Total' },
  { name: 'netPaymentsTotal', title: 'Net Payments Total' },
  { name: 'bonusPercentageAddedByAdmin', title: "Agent's Bonus %" },
  { name: 'netAgentCommission', title: 'Net Agent Commission' },
  { name: 'netCompanyCommission', title: 'Net Company Commission' },
  { name: 'status', title: 'Status' },
  { name: 'view', title: 'View' },
];

@observer
class DealsTableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableIsLoading: true,
      selection: [],
    };
  }

  createRows = () => {
    return this.props.deals.map(deal => {
      const {
        dealID,
        date,
        agentName,
        agentType,
        leadSource,
        dealType,
        propertyAddress,
        state,
        city,
        apartmentNumber,
        managementOrCobrokeCompany,
        price,
        clientName,
        clientEmail,
        paymentsTotal,
        deductionsTotal,
        total,
        status,
        bonusPercentageAddedByAdmin,
        netAgentCommission,
        netCompanyCommission,
      } = deal;

      return {
        dealID,
        date: moment(date).format('MM/DD/YYYY'),
        agentName,
        agentType: `${agentType}%`,
        dealType,
        clientName,
        clientEmail,
        propertyAddress,
        propertyCity: city,
        propertyState: state,
        managementOrCobrokeCompany,
        rentOrSalePrice: `$${padStringToDecimalString(
          Number(price || 0).toLocaleString()
        )}`,
        deductionsTotal: `$${padStringToDecimalString(
          Number(deductionsTotal || 0).toLocaleString()
        )}`,
        paymentsTotal: `$${padStringToDecimalString(
          Number(paymentsTotal || 0).toLocaleString()
        )}`,
        netPaymentsTotal: `$${padStringToDecimalString(
          Number(total || 0).toLocaleString()
        )}`,
        bonusPercentageAddedByAdmin:
          status === 'pending'
            ? undefined
            : `%${bonusPercentageAddedByAdmin || 0}`,
        netAgentCommission:
          status === 'pending'
            ? undefined
            : `$${padStringToDecimalString(
                Number(netAgentCommission || 0).toLocaleString()
              )}`,
        netCompanyCommission:
          status === 'pending'
            ? undefined
            : `$${padStringToDecimalString(
                Number(netCompanyCommission || 0).toLocaleString()
              )}`,
        status: capitalize(status),
        view: {
          type: 'action',
          onClick: () =>
            debounce(
              this.props.openDealsViewDialogBox.bind(null, dealID, status),
              1000,
              true
            )(),
        },
      };
    });
  };

  convertDealsToCSV = () => {
    const { deals } = this.props;
    const { selection } = this.state;

    console.log(selection);
    console.log(deals);

    if (!selection || !selection.length) return;

    const csvContent = Papa.unparse(
      deals.filter(deal => selection.includes(deal.dealID)).map(deal => ({
        ...deal,
        date: moment(deal.date).format('MM/DD/YYYY'),
      })),
      {
        header: true,
      }
    );

    if (this._csvLink) {
      this._csvLink.setAttribute(
        'href',
        `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`
      );
      this._csvLink.setAttribute('download', 'deals_data.csv');
      this._csvLink.click();
    }
  };

  changeSelection = selection => {
    this.setState({ selection });
  };

  render() {
    const { tableIsLoading, selection } = this.state;
    const { classes, small, ...rest } = this.props;
    return (
      <div className={classes.root}>
        {tableIsLoading ? (
          <div
            className={classes.progressWrapper}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 'calc(100vh - 180px)',
            }}
          >
            <Loader color="#f44336" loading />
          </div>
        ) : null}
        <AdminAreaDealsTable
          {...rest}
          changeSelection={this.changeSelection}
          selection={selection}
          convertDealsToCSV={this.convertDealsToCSV}
          small={small}
          onMount={() =>
            tableIsLoading ? this.setState({ tableIsLoading: false }) : null
          }
          columns={columns}
          rows={this.createRows()}
        />
        <a
          href="#"
          id="csvLink"
          ref={ref => (this._csvLink = ref)}
          style={{
            visibility: 'hidden',
            position: 'absolute',
            poniterEvents: 'none',
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(DealsTableContainer);
