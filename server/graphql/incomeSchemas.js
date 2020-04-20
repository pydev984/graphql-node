var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLDate = require("graphql-date");

var IncomeModel = require("../models/Income");

var incomesType = new GraphQLObjectType({
  name: "incomes",
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
      incomes: {
        type: new GraphQLList(incomesType),
        resolve: function () {
          const incomes = IncomeModel.find().exec();
          if (!incomes) {
            throw new Error("Error");
          }
          return incomes;
        },
      },
      income: {
        type: incomesType,
        args: {
            project_id: {
            name: "project_id",
            type: GraphQLString,
          },
        },
        resolve: function (root, params) {
          const incomeDetails = IncomeModel.findOne({project_id: params.project_id}).exec();
          if (!incomeDetails) {
            throw new Error("Error");
          }
          return incomeDetails;
        },
      },
    };
  },
});

var mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      addIncome: {
        type: incomesType,
        args: {
          project_id: {
            type: new GraphQLNonNull(GraphQLString),
          },
          user_id: {
            type: new GraphQLNonNull(GraphQLString),
          },
          income: {
            type: new GraphQLNonNull(GraphQLString),
          },
          date: {
            type: new GraphQLNonNull(GraphQLDate),
          },
        },
        resolve: function (root, params) {
          const incomeModel = new IncomeModel(params);
          const newIncome = incomeModel.save();
          if (!newIncome) {
            throw new Error("Error");
          }
          return newIncome;
        },
      },
      updateIncome: {
        type: incomesType,
        args: {
          project_id: {
            type: new GraphQLNonNull(GraphQLString),
          },
          user_id: {
            type: new GraphQLNonNull(GraphQLString),
          },
          income: {
            type: new GraphQLNonNull(GraphQLString),
          },
          date: {
            type: new GraphQLNonNull(GraphQLDate),
          },
        },
        resolve(params) {
          return UserModel.update(
            {
                project_id:params.project_id
            },
            {
                user_id: params.user_id,
                income: params.income,
                date: params.date,
            },
            {useFindAndModify: false},
            function (err) {
               if (err) return next(err);
            }
          );
        },
      },
      removeUser: {
        type: incomesType,
        args: {
          project_id: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(params) {
          const remIncome = IncomeModel.findOneAndRemove(
            {
               project_id:params.project_id
            },
            {
               useFindAndModify: false
            }).exec();
          if (!remIncome) {
            throw new Error("Error");
          }
          return remIncome;
        },
      },
    };
  },
});


module.exports = new GraphQLSchema({
  query: queryType,
  mutation: mutation,
});
