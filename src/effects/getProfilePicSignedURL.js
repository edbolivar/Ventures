import { GraphQLClient } from 'graphql-request';

import graphQLEndpoint from '../constants/graphQLEndpoint';

const query = `
  mutation getProfilePicSignedURL($input: getProfilePicSignedURLInput!) {
    getProfilePicSignedURL(input: $input) {
      item {
        signedURL
        fileName
        error
      }
      error
    }
  }
`;

const client = new GraphQLClient(graphQLEndpoint, {
  credentials: 'same-origin',
});

const getProfilePicSignedURL = value => {
  let res;
  let error;

  const variables = {
    input: value,
  };

  const finalResponseObj = {
    signedURL: null,
    error: null,
  };

  return client
    .request(query, variables)
    .then(result => {
      res = result;
      console.log(res);

      const { getProfilePicSignedURL: data } = res;
      const { item, error } = data;

      if (error) {
        finalResponseObj.error = error;
      }

      if (!finalResponseObj.error) {
        finalResponseObj.item = item;
      }

      return finalResponseObj;
    })
    .catch(err => {
      console.log(err);
      finalResponseObj.error = 'Error reaching the server';
      return finalResponseObj;
    });
};

export default getProfilePicSignedURL;
