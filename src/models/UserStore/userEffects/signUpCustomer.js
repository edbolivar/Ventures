import { GraphQLClient } from 'graphql-request';
import graphQLEndpoint from '../../../constants/graphQLEndpoint';

const query = `
    mutation registerCustomer($input: RegisterCustomerInput!) {
      registerCustomer(input: $input) {
        customer {
          uuid
          role
        }
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

async function signUpCustomer(self, values) {
  let response;
  let error;

  const variables = {
    input: {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    },
  };

  const finalResponseObj = {
    response,
    error,
  };

  return client
    .request(query, variables)
    .then(res => {
      const { registerCustomer: data } = res;
      const { customer } = data;

      if (!data.wasSuccessful) {
        finalResponseObj.error = data.userErrors.length
          ? data.userErrors[0].message
          : data.otherError;
      }

      if (!finalResponseObj.error) {
        self.setUser(customer);
      }

      return finalResponseObj;
    })
    .catch(err => {
      console.log(err);
      finalResponseObj.error = 'Error reaching the server';
      return finalResponseObj;
    });
}

export default signUpCustomer;
