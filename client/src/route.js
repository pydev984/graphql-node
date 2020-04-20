import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Main from "./pages/main";
import AddBook from "./pages/add";
export default function RouterContainer() {
  return (
    <Fragment>
      <CssBaseline />
      <Router>
        <div>
          <Route exact path="/" component={Main} />
          {/* <Route path='/edit/:id' component={Edit} /> */}
          <Route path="/add" component={AddBook} />
          {/* <Route path='/show/:id' component={Show} /> */}
        </div>
      </Router>
    </Fragment>
  );
}
