import { useState, useEffect } from "react";
import {Button, Container} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import faker from 'faker';
import "./App.css";
import Header from "./Component/Header";
import Products from "./Component/Products";
import Item from "./Component/Item";
const apiURL="https://fakestoreapi.com";

const App = () => {
  return (
    <div className="section">
      <Header />
      <Router>
        <Switch>
            <Route exact path="/">
              <Container className="grid--container" maxWidth="md"><Products apiURL={apiURL} /></Container>
            </Route>
            <Route  path="/item/:id">
            <Container className="grid--container" maxWidth="md"><Item apiURL={apiURL}/></Container>
            </Route>
        </Switch>
      </Router>
      {/* <Container className="grid--container" maxWidth="md"><Products /></Container> */}
    </div>
  );
};

export default App;
