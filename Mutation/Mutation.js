//*********************************************/
// Project : Project management Tool Using GraphQl
// Organization : CyberNest
// Author : Osama Atiq
// Date : 2023-02-28
// Assigned By : Sir Zaheer
//*********************************************/

//Acquiring required  DataTypes

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
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

const Mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    // Add a  Project Sub Query Starts From Here
    addProject: {
      type: ProjectsType,
      description: "Add a new project",
      args: {
        Title: { type: new GraphQLNonNull(GraphQLString) },
        Week: { type: new GraphQLNonNull(GraphQLInt) },
        Status: { type: new GraphQLNonNull(GraphQLString) },
        Comment: { type: new GraphQLNonNull(GraphQLString) },
        Technologies: { type: new GraphQLNonNull(GraphQLString) },
        Lead: { type: new GraphQLNonNull(GraphQLString) },
        Owner: { type: new GraphQLNonNull(GraphQLString) },
        Manager: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const newProject = new Project({
          Title: args.Title,

          Week: args.Week,

          Status: args.Status,

          Comment: args.Comment,

          Technologies: args.Technologies,

          Create_Update_Ts: new Date().toISOString(),

          Create_Update: "not Updated Yet",

          Lead: args.Lead,

          Owner: args.Owner,

          Manager: args.Manager,
        });
        const savedProject = await newProject.save();
        return savedProject;
      },
    },
    //Assign a Project to a Team Member Starts From Here.

    AssignProject: {
      type: AssignProjectType,
      description: "Assign a Project to a Team Member",
      args: {
        Project_id: { type: new GraphQLNonNull(GraphQLString) },
        Team_Member_Name: { type: new GraphQLNonNull(GraphQLString) },
        Role: { type: new GraphQLNonNull(GraphQLString) },
        Status: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const user = await User.findOne({ username: args.Team_Member_Name });

        if (!user) {
          throw new Error(
            `User with username ${args.Team_Member_Name} not found.`
          );
        }

        const project = await Project.findById(args.Project_id);

        if (!project) {
          throw new Error(`Project with ID ${args.Project_id} not found.`);
        }
        const Assign_pro = await Assign_Project.findOne({
          Team_Member_Name: args.Team_Member_Name,
        });

        if (Assign_pro) {
          throw new Error(
            `User with username ${args.Team_Member_Name} already assigned to this project`
          );
        }

        let assignProject = new Assign_Project({
          Project_id: args.Project_id,
          Team_Member_Name: args.Team_Member_Name,
          Role: args.Role,
          Status: args.Status,
        });

        if (
          args.Role === "Developer" ||
          args.Role === "PM" ||
          args.Role === "UI/UX" ||
          args.Role === "QA"
        ) {
          const Assign_Product = await assignProject.save();

          return Assign_Product;
        } else {
          throw new Error("Please select a valid role");
        }
      },
    },

    // Update a Project Sub Query Starts From Here

    UpdateProject: {
      type: ProjectsType,
      description: "Update a Project",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        Title: { type: new GraphQLNonNull(GraphQLString) },
        Week: { type: new GraphQLNonNull(GraphQLInt) },
        Status: { type: new GraphQLNonNull(GraphQLString) },
        Comment: { type: new GraphQLNonNull(GraphQLString) },
        Technologies: { type: new GraphQLNonNull(GraphQLString) },
        Lead: { type: new GraphQLNonNull(GraphQLString) },
        Owner: { type: new GraphQLNonNull(GraphQLString) },
        Manager: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const { id, ...updates } = args;
        const updatedProject = await Project.findByIdAndUpdate(
          id,
          {
            ...updates,
            Create_Update: new Date().toISOString(),
          },
          { new: true }
        );

        if (!updatedProject) {
          throw new Error(`Project with ID ${id} not found.`);
        }

        return updatedProject;
      },
    },
    // Delete a Project Sub Query Starts From Here

    deleteProject: {
      type: ProjectsType,
      description: "Delete a project",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        try {
          const result = await Project.deleteOne({ _id: args.id });
          if (result.deletedCount === 1) {
            return { message: "Project Deleted Successfully" };
          } else {
            return { message: "Project not found" };
          }
        } catch (error) {
          return { message: "Error in deleting Project" };
        }
      },
    },
    //Assign a Project Weekly Basis Starts From Here
    AssignProjectWeekly: {
      type: AssignByWeekType,
      description: "Assign a Project Weekly Basis",
      args: {
        Project_id: { type: new GraphQLNonNull(GraphQLID) },
        User_id: { type: new GraphQLNonNull(GraphQLID) },
        Week: { type: new GraphQLNonNull(GraphQLString) },
        hours_Planned: { type: new GraphQLNonNull(GraphQLString) },
        hours_Spent: { type: new GraphQLNonNull(GraphQLString) },
        message: { type: GraphQLString },
      },

      resolve: async (parent, args) => {
        const project = await Project.findById(args.Project_id);

        if (!project) {
          throw new Error(`Project with ID ${args.Project_id} not found.`);
        }

        const user = await User.findById(args.User_id);

        if (!user) {
          throw new Error(`User with ID ${args.User_id} not found.`);
        }
        if (user && project) {
          if (user.Role == "Admin") {
            let assignProject = new Project_Weekly({
              Project_id: args.Project_id,
              User_id: args.User_id,
              Week: args.Week,
              hours_Planned: args.hours_Planned,
              hours_Spent: args.hours_Spent,
            });

            assignProject.save();

            return { message: "Project Successfully Assigned" };
          } else {
            return { message: "You are Not Authorized to Assign Projects" };
          }
        }
      },
    },
    EditAssignedProject: {
      type: AssignByWeekType,
      description: "Edit an Assigned Project",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        hours_Planned: { type: GraphQLString },
        hours_Spent: { type: GraphQLString },
        Week: { type: (GraphQLString) },
        message: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const assignedProject = await Project_Weekly.findById(args.id);
    
        if (!assignedProject) {
          throw new Error(`Assigned Project with ID ${args.id} not found.`);
        }
    
        const user = await User.findById(assignedProject.User_id);
    
        if (!user) {
          throw new Error(`User with ID ${assignedProject.User_id} not found.`);
        }
    
        if (user && user.Role == "Admin") {
          assignedProject.hours_Planned = args.hours_Planned || assignedProject.hours_Planned;
          assignedProject.hours_Spent = args.hours_Spent || assignedProject.hours_Spent;
          assignedProject.message = args.message || assignedProject.message;
    
          await assignedProject.save();
    
          return { message: "Assigned Project Successfully Updated" };
        } else {
          return { message: "You are Not Authorized to Edit Assigned Projects" };
        }
      },
    }
    
    
  },
});

module.exports = Mutation;
