var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLDate = require("graphql-date");

var ProjectModel = require("../models/Project");

var projectType = new GraphQLObjectType({
  name: "projects",
  fields: function () {
    return {
      project_id: {
        type: GraphQLString,
      },
      user_id: {
        type: GraphQLString,
      },
      income: {
        type: GraphQLString,
      },
      date: {
        type: GraphQLDate
      }
    };
  },
});

var queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      projects: {
        type: new GraphQLList(projectType),
        resolve: function () {
          const projects = ProjectModel.find().exec();
          if (!projects) {
            throw new Error("Error");
          }
          return projects;
        },
      },
      project: {
        type: projectType,
        args: {
          user_id: {
            name: "user_id",
            type: GraphQLString,
          },
        },
        resolve: function (root, params) {
          const projectDetails = ProjectModel.findOne({user_id: params.user_id}).exec();
          if (!projectDetails) {
            throw new Error("Error");
          }
          return projectDetails;
        },
      },
    };
  },
});

var mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      addProject: {
        type: projectType,
        args: {
          user_id: {
            type: new GraphQLNonNull(GraphQLString),
          },
          project_name: {
            type: new GraphQLNonNull(GraphQLString),
          },
          total_budget: {
            type: new GraphQLNonNull(GraphQLString),
          },
          deadline: {
            type: new GraphQLNonNull(GraphQLDate),
          },
        },
        resolve: function (root, params) {
          const projectModel = new ProjectModel(params);
          const newProject = projectModel.save();
          if (!newProject) {
            throw new Error("Error");
          }
          return newProject;
        },
      },
      updateProject: {
        type: projectType,
        args: {
          user_id: {
            type: new GraphQLNonNull(GraphQLString),
          },
          project_name: {
            type: new GraphQLNonNull(GraphQLString),
          },
          total_budget: {
            type: new GraphQLNonNull(GraphQLString),
          },
          deadline: {
            type: new GraphQLNonNull(GraphQLDate),
          },
        },
        resolve(params) {
          return ProjectModel.findOneAndUpdate(
            {
              user_id:params.user_id
            },
            {
              project_name: params.project_name,
              total_budget: params.total_budget,
              deadline: params.deadline,
            },
            {useFindAndModify: false},
            function (err) {
              if (err) return next(err);
            }
          );
        },
      },
      removeProject: {
        type: projectType,
        args: {
          user_id: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(params) {
          const remProject = ProjectModel.findOneAndRemove(
            {
              user_id:params.user_id
            },
            {
              useFindAndModify: false
            }).exec();
          if (!remProject) {
            throw new Error("Error");
          }
          return remProject;
        },
      },
    };
  },
});


module.exports = new GraphQLSchema({
  query: queryType,
  mutation: mutation,
});
