import { GraphQLClient } from 'graphql-request';

import graphQLEndpoint from '../../constants/graphQLEndpoint';

const query = `
    mutation createAgent($input: CreateAgentInput!) {
      createAgent(input: $input) {
        agent {
          uuid
          firstName
          lastName
          email
          role
          lastLoginTimestamp
          createdAt
          agent {
            profilePicURL
            branch
            state
            mobileNumber
            officeNumber
            areaOfFocus
            realEstateLicenseNumber
            agentType
          }
        }
        signedURL
        wasSuccessful
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

const createAgent = values => {
  let res;
  let response;
  let error;

  const variables = {
    input: values,
  };

  const finalResponseObj = {
    agent: null,
    signedURL: null,
    error,
  };

  return client
    .request(query, variables)
    .then(result => {
      res = result;

      const { createAgent: data } = res;
      const { agent, signedURL } = data;

      if (!data.wasSuccessful) {
        finalResponseObj.error = data.userErrors.length
          ? {
              message: data.userErrors[0].message,
              field: data.userErrors[0].field,
            }
          : data.otherError;
      }

      if (!finalResponseObj.error) {
        finalResponseObj.agent = agent;
        finalResponseObj.signedURL = signedURL;
      }

      return finalResponseObj;
    })
    .catch(err => {
      console.log(err);
      finalResponseObj.error = 'Error reaching the server';
      return finalResponseObj;
    });
};

export default createAgent;
