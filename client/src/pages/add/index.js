import React, { useState } from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Fab from "@material-ui/core/Fab";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

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

const ADD_BOOK = gql`
  mutation AddBook(
    $isbn: String!
    $title: String!
    $author: String!
    $description: String!
    $publisher: String!
    $published_year: Date!
  ) {
    addBook(
      isbn: $isbn
      title: $title
      author: $author
      description: $description
      publisher: $publisher
      published_year: $published_year
    ) {
      _id
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

export default function AddBook(props) {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    isbn: "",
    title: "",
    author: "",
    description: "",
    publisher: "",
    published_year: Date.now()
  });

  const [addBook, { loading, error }] = useMutation(ADD_BOOK);

  const onReset = e => {
    e.preventDefault();
  };

  const onSubmit = e => {
    e.preventDefault();    
    addBook({variables: formData});
  };

  const onFormDataChange = (value, key) => {
    setFormData({ ...formData, [key]: value });
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error(Please try again...)</p>;

  return (
    <Container maxWidth="lg" className={classes.container}>
      <AppBar position="static">
        <h3>ADD BOOK</h3>
        <Link to="/">
          <Fab
            color="secondary"
            aria-label="return"
            className={classes.iconButton}
          >
            <KeyboardReturnIcon />
          </Fab>
        </Link>
      </AppBar>
      <Paper className={classes.paper}>
        <form onSubmit={onSubmit} noValidate>
          <Paper style={{ padding: 16 }}>
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  value={formData.isbn}
                  onChange={e => onFormDataChange(e.target.value, "isbn")}
                  label="ISBN"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  value={formData.title}
                  onChange={e => onFormDataChange(e.target.value, "title")}
                  label="Title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  value={formData.author}
                  onChange={e => onFormDataChange(e.target.value, "author")}
                  label="Author"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Description"
                  value={formData.description}
                  onChange={e =>
                    onFormDataChange(e.target.value, "description")
                  }
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  value={formData.publisher}
                  onChange={e => onFormDataChange(e.target.value, "publisher")}
                  label="Publisher"
                />
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={12}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={formData.published_year}
                    onChange={value =>
                      onFormDataChange(value, "published_year")
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <Grid item style={{ marginTop: 16 }}>
                <Button type="button" variant="contained" onClick={onReset}>
                  Reset
                </Button>
              </Grid>
              <Grid item style={{ marginTop: 16 }}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Paper>
    </Container>
  );
}
