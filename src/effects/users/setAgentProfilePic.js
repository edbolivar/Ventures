import { GraphQLClient } from 'graphql-request';

import graphQLEndpoint from '../../constants/graphQLEndpoint';

const query = `
    mutation setAgentProfilePic($input: SetAgentProfilePicInput!) {
      setAgentProfilePic(input: $input) {
        url
        wasSuccessful
        otherError
        userErrors {
          field
          message
        }
      }
    }
  `;

const client = new GraphQLClient(graphQLEndpoint, {
  credentials: 'same-origin',
});

const setAgentProfilePic = (agentID, fileName) => {
  let res;
  let response;
  let error;

  const variables = {
    input: {
      agentID,
      fileName,
    },
  };

  const finalResponseObj = {
    url: null,
    otherError: null,
    userErrors: null,
  };

  return client
    .request(query, variables)
    .then(result => {
      res = result;

      const { setAgentProfilePic: data } = res;
      const { otherError, userErrors } = data;

      if (!data.wasSuccessful) {
        if (otherError) finalResponseObj.error = otherError;
        if (userErrors) finalResponseObj.userErrors = userErrors;
      } else {
        finalResponseObj.url = data.url;
      }

      return finalResponseObj;
    })
    .catch(err => {
      console.log(err);
      finalResponseObj.error = 'Error reaching the server';
      return finalResponseObj;
    });
};

export default setAgentProfilePic;
