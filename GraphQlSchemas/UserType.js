//*********************************************/
// Project : Project management Tool Using GraphQl
// Organization : CyberNest
// Author : Osama Atiq
// Date : 2023-02-28
// Assigned By : Sir Zaheer
//*********************************************/

const { GraphQLObjectType, GraphQLString } = require("graphql");

//Defining The UserType Schema for the GraphQL
const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    Name: { type: GraphQLString },
    Email: { type: GraphQLString },
    Role: { type: GraphQLString },
    message: { type: GraphQLString },
  },
});

module.exports = UserType;
