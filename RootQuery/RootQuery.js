//*********************************************/
// Project : Project management Tool Using GraphQl
// Organization : CyberNest
// Author : Osama Atiq
// Date : 2023-02-28
// Assigned By : Sir Zaheer
//*********************************************/

//Accquring The Required GrapHQl datatypes
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
} = require("graphql");

//Acquiring required  Models of MongoDB
const Project = require("../models/projects_model");
const Assign_Project = require("../models/assign_project_model");
const User = require("../models/user_model");
const Project_Weekly = require("../models/Assign_by_Week_model");

//Acquiring required  GraphQL Schema
const ProjectsType = require("../GraphQlSchemas/ProjectType");
const AssignProjectType = require("../GraphQlSchemas/AssignProjectType");
const AssignByWeekType = require("../GraphQlSchemas/AssignByWeekType");

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    //Querying All Projects

    projects: {
      type: new GraphQLList(ProjectsType),
      description: "List of all projects",
      resolve: async () => {
        const projects = await Project.find();
        return projects;
      },
    },
    //Querying All Assigned Projects

    assignList: {
      type: new GraphQLList(AssignProjectType),
      description: "List of all Assigned Projects",
      resolve: async () => {
        const assignProjects = await Assign_Project.find();
        return assignProjects;
      },
    },
    //Querying All Assigned By Week
    projectList: {
      type: new GraphQLList(ProjectsType),
      description: "List of all projects with same week",
      args: {
        week: { type: GraphQLInt },
      },
      resolve: (parent, { week }) => {
        const projects = Project.find({ Week: week });

        return projects;
      },
    },
  }),
});

module.exports = RootQuery;
