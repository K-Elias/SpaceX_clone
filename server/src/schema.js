import { gql } from 'apollo-server-express';

export default gql`

  enum PatchSize {
    SMALL
    LARGE
  }

  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
    books: [Book]
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  type User {
    id: ID
    createdAt: String
    image: String
    email: String!
    password: String
    tokenVersion: Int
    trips: [Launch]
  }

  type UserInput {
    user: User
    accessToken: String
  }

  type Query {
    launches(pageSize: Int, after: String): LaunchConnection
    launch(id: ID!): Launch
    me: User
  }

  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    login(email: String, password: String): UserInput
    register(image: String, email: String, password: String): User
    revokeUser: Boolean
  }
`;