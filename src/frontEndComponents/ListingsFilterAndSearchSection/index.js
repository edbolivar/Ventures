import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
// import ListingsSearchBar from '../ListingsSearchBar';
import FineGrainListingFilters from '../FineGrainListingsFilters';
import MainListingFilters from '../MainListingFilters';

const styles = theme => ({
  root: {
    fontFamily: theme.frontEnd.typography.fontFamily.sansSerif,
    backgroundColor: '#fff',
  },
  topRow: {
    display: 'flex',
  },
});

@observer
@withStyles(styles)
class ListingsFilterAndSearchSection extends Component {
  render() {
    const { classes, onSearchInputChange, getInput, value, onSearchKeyDown, onSearchKeyUp } = this.props;
    return (
      <div className={classes.root}>
        <FineGrainListingFilters />
        {/* <MainListingFilters /> */}
      </div>
    );
  }
}

export default ListingsFilterAndSearchSection;
