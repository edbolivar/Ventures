import React from 'react';
import { observer } from 'mobx-react';
import isBrowser from 'is-browser';
import Chance from 'chance';
import Layout from '../frontEndComponents/FrontEndLayout';
import { initStore } from '../models';
import ListingsFilterAndSearchSection from '../frontEndContainers/ListingsFilterAndSearchSection';
import MapAndListingsSection from '../frontEndComponents/MapAndListingsSection';
import withData from '../lib/withData';

const chance = new Chance();

const listings = [
  {
    featuredPhotoURL: `http://picsum.photos/314/234/?random?${chance.integer({ min: 1, max: 1000 })}`,
    otherPhotoURLs: [
      `http://picsum.photos/314/234/?random?${chance.integer({ min: 1, max: 1000 })}`,
      `http://picsum.photos/314/234/?random?${chance.integer({ min: 1, max: 1000 })}`,
      `http://picsum.photos/314/234/?random?${chance.integer({ min: 1, max: 1000 })}`,
    ],
    address: '225 West 60th Street, Manhattan NY, 10023',
    neighborhood: 'Jackson Heights',
    price: 2000,
    beds: 3,
    baths: 2,
    isLiked: false,
    isNoFee: false,
    monthsOfFreeRent: 0,
    sqFootage: 6339,
    type: 'Residential Rental',
    id: 'jxj595h9f5i5fj',
  },
  {
    featuredPhotoURL: `http://picsum.photos/314/234/?random?${chance.integer({ min: 1, max: 1000 })}`,
    otherPhotoURLs: [
      `http://picsum.photos/314/234/?random?${chance.integer({ min: 1, max: 1000 })}`,
      `http://picsum.photos/314/234/?random?${chance.integer({ min: 1, max: 1000 })}`,
      `http://picsum.photos/314/234/?random?${chance.integer({ min: 1, max: 1000 })}`,
    ],
    address: '452 West 60th Street, Manhattan NY, 10023',
    neighborhood: 'Jackson Heights',
    price: 1400,
    beds: 2,
    baths: 2,
    isLiked: true,
    isNoFee: true,
    monthsOfFreeRent: 1,
    sqFootage: 5225,
    type: 'Residential Rental',
    id: 'o3j9dn9un3nj3',
  },
  {
    featuredPhotoURL: `http://picsum.photos/314/234/?random?${chance.integer({ min: 1, max: 1000 })}`,
    otherPhotoURLs: [
      `http://picsum.photos/314/234/?random?${chance.integer({ min: 1, max: 1000 })}`,
      `http://picsum.photos/314/234/?random?${chance.integer({ min: 1, max: 1000 })}`,
      `http://picsum.photos/314/234/?random?${chance.integer({ min: 1, max: 1000 })}`,
    ],
    address: '893 West 60th Street, Manhattan NY, 10023',
    neighborhood: 'SoHo',
    price: 3700,
    beds: 3,
    baths: 3,
    isLiked: false,
    isNoFee: false,
    monthsOfFreeRent: 2,
    sqFootage: 5225,
    type: 'Residential Rental',
    id: 'cinoervtoi4in',
  },
];
@observer
class Listings extends React.Component {
  static getInitialProps({ req }) {
    const isServer = !!req;
    return { cookieJWTData: req && req.cookies ? req.cookies.jwtData : null, isServer };
  }

  constructor(props) {
    super(props);
    this.store = initStore(props.isServer, props.cookieJWTData);

    // for debugging only!!!
    if (isBrowser && !window._appStore) window._appStore = this.store;
  }

  onSubmitSearch = value => {
    console.log(value);
  }

  render() {
    const { onSubmitSearch } = this;

    return (
      <Layout UserStore={this.store.UserStore} headerBoxShadowOff>
        <div>
          <ListingsFilterAndSearchSection onSubmit={onSubmitSearch} />
          <MapAndListingsSection listings={listings} />
        </div>
      </Layout>
    );
  }
}

export default withData(Listings);
