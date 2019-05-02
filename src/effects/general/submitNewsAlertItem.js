import { GraphQLClient } from 'graphql-request';

import graphQLEndpoint from '../../constants/graphQLEndpoint';

const query = `
  mutation submitNewsAlertItem($input: SubmitNewsAlertItemInput!) {
    submitNewsAlertItem(input: $input) {
      item {
        uuid
        html
        string
        type
        createdAt
      }
      error
    }
  }
`;

const client = new GraphQLClient(graphQLEndpoint, {
  credentials: 'same-origin',
});

const submitNewsAlertItem = values => {
  let res;

  const variables = {
    input: values,
  };

  const finalResponseObj = {
    item: null,
    error: null,
  };

  return client
    .request(query, variables)
    .then(result => {
      res = result;
      console.log(res);

      const { submitNewsAlertItem: data } = res;
      const { error, item } = data;

      if (error) {
        finalResponseObj.error = error;
      } else if (item) {
        finalResponseObj.item = item;
      } else {
        finalResponseObj.error =
          'There was a server error when creating your item!';
      }

      return finalResponseObj;
    })
    .catch(err => {
      console.log(err);
      finalResponseObj.error = 'Error reaching the server';
      return finalResponseObj;
    });
};

export default submitNewsAlertItem;
