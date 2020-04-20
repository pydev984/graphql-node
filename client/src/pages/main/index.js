import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const GET_BOOKS = gql`
  {
    books {
      _id
      title
      author
    }
  }
`;

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  iconButton: {
    margin: theme.spacing(2)
  }
}));

export default function Main() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_BOOKS, {});

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  
  return (
    <Container maxWidth="lg" className={classes.paper}>
      <AppBar position="static">
        <h3>LIST OF BOOKS</h3>
        <div>
          <Link to="/add">
            <Fab
              color="secondary"
              aria-label="add"
              className={classes.iconButton}
            >
              <AddIcon />
            </Fab>
          </Link>
        </div>
      </AppBar>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Auther</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.books.map((book, i) => (
              <TableRow key={i} hover>
                <TableCell component="th" scope="row" align="center">
                  <Link to={`/show/${book._id}`}>{book.title}</Link>
                </TableCell>
                <TableCell align="center">{book.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
