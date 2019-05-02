import { GraphQLClient } from 'graphql-request';

import graphQLEndpoint from '../../constants/graphQLEndpoint';

const query = `
  mutation updateAgent($input: UpdateAgentInput!) {
    updateAgent(input: $input) {
      agent {
        firstName
        lastName
        role
        email
        role
        agent {
          profilePicURL
          mobileNumber
          officeNumber
          branch
          profileDescription
          title
          facebook
          twitter
          instagram
        }
      }
      userErrors {
        field
        message
      }
      otherError
    }
  }
`;

const client = new GraphQLClient(graphQLEndpoint, {
  credentials: 'same-origin',
});

const updateAgent = values => {
  let res;

  const variables = {
    input: values,
  };

  const finalResponseObj = {
    agent: null,
    otherError: null,
    userErrors: [],
  };

  return client
    .request(query, variables)
    .then(result => {
      res = result;
      console.log(res);

      const { updateAgent: data } = res;
      const { agent, otherError, userErrors } = data;

      if (userErrors && userErrors.length) {
        finalResponseObj.userErrors = userErrors;
      }

      if (otherError) {
        finalResponseObj.otherError = otherError;
      }

      if (!finalResponseObj.error && !finalResponseObj.userErrors.length) {
        finalResponseObj.agent = agent;
      }

      return finalResponseObj;
    })
    .catch(err => {
      console.log(err);
      finalResponseObj.error = 'Error reaching the server';
      return finalResponseObj;
    });
};

export default updateAgent;
