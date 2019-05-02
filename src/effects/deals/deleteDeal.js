import { GraphQLClient } from 'graphql-request';

import graphQLEndpoint from '../../constants/graphQLEndpoint';

const query = `
  mutation deleteDeal($uuid: String!) {
    deleteDeal(uuid: $uuid) {
      dealID
      error
    }
  }
`;

const client = new GraphQLClient(graphQLEndpoint, {
  credentials: 'same-origin',
});

const deleteDeal = uuid => {
  let res;

  const variables = {
    uuid,
  };

  const finalResponseObj = {
    dealID: null,
    error: null,
  };

  return client
    .request(query, variables)
    .then(result => {
      res = result;
      console.log(res);

      const { deleteDeal: data } = res;
      const { dealID, error } = data;

      if (error) {
        finalResponseObj.error = error;
      }

      if (!finalResponseObj.error) {
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

export default deleteDeal;
