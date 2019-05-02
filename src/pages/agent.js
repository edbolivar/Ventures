import React from 'react';
import { observer } from 'mobx-react';
import isBrowser from 'is-browser';
import Layout from '../frontEndComponents/FrontEndLayout';
import { initStore } from '../models';
import withData from '../lib/withData';
import AgentProfileContainer from '../frontEndContainers/AgentProfile';
import { Router } from '../routes';

@observer
class Listing extends React.Component {
  static getInitialProps({ req, query }) {
    const isServer = !!req;
    return {
      cookieJWTData: req && req.cookies ? req.cookies.jwtData : null,
      isServer,
      agentID: query.id,
    };
  }

  constructor(props) {
    super(props);

    if (!props.agentID && isBrowser) Router.pushRoute('agents-front-end');

    this.store = initStore(props.isServer, props.cookieJWTData);

    // for debugging only!!!
    if (isBrowser && !window._appStore) window._appStore = this.store;
  }

  render() {
    const { agentID } = this.props;

    return (
      <Layout UserStore={this.store.UserStore}>
        <AgentProfileContainer agentID={agentID} />
      </Layout>
    );
  }
}

export default withData(Listing);
