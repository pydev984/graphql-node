import React, { useState } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
    makeStyles,
    Container,
    AppBar,
    Paper,  
    Grid,
    TextField,
    Button
  } from "@material-ui/core";

  // Picker
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const GET_BOOK = gql`
  query book($bookId: String) {
    book(id: $bookId) {
      _id
      isbn
      title
      author
      description
      published_year
      publisher
      updated_date
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation updateBook(
    $id: String!
    $isbn: String!
    $title: String!
    $author: String!
    $description: String!
    $publisher: String!
    $published_year: Int!
  ) {
    updateBook(
      id: $id
      isbn: $isbn
      title: $title
      author: $author
      description: $description
      publisher: $publisher
      published_year: $published_year
    ) {
      updated_date
    }
  }
`;

const useStyles = makeStyles(theme => ({
    form: {
      margin: theme.spacing(2)
    },
    formElement: {
      width: "100%",
      margin: theme.spacing(1)
    },
    container: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary
    },
    iconButton: {
      margin: theme.spacing(2)
    }
}));

export default function EditBook(props) {
    const classes = useStyles();
    const {} = useQuery();
    const {} = useMutation();
    return (
      <div></div>
    );
}