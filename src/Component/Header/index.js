import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { useState } from "react";
import useStyles from "./styles.js";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";
import logo from "./logo.jpg";

const Header = ({
  isLoggedIn,
  setcurUser,
  setisLoggedIn,
  setcurPage,
  apiURL,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const alert = useAlert();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const logout = async () => {
    try {
      await axios.get(`${apiURL}/users/logout`, { withCredentials: true });
      setisLoggedIn(false);
      setcurUser("");
      alert.success("successfully logged-out");
    } catch (err) {
      alert("some error occured");
    }
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/profile" style={{ textDecoration: "none", color: "initial" }}>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Link>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Link
            className={classes.title}
            to="/"
            style={{ textDecoration: "none", color: "initial" }}
            onClick={() => setcurPage(1)}
          >
            <img src={logo} height={70} />
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isLoggedIn == true ? (
              <>
                <Button
                  size="small"
                  className={classes.logoutBtn}
                  variant="outlined"
                  color="secondary"
                  onClick={logout}
                >
                  Log-out
                </Button>
                <IconButton
                  aria-label="account of current user"
                  // aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle fontSize="large" color="secondary" />
                </IconButton>
              </>
            ) : (
              <>
                <Link
                  style={{ textDecoration: "none", color: "initial" }}
                  to={`/login`}
                >
                  <Button
                    className={classes.btn}
                    variant="outlined"
                    color="secondary"
                  >
                    Log-in
                  </Button>
                </Link>
                <Link
                  style={{ textDecoration: "none", color: "initial" }}
                  to={`/signup`}
                >
                  <Button variant="outlined" color="secondary">
                    Sign-Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default Header;
