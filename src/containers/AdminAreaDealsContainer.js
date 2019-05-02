import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import GraphIcon from '@material-ui/icons/Equalizer';
import SearchIcon from '@material-ui/icons/Search';
import { observer } from 'mobx-react';
import moment from 'moment';
import isBrowser from 'is-browser';
import Grid from 'material-ui/Grid';
import { DatePicker } from 'material-ui-pickers';
import TextField from 'material-ui/TextField';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { DotLoader } from 'react-spinners';
import MaterialCustomSelectInput from '../components/MaterialCustomSelectInput';
import AdminAreaDealsTableContainer from './AdminAreaDealsTableContainer';
import AdminDealsSummaryDialogBox from '../components/AdminDealsSummaryDialogBox';
import ViewDealDialogBox from '../components/ViewDealDialogBox';
import deleteDeal from '../effects/deals/deleteDeal';
import acceptDeal from '../effects/deals/acceptDeal';

const Loader = DotLoader;

const styles = theme => ({
  dealsSummaryBtn: {
    backgroundColor: '#2995F3',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#2380D1',
    },
  },
  wrapper: {
    position: 'relative',
  },
  buttonsWrapper: {
    display: 'flex',
    marginBottom: '25px',
    justifyContent: 'center',
  },
  tableFormWrapper: {
    width: '100%',
    zIndex: 2,
    marginBottom: '20px',
  },
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    marginBottom: '20px',
  }),
  formControlWrapper: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  formControlWrapperCenter: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    textAlign: 'center',
  },
  submitBtnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  submitBtnWrapper2: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2px',
  },
  searchBoxHeader: {
    marginBottom: '20px',
  },
  searchWrapper: {
    marginBottom: '25px',
  },
  heading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    color: 'rgba(0,0,0,.7)',
  },
  selectInput: {
    width: '167px',
    marginTop: '0px',
  },
  checkIcon: {
    marginLeft: '10px',
    color: 'green',
    fontSize: '.95rem',
  },
});

const selectInputItems = [
  { label: 'Deal ID' },
  { label: 'Client Name' },
  { label: 'Agent Name' },
  { label: 'Agent Real Estate Number' },
];

const searchTypes = {
  dateRange: 'dateRange',
  specific: 'specific',
};

const allDealsByDateRangeQuery = gql`
  query allDealsByDateRange($input: QueryDateRangeDealsInput!) {
    allDealsByDateRange(input: $input) {
      dealID
      date
      agentName
      agentType
      leadSource
      dealType
      propertyAddress
      state
      city
      apartmentNumber
      managementOrCobrokeCompany
      price
      clientName
      clientEmail
      paymentsTotal
      deductionsTotal
      total
      agentNotes
      status
    }
  }
`;

const allDealsByAgentNameQuery = gql`
  query allDealsByAgentName($agentName: String!) {
    allDealsByAgentName(agentName: $agentName) {
      dealID
      date
      agentName
      agentType
      leadSource
      dealType
      propertyAddress
      state
      city
      apartmentNumber
      managementOrCobrokeCompany
      price
      clientName
      clientEmail
      paymentsTotal
      deductionsTotal
      total
      agentNotes
      status
    }
  }
`;

const dealsByAgentRealEstateLicenseNumberQuery = gql`
  query dealsByAgentRealEstateLicenseNumber(
    $agentRealEstateLicenseNumber: String!
  ) {
    dealsByAgentRealEstateLicenseNumber(
      agentRealEstateLicenseNumber: $agentRealEstateLicenseNumber
    ) {
      dealID
      date
      agentName
      agentType
      leadSource
      dealType
      propertyAddress
      state
      city
      apartmentNumber
      managementOrCobrokeCompany
      price
      clientName
      clientEmail
      paymentsTotal
      deductionsTotal
      total
      agentNotes
      status
    }
  }
`;

const dealQuery = gql`
  query deal($uuid: String!) {
    deal(uuid: $uuid) {
      dealID
      date
      agentName
      agentType
      leadSource
      dealType
      propertyAddress
      state
      city
      apartmentNumber
      managementOrCobrokeCompany
      price
      clientName
      clientEmail
      paymentsTotal
      deductionsTotal
      total
      agentNotes
      status
    }
  }
`;

const allDealsByClientNameQuery = gql`
  query allDealsByAgentName($clientName: String!) {
    allDealsByAgentName(clientName: $clientName) {
      dealID
      date
      agentName
      agentType
      leadSource
      dealType
      propertyAddress
      state
      city
      apartmentNumber
      managementOrCobrokeCompany
      price
      clientName
      clientEmail
      paymentsTotal
      deductionsTotal
      total
      agentNotes
      status
    }
  }
`;

const dealsQuery = gql`
  query allDeals {
    allDeals {
      dealID
      date
      agentName
      agentType
      leadSource
      dealType
      propertyAddress
      state
      city
      apartmentNumber
      managementOrCobrokeCompany
      price
      clientName
      clientEmail
      paymentsTotal
      deductionsTotal
      total
      agentNotes
      status
      bonusPercentageAddedByAdmin
      netAgentCommission
      netCompanyCommission
    }
  }
`;

@observer
class AdminAreaDealsContainer extends Component {
  constructor(props) {
    super(props);

    const today = moment();

    this.state = {
      dealsSummaryDialogBoxOpen: false,
      startDate: moment().subtract(1, 'months'),
      endDate: today,
      fineGrainSearchType: 'Agent Real Estate Number',
      fineGrainSearchValue: '',
      currentSearchType: searchTypes.dateRange,
      maxDate: today,
      minDate: moment('2018-04-01'),
      dealsViewDialogBoxOpen: false,
      viewingDealID: '',
      viewingDealStatus: '',
      deletedDealIDS: [],
      acceptedDealIDS: [],
    };
  }

  returnQuery = () => {
    const { currentSearchType, fineGrainSearchType } = this.state;
    if (currentSearchType === searchTypes.dateRange) {
      return allDealsByDateRangeQuery;
    } else if (currentSearchType === searchTypes.specific) {
      switch (fineGrainSearchType) {
        case 'Deal ID':
          return dealQuery;
          break;
        case 'Client Name':
          return allDealsByClientNameQuery;
          break;
        case 'Agent Name':
          return allDealsByAgentNameQuery;
          break;
        case 'Agent Real Estate Number':
          return dealsByAgentRealEstateLicenseNumberQuery;
          break;
      }
    }
  };

  returnQueryName = () => {
    const { currentSearchType, fineGrainSearchType } = this.state;
    if (currentSearchType === searchTypes.dateRange) {
      return 'allDealsByDateRange';
    } else if (currentSearchType === searchTypes.specific) {
      switch (fineGrainSearchType) {
        case 'Deal ID':
          return 'deal';
          break;
        case 'Client Name':
          return 'allDealsByAgentName';
          break;
        case 'Agent Name':
          return 'allDealsByAgentName';
          break;
        case 'Agent Real Estate Number':
          return 'dealsByAgentRealEstateLicenseNumber';
          break;
      }
    }
  };

  returnQueryVariables = () => {
    const {
      currentSearchType,
      fineGrainSearchType,
      startDate,
      endDate,
      fineGrainSearchValue,
    } = this.state;
    if (currentSearchType === searchTypes.dateRange) {
      return {
        input: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      };
    } else if (currentSearchType === searchTypes.specific) {
      switch (fineGrainSearchType) {
        case 'Deal ID':
          return {
            uuid: fineGrainSearchValue,
          };
          break;
        case 'Client Name':
          return {
            clientName: fineGrainSearchValue,
          };
          break;
        case 'Agent Name':
          return {
            agentName: fineGrainSearchValue,
          };
          break;
        case 'Agent Real Estate Number':
          return {
            agentRealEstateLicenseNumber: fineGrainSearchValue,
          };
          break;
      }
    }
  };

  toggleDealsSummaryDialogBox = () => {
    this.setState({
      dealsSummaryDialogBoxOpen: !this.state.dealsSummaryDialogBoxOpen,
    });
  };

  onStartDateCHange = date => {
    if (!date) this.setState({ endDate: this.state.startDate });
    if (date.isAfter(moment())) return;
    if (date.isAfter(this.state.endDate)) return;
    this.setState({ startDate: date });
  };

  onEndDateCHange = date => {
    if (!date) this.setState({ endDate: this.state.endDate });
    if (date.isAfter(moment())) return;
    if (date.isBefore(this.state.startDate)) return;
    this.setState({ endDate: date });
  };

  onDateRangeSearch = () => {
    const { currentSearchType } = this.state;

    if (currentSearchType !== searchTypes.dateRange) {
      this.setState({ currentSearchType: searchTypes.dateRange });
    }
  };

  onSpecificSearch = () => {
    const { currentSearchType, fineGrainSearchValue } = this.state;

    if (
      !fineGrainSearchValue ||
      (fineGrainSearchValue && !fineGrainSearchValue.trim())
    )
      return;

    if (currentSearchType !== searchTypes.specific) {
      this.setState({ currentSearchType: searchTypes.specific });
    }
  };

  openDealsViewDialogBox = (dealID, status) => {
    this.setState({
      dealsViewDialogBoxOpen: true,
      viewingDealID: dealID,
      viewingDealStatus: status,
    });
  };

  closeDealsViewDialogBox = () => {
    this.setState({
      dealsViewDialogBoxOpen: false,
      viewingDealID: '',
      viewingDealStatus: '',
    });
  };

  deleteDeal = dealID => {
    deleteDeal(dealID)
      .then(res => {
        if (res.error) {
          console.log(res.error);
          return;
        }

        this.setState({
          snackbarOpen: true,
          snackbarText: 'Deal deleted successfully!',
          dealsViewDialogBoxOpen: false,
          deletedDealIDS: [...this.state.deletedDealIDS, dealID],
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  dealDeleted = dealID => {
    this.setState({
      snackbarOpen: true,
      snackbarText: 'Deal deleted successfully!',
      dealsViewDialogBoxOpen: false,
      deletedDealIDS: [...this.state.deletedDealIDS, dealID],
    });
  };

  dealAccepted = dealID => {
    this.setState({
      snackbarOpen: true,
      snackbarText: 'Deal accepted successfully!',
      dealsViewDialogBoxOpen: false,
      acceptedDealIDS: [...this.state.acceptedDealIDS, dealID],
    });
  };

  handleCloseSnackbar = () => {
    this.setState({
      snackbarOpen: false,
    });
  };

  render() {
    const { classes, userUUID } = this.props;
    const {
      dealsSummaryDialogBoxOpen,
      startDate,
      endDate,
      fineGrainSearchType,
      fineGrainSearchValue,
      currentSearchType,
      dealsViewDialogBoxOpen,
      viewingDealID,
      viewingDealStatus,
    } = this.state;
    const {
      toggleDealsSummaryDialogBox,
      onStartDateCHange,
      onEndDateCHange,
      onDateRangeSearch,
      onSpecificSearch,
      openDealsViewDialogBox,
      closeDealsViewDialogBox,
    } = this;

    return (
      <Query query={dealsQuery} ssr={false} fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
          if (loading)
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
          const intDeals = {};

          if (error) {
            console.log(error);
            return (
              <div style={{ textAlign: 'center' }}>
                We're sorry. There was an error processing your request.
              </div>
            );
          }

          // const intResult = data[this.returnQueryName()];

          // const allDeals = Array.isArray(intResult) ? intResult : [intResult];

          const allDeals = data.allDeals;

          allDeals.forEach(deal => {
            intDeals[deal.dealID] = deal;
          });

          let uniqueDeals = [];

          Object.keys(intDeals).forEach(key => {
            uniqueDeals.push(intDeals[key]);
          });

          uniqueDeals = uniqueDeals
            .filter(deal => !this.state.deletedDealIDS.includes(deal.dealID))
            .map(deal => {
              if (this.state.acceptedDealIDS.includes(deal.dealID)) {
                return { ...deal, status: 'accepted' };
              } else {
                return deal;
              }
            });

          console.log(uniqueDeals);

          return (
            <div className={classes.wrapper}>
              <div>
                <div className={classes.buttonsWrapper}>
                  <Button
                    variant="raised"
                    onClick={toggleDealsSummaryDialogBox}
                    classes={{ root: classes.dealsSummaryBtn }}
                  >
                    <GraphIcon />
                    Deals Summary
                  </Button>
                </div>
              </div>

              {/*<div className={classes.searchWrapper}>
                <Grid container spacing={16}>
                  <Grid item xs={12} lg={6}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                          align="center"
                          color="inherit"
                          className={classes.heading}
                        >
                          Search Deals By: Date Range (Default)
                          {currentSearchType === searchTypes.dateRange ? (
                            <CheckCircleIcon
                              classes={{ root: classes.checkIcon }}
                            />
                          ) : null}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div className={classes.tableFormWrapper}>
                          <Grid container spacing={16}>
                            <Grid item xs={12} sm={6}>
                              <div className={classes.formControlWrapperCenter}>
                                {isBrowser ? (
                                  <DatePicker
                                    value={startDate}
                                    onChange={onStartDateCHange}
                                    clearable
                                    label="Start Day"
                                    className={classes.textField}
                                    minDate={this.state.minDate}
                                    maxDate={
                                      this.state.endDate || this.state.maxDate
                                    }
                                    disableFuture
                                    format="MMM Do YYYY"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    maxDateMessage="Date must be less than today"
                                  />
                                ) : null}
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <div className={classes.formControlWrapperCenter}>
                                {isBrowser ? (
                                  <DatePicker
                                    value={endDate}
                                    onChange={onEndDateCHange}
                                    clearable
                                    label="End Day"
                                    className={classes.textField}
                                    disableFuture
                                    format="MMM Do YYYY"
                                    minDate={startDate || this.state.minDate}
                                    maxDate={this.state.maxDate}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    maxDateMessage="Date must be less than today"
                                  />
                                ) : null}
                              </div>
                            </Grid>
                            <Grid item xs={12}>
                              <div className={classes.submitBtnWrapper}>
                                <Button
                                  variant="raised"
                                  onClick={onDateRangeSearch}
                                  color="secondary"
                                >
                                  <SearchIcon />
                                  Search
                                </Button>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                          align="center"
                          color="inherit"
                          className={classes.heading}
                        >
                          Search Deals By: Other
                          {currentSearchType === searchTypes.specific ? (
                            <CheckCircleIcon
                              classes={{ root: classes.checkIcon }}
                            />
                          ) : null}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div className={classes.tableFormWrapper}>
                          <Grid container spacing={16}>
                            <Grid item xs={12} sm={6}>
                              <div className={classes.formControlWrapperCenter}>
                                <MaterialCustomSelectInput
                                  className={classes.selectInput}
                                  value={fineGrainSearchType || undefined}
                                  onChange={({ target }) =>
                                    this.setState({
                                      fineGrainSearchType: target.value,
                                    })
                                  }
                                  placeholder="Search Type..."
                                  label="Search Type"
                                  inputProps={{}}
                                  selectInputItems={selectInputItems}
                                />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <div className={classes.formControlWrapperCenter}>
                                <TextField
                                  id="fineGrainSearchValue"
                                  label="Search Item..."
                                  type="text"
                                  value={fineGrainSearchValue}
                                  onChange={({ target }) =>
                                    this.setState({
                                      fineGrainSearchValue: target.value,
                                    })
                                  }
                                  className={classes.textField}
                                />
                              </div>
                            </Grid>
                            <Grid item xs={12}>
                              <div className={classes.submitBtnWrapper2}>
                                <Button
                                  variant="raised"
                                  onClick={onSpecificSearch}
                                  color="secondary"
                                >
                                  <SearchIcon />
                                  Search
                                </Button>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Grid>
                </Grid>
                                </div>*/}

              <ViewDealDialogBox
                dealsViewDialogBoxOpen={dealsViewDialogBoxOpen}
                closeDealsViewDialogBox={closeDealsViewDialogBox}
                viewingDealID={viewingDealID}
                viewingDealStatus={viewingDealStatus}
                toggleSnackbarOpen={this.toggleSnackbarOpen}
                setDealSuccessfullySubmitted={this.setDealSuccessfullyEditted}
                userRole={this.props.userRole}
                deleteDeal={this.deleteDeal}
                dealAccepted={this.dealAccepted}
                dealDeleted={this.dealDeleted}
              />

              <AdminAreaDealsTableContainer
                deals={uniqueDeals}
                openDealsViewDialogBox={this.openDealsViewDialogBox}
              />
              <AdminDealsSummaryDialogBox
                toggleDealsSummaryDialogBox={toggleDealsSummaryDialogBox}
                dealsSummaryDialogBoxOpen={dealsSummaryDialogBoxOpen}
                deals={uniqueDeals}
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
                  this.snackbarUndoFunction ? (
                    <Button
                      key="undo"
                      color="secondary"
                      size="small"
                      onClick={() => {
                        this.handleCloseSnackbar();
                        if (
                          this.state.snackbarUndoFunction &&
                          typeof snackbarUndoFunction === 'function'
                        ) {
                          this.snackbarUndoFunction();
                        }
                      }}
                    >
                      UNDO
                    </Button>
                  ) : (
                    undefined
                  ),
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

export default withStyles(styles)(AdminAreaDealsContainer);
