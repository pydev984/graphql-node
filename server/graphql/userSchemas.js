var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLDate = require("graphql-date");

var UserModel = require("../models/User");

var usersType = new GraphQLObjectType({
  name: "users",
  fields: function () {
    return {
      user_name: {
        type: GraphQLString,
      },
      user_birthday: {
        type: GraphQLString,
      },
    };
  },
});

var queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      users: {
        type: new GraphQLList(usersType),
        resolve: function () {
          const users = UserModel.find().exec();
          if (!users) {
            throw new Error("Error");
          }
          return users;
        },
      },
      user: {
        type: usersType,
        args: {
          user_name: {
            name: "user_name",
            type: GraphQLString,
          },
        },
        resolve: function (root, params) {
          const userDetails = UserModel.findOne({user_name: params.user_name}).exec();
          if (!userDetails) {
            throw new Error("Error");
          }
          return userDetails;
        },
      },
    };
  },
});

var mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      addUser: {
        type: usersType,
        args: {
          user_name: {
            type: new GraphQLNonNull(GraphQLString),
          },
          user_birthday: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: function (root, params) {
          const userModel = new UserModel(params);
          const newUser = userModel.save();
          if (!newUser) {
            throw new Error("Error");
          }
          return newUser;
        },
      },
      updateUser: {
        type: usersType,
        args: {
          user_name: {
            type: new GraphQLNonNull(GraphQLString),
          },
          user_birthday: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(root, params) {
          const updatedUser =  UserModel.findOneAndUpdate(
            {
              user_name:params.user_name
            },
            {
              $set: {user_birthday: params.user_birthday},
            },
            {useFindAndModify: false},
            function (err) {
              if (err) return next(err);
            }
          );
          return updatedUser;
        },
      },
      removeUser: {
        type: usersType,
        args: {
          user_name: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(root, params) {
          const remUser = UserModel.findOneAndRemove(
            {
              user_name:params.user_name
            },
            {
              useFindAndModify: false
            },
            ).exec();
          if (!remUser) {
            throw new Error("Error");
          }
          return remUser;
        },
      },
    };
  },
});


module.exports = new GraphQLSchema({
  query: queryType,
  mutation: mutation,
});
