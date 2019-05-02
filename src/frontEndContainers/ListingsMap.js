import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { BounceLoader } from 'react-spinners';
import ListingsMap from '../frontEndComponents/ListingsMap';

const Loader = BounceLoader;

const GOOGLE_MAPS_API_KEY = 'AIzaSyALC0RdIvbBvmFCj8P5IBClasErYh0QqdQ';

@observer
class ListingsMapContainer extends Component {
  render() {
    return (
      <ListingsMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Loader
              color="#f44336"
              loading
            />
          </div>
        }
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default ListingsMapContainer;
