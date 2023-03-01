
//*********************************************/
// Project : Project management Tool Using GraphQl
// Organization : CyberNest
// Author : Osama Atiq
// Date : 2023-02-28
// Assigned By : Sir Zaheer
//*********************************************/

const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

//Defining The Assign Project Schema for the GraphQL
const AssignProjectType = new GraphQLObjectType({
    name: "AssignProject",
    fields: {
      Project_id: { type: GraphQLString },
      Team_Member_Name: { type: GraphQLString },
      Role: { type: GraphQLString },
      Status: { type: GraphQLString },
    },
  });

  
module.exports = AssignProjectType;