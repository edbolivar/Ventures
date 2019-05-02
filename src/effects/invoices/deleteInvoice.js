import { GraphQLClient } from 'graphql-request';

import graphQLEndpoint from '../../constants/graphQLEndpoint';

const query = `
  mutation deleteInvoice($uuid: String!) {
    deleteInvoice(uuid: $uuid) {
      invoiceID
      error
    }
  }
`;

const client = new GraphQLClient(graphQLEndpoint, {
  credentials: 'same-origin',
});

const deleteInvoice = uuid => {
  let res;

  const variables = {
    uuid,
  };

  const finalResponseObj = {
    invoiceID: null,
    error: null,
  };

  return client
    .request(query, variables)
    .then(result => {
      res = result;
      console.log(res);

      const { deleteInvoice: data } = res;
      const { invoiceID, error } = data;

      if (error) {
        finalResponseObj.error = error;
      }

      if (!finalResponseObj.error) {
        finalResponseObj.invoiceID = invoiceID;
      }

      return finalResponseObj;
    })
    .catch(err => {
      console.log(err);
      finalResponseObj.error = 'Error reaching the server';
      return finalResponseObj;
    });
};

export default deleteInvoice;
