import gql from "graphql-tag";

export const BALANCES = gql`
  query ($walletAddress: String!) {
    balances(walletAddress: $walletAddress) {
      value
      bnbValue
      currency {
        address
        name
        symbol
        price
        logo
      }
    }
  }
`;
