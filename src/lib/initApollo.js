import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';
import websiteURL from '../constants/websiteURL';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser || !global.fetch) {
  global.fetch = fetch;
}

function create(initialState) {
  return new ApolloClient({ 
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: 'https://reyeselsamad.com/api/graphql',
      // uri: `${websiteURL}`, // 'http://reyeselsamad.com/api/graphql', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      headers: { Accept: 'application/json' },
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) { 
    apolloClient = create(initialState);
  }

  return apolloClient;
}
