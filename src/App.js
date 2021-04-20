import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Component/Header";
import Products from "./Component/Products";
import Item from "./Component/Item";
import Favourites from "./Component/Favourites";
import Ads from "./Component/Ads";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import Profile from "./Component/Profile/Profile";
import axios from "axios";
import ProductForm from "./Component/ProductForm";
import "./App.css";

const apiURL = "http://localhost:4000";
// const apiURL = "https://buy-n-sell--app.herokuapp.com";

const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [curUser, setcurUser] = useState("");
  const [curPage, setcurPage] = useState(1);
  useEffect(() => {
    axios
      .get(`${apiURL}/users/authorization`, { withCredentials: true })
      .then((response) => {
        setcurUser(response.data.user);
        setisLoggedIn(true);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="section">
      <Router>
        <Header
          apiURL={apiURL}
          isLoggedIn={isLoggedIn}
          setcurUser={setcurUser}
          setisLoggedIn={setisLoggedIn}
          setcurPage={setcurPage}
        />
        <Switch>
          <Route exact path="/">
            <Products
              apiURL={apiURL}
              isLoggedIn={isLoggedIn}
              curUser={curUser}
              setcurUser={setcurUser}
              curPage={curPage}
              setcurPage={setcurPage}
            />
          </Route>
          <Route exact path="/login">
            <Login
              apiURL={apiURL}
              setisLoggedIn={setisLoggedIn}
              setcurUser={setcurUser}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route exact path="/profile">
            <Profile
              curUser={curUser}
              setcurUser={setcurUser}
              apiURL={apiURL}
            />
          </Route>
          <Route exact path="/productform">
            <ProductForm apiURL={apiURL} />
          </Route>
          <Route exact path="/signup">
            <Signup apiURL={apiURL} />
          </Route>
          <Route exact path="/item/:id">
            <Item apiURL={apiURL} isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/favourites">
            <Favourites apiURL={apiURL} curUser={curUser} />
          </Route>
          <Route exact path="/ads">
            <Ads apiURL={apiURL} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
