"use strict";

const { GraphQLServerLambda } = require("graphql-yoga");
var fs = require("fs");

const typeDefs = fs.readFileSync("./schema.gql").toString("utf-8");

const resolvers = {
  Query: {
    mysql_getUser: require("./Resolvers/Queries/mysql_getUser").func,
  },
  Mutation: {
    mysql_createUser: require("./Resolvers/Mutations/mysql_createUser").func,
  },
};

const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers,
});

exports.server = lambda.graphqlHandler;
exports.playground = lambda.playgroundHandler;

// 'use strict';

// module.exports.hello = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

// Use this code if you don't use the http event with the LAMBDA-PROXY integration
// return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };
