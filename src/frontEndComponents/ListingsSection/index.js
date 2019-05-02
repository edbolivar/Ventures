import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Chance from 'chance';
import Select from 'react-select';
import ListingCard from '../ListingCard';

const chance = new Chance();

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    color: 'rgba(0,0,0,.7)',
  },
  lisingsOptions: {
    display: 'flex',
    paddingLeft: '15px',
    paddingRight: '15px',
    justifyContent: 'center',
    alignItems: 'center',
    height: '48px',
    width: '100%',
    fontSize: '0.9rem',
    backgroundColor: 'rgb(244, 245, 249)',
  },
  listingsWrapper: {
    padding: '20px',
    paddingBottom: '0',
    height: 'calc(100% - 48px)',
    overflow: 'auto',
  },
});

const containerComponent = ({ children, ...props }) => (
  <div style={{ height: '100%', overflow: 'auto' }} {...props}>
    {children}
  </div>
);

const selectStyles = {
  container: (base, state) => ({
    ...base,
    width: '200px',
    cursor: 'pointer',
    minHeight: '30px !important',
    height: '30px !important',
  }),
  control: (base, state) => ({
    ...base,
    cursor: 'pointer',
    minHeight: '30px !important',
    height: '30px !important',
    backgroundColor: '#fff',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      borderRadius: '4px',
    };
  },
};

const sortingTypes = [
  { value: 'defaultSort', label: 'Default Sort' },
  { value: 'priceLowToHigh', label: 'Price - Low to High' },
  { value: 'priceHighToLow', label: 'Price - High to How' },
  { value: 'listedDate', label: 'Listed Date- Most Recent' },
  { value: 'neighborhood', label: 'Neighborhood - A to Z' },
  { value: 'address', label: 'Address - A to Z' },
];

@observer
@withStyles(styles)
class ListingsSection extends Component {
  renderListings = listingItems =>
    listingItems.map(listingItem => {
      const {
        featuredPhotoURL,
        otherPhotoURLs,
        address,
        neighborhood,
        price,
        beds,
        baths,
        isLiked,
        isNoFee,
        monthsOfFreeRent,
        sqFootage,
        type,
        id,
      } = listingItem;

      return (
        <Grid key={id} item xs={12} md={6}>
          <ListingCard
            featuredPhotoURL={featuredPhotoURL}
            otherPhotoURLs={otherPhotoURLs}
            address={address}
            neighborhood={neighborhood}
            price={price}
            beds={beds}
            baths={baths}
            isLiked={isLiked}
            isNoFee={isNoFee}
            monthsOfFreeRent={monthsOfFreeRent}
            sqFootage={sqFootage}
            type={type}
            id={id}
          />
        </Grid>
      );
    });

  render() {
    const { classes, listings, setSortingType } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.lisingsOptions}>
          <Select
            defaultValue={sortingTypes[0]}
            styles={selectStyles}
            options={sortingTypes}
            placeholder="Sort..."
            blurInputOnSelect
            isSearchable={false}
            onInputChange={setSortingType}
          />
        </div>
        <div className={classes.listingsWrapper}>
          <Grid container spacing={24} component={containerComponent}>
            {listings && this.renderListings(listings)}
          </Grid>
        </div>
      </div>
    );
  }
}

export default ListingsSection;
