

//*********************************************/
// Project : Project management Tool Using GraphQl
// Organization : CyberNest
// Author : Osama Atiq
// Date : 2023-02-28
// Assigned By : Sir Zaheer
//*********************************************/

const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

//Defining The Project Type Schema for the GraphQL

const ProjectsType = new GraphQLObjectType({
  name: "Projects",
  fields: {
    Title: { type: GraphQLString },
    Week: { type: GraphQLInt },
    Status: { type: GraphQLString },
    Comment: { type: GraphQLString },
    Technologies: { type: GraphQLString },
    Create_Update_Ts: { type: GraphQLString },
    Create_Update: { type: GraphQLString },
    Lead: { type: GraphQLString },
    Owner: { type: GraphQLString },
    Manager: { type: GraphQLString },
    message: { type: GraphQLString },
  },
});

module.exports = ProjectsType;
