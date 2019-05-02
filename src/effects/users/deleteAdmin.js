import { GraphQLClient } from 'graphql-request';

import graphQLEndpoint from '../../constants/graphQLEndpoint';

const query = `
  mutation deleteAdmin($uuid: String!) {
    deleteAdmin(uuid: $uuid) {
      error
    }
  }
`;

const client = new GraphQLClient(graphQLEndpoint, {
  credentials: 'same-origin',
});

const deleteAdmin = uuid => {
  let res;

  const variables = {
    uuid,
  };

  const finalResponseObj = {
    error: null,
  };

  return client
    .request(query, variables)
    .then(result => {
      res = result;
      console.log(res);

      const { deleteAdmin: data } = res;
      const { error } = data;

      if (error) {
        finalResponseObj.error = error;
      }

      return finalResponseObj;
    })
    .catch(err => {
      console.log(err);
      finalResponseObj.error = 'Error reaching the server';
      return finalResponseObj;
    });
};

export default deleteAdmin;
