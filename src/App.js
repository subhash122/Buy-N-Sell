import { Button, Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import faker from 'faker';
import "./App.css";
import Header from "./Component/Header";
import Products from "./Component/Products";
import Item from "./Component/Item";
import Category from "./Component/Category";
const apiURL = "https://fakestoreapi.com";

const App = () => {
  return (
    <div className="section">
      <Header />
      <Router>
        <Switch>
          <Container className="grid--container" maxWidth="md">
            <Route exact path="/">
              <Products apiURL={apiURL} />
            </Route>
            <Route path="/category-:type" component={Category}>
              <Category apiURL={apiURL} />
            </Route>
            <Route path="/item/:id">
              <Item apiURL={apiURL} />
            </Route>
          </Container>
        </Switch>
      </Router>
      {/* <Container className="grid--container" maxWidth="md"><Products /></Container> */}
    </div>
  );
};

export default App;
