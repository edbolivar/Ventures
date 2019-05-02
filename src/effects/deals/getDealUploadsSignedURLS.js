import { GraphQLClient } from 'graphql-request';

import graphQLEndpoint from '../../constants/graphQLEndpoint';

const query = `
  mutation getDealFileUploadsSignedURLS($input: [GetSignedURLSInput!]!) {
    getDealFileUploadsSignedURLS(input: $input) {
      dealID
      items {
        itemName
        fileName
        signedURL
        uuid
        error
      }
      error
    }
  }
`;

const client = new GraphQLClient(graphQLEndpoint, {
  credentials: 'same-origin',
});

const getDealUploadsSignedURLS = values => {
  let res;
  let error;

  const variables = {
    input: values,
  };

  const finalResponseObj = {
    dealID: null,
    items: null,
    error,
  };

  return client
    .request(query, variables)
    .then(result => {
      res = result;
      console.log(res);

      const { getDealFileUploadsSignedURLS: data } = res;
      const { items, dealID } = data;

      if (!data.wasSuccessful) {
        finalResponseObj.error = data.error;
      }

      if (!finalResponseObj.error) {
        finalResponseObj.items = items;
        finalResponseObj.dealID = dealID;
      }

      return finalResponseObj;
    })
    .catch(err => {
      console.log(err);
      finalResponseObj.error = 'Error reaching the server';
      return finalResponseObj;
    });
};

export default getDealUploadsSignedURLS;
