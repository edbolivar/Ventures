import React, { Component } from 'react';
import { observer } from 'mobx-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { DotLoader } from 'react-spinners';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AdminDashboard from '../components/AdminDashboard';

const Loader = DotLoader;

const dealsQuery = gql`
  query allDeals {
    allDeals {
      date
      status
      netCompanyCommission
      total
    }
  }
`;

const styles = theme => ({
  root: {
    maxWidth: '100%',
    marginBottom: 10,
  },
  snackBar: {
    marginTop: 30,
  },
});

@observer
@withStyles(styles)
class DashboardContainer extends Component {
  state = {
    snackbarText: '',
    snackbarOpen: false,
  };
  
  returnDealData = (deals = []) => {
    const currentMonth = moment().month();
    let netCommissionsToDate = 0;
    let currentMonthNetCommissions = 0;
    let currentMonthNumOfDealsCommissions = 0;
    let numOfPendingDeals = 0;
    let grossCommissionsToDate = 0;

    deals.forEach(deal => {
      if (deal.status === 'pending') {
        numOfPendingDeals += 1;
        return;
      }

      grossCommissionsToDate += deal.total;

      netCommissionsToDate += deal.netCompanyCommission || 0;

      if (moment(deal.date).month() === currentMonth) {
        currentMonthNumOfDealsCommissions += 1;
        currentMonthNetCommissions += deal.netCompanyCommission || 0;
      }
    });

    return {
      netCommissionsToDate,
      currentMonthNetCommissions,
      currentMonthNumOfDealsCommissions,
      numOfPendingDeals,
      grossCommissionsToDate,
    };
  };

  submittedNewsAlertSuccessfully = () => {
    this.setState({
      snackbarText: 'News/Alert item successfully submitted!',
      snackbarOpen: true,
    });
  };

  deletedNewsAlertSuccessfully = () => {
    this.setState({
      snackbarText: 'News/Alert item successfully deleted!',
      snackbarOpen: true,
    });
  };

  handleCloseSnackbar = () => {
    this.setState({
      snackbarOpen: false,
    });
  };

  render() {
    const { userUUID, classes } = this.props;
    return (
      <Query
        query={dealsQuery}
        variables={{ uuid: userUUID }}
        ssr={false}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 'calc(100vh - 110px)',
                  boxShadow:
                    '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
                }}
              >
                <Loader color="#f44336" loading />
              </div>
            );
          }

          if (error) {
            console.log(error);
            return (
              <div style={{ textAlign: 'center' }}>
                We're sorry. There was an error processing your request.
              </div>
            );
          }

          const {
            netCommissionsToDate,
            currentMonthNetCommissions,
            currentMonthNumOfDealsCommissions,
            numOfPendingDeals,
            grossCommissionsToDate,
          } = this.returnDealData(data.allDeals);

          return (
            <div>
              <AdminDashboard
                userUUID={this.props.userUUID}
                userRole={this.props.userRole}
                grossCommissionsToDate={grossCommissionsToDate}
                netCommissionsToDate={netCommissionsToDate}
                currentMonthNetCommissions={currentMonthNetCommissions}
                submittedNewsAlertSuccessfully={
                  this.submittedNewsAlertSuccessfully
                }
                deletedNewsAlertSuccessfully={this.deletedNewsAlertSuccessfully}
                submittedNewsAlertSuccessfully={
                  this.submittedNewsAlertSuccessfully
                }
                currentMonthNumOfDealsCommissions={
                  currentMonthNumOfDealsCommissions
                }
                numOfPendingDeals={numOfPendingDeals}
              />

              <Snackbar
                classes={{ root: classes.snackBar }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={this.state.snackbarOpen}
                autoHideDuration={4000}
                onClose={this.handleCloseSnackbar}
                message={
                  <span id="snackbar-id">{this.state.snackbarText}</span>
                }
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={this.handleCloseSnackbar}
                  >
                    <CloseIcon />
                  </IconButton>,
                ]}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default DashboardContainer;
