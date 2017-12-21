import { makeExecutableSchema } from "graphql-tools";
import gql from "graphql-tag";

import resolvers from "./resolvers";

const typeDefs = gql`
  type CompanyData {
    name: String
    slug: String
  }

  type User {
    firstName: String
    lastName: String
    email: String
    companyData: [CompanyData]
  }

  type PageInfo {
    total: Int
    page: Int
    pages: Int
  }

  type Users {
    edges: [User]
    pageInfo: PageInfo
  }

  type Query {
    user(_id: String): User
    users(page: Int!, limit: Int!, firstName: String, lastName: String): Users
  }
`;

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
