import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import faker from 'faker';
import "./App.css";
import Header from "./Component/Header";
import Footer from "./Component/Footer/Footer";
import Products from "./Component/Products";
import Item from "./Component/Item";
import Category from "./Component/Category";
import Favourites from "./Component/Favourites";
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
const apiURL = "https://fakestoreapi.com";

const App = () => {
  return (
    <div className="section">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Products apiURL={apiURL} />
          </Route>
          <Container className="grid--container" maxWidth="md">
            <Route path="/category-:type" component={Category}>
              <Category apiURL={apiURL} />
            </Route>
            <Route path="/item/:id">
              <Item apiURL={apiURL} />
            </Route>
            <Route path="/favourites">
              <Favourites apiURL={apiURL} />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
          </Container>
        </Switch>
      </Router>
      {/* <Container className="grid--container" maxWidth="md"><Products /></Container> */}
    </div>
  );
};

export default App;
