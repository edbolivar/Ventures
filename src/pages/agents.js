import React from 'react';
import { observer } from 'mobx-react';
import isBrowser from 'is-browser';
import Chance from 'chance';
import Layout from '../frontEndComponents/FrontEndLayout';
import { initStore } from '../models';
import withData from '../lib/withData';
import AllAgentsView from '../frontEndComponents/AllAgentsView';

const chance = new Chance();

@observer
class Listing extends React.Component {
  static getInitialProps({ req }) {
    const isServer = !!req;
    return {
      cookieJWTData: req && req.cookies ? req.cookies.jwtData : null,
      isServer,
    };
  }

  constructor(props) {
    super(props);
    this.store = initStore(props.isServer, props.cookieJWTData);

    // for debugging only!!!
    if (isBrowser && !window._appStore) window._appStore = this.store;

    this.state = {
      agents: this.createAgents(35),
    };
  }

  createAgents = num => {
    const agents = [];
    for (let i = 0; i < num; i++) {
      const agent = {
        profilePhotoURL: `http://picsum.photos/325/325/?random?${chance.integer(
          {
            min: 1,
            max: 1000,
          }
        )}`,
        name: chance.name(),
        email: chance.email(),
        mobileNumber: chance.phone(),
        agentID: chance.integer({ min: 100000, max: 999999 }),
      };

      agents.push(agent);
    }

    return agents;
  };

  render() {
    return (
      <Layout UserStore={this.store.UserStore}>
        <AllAgentsView agents={this.state.agents} />
      </Layout>
    );
  }
}

export default withData(Listing);
