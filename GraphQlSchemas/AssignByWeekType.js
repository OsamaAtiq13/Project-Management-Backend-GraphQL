//*********************************************/
// Project : Project management Tool Using GraphQl
// Organization : CyberNest
// Author : Osama Atiq
// Date : 2023-02-28
// Assigned By : Sir Zaheer
//*********************************************/

const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

//Defining The Assigned By week Schema for the GraphQL
const AssignByWeekType = new GraphQLObjectType({
  name: "AssignByWeek",
  fields: {
    Project_id: {
      type: GraphQLInt,
    },
    User_id: {
      type: GraphQLInt,
    },
    Week: {
      type: GraphQLString,
    },
    hours_Planned: {
      type: GraphQLString,
    },
    hours_Spent: { type: GraphQLString },

    message: { type: GraphQLString },
  },
});

module.exports = AssignByWeekType;
