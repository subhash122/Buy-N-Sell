import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { useState } from "react";
import { useAlert } from "react-alert";
import { Link, Redirect } from "react-router-dom";
import useStyles from "./style";
import Footer from "../Footer";

const Login = ({ setisLoggedIn, setcurUser, isLoggedIn, apiURL }) => {
  const classes = useStyles();
  const alert = useAlert();
  const [userDetails, setuserDetails] = useState({
    email: "",
    password: "",
  });
  const handleEmailChange = (event) => {
    setuserDetails({ ...userDetails, email: event.target.value });
  };
  const handlePasswordChange = (event) => {
    setuserDetails({ ...userDetails, password: event.target.value });
  };
  const handleSubmit = async () => {
    let response;
    try {
      response = await axios({
        method: "post",
        url: `${apiURL}/users/login`,
        data: {
          email: userDetails.email,
          password: userDetails.password,
        },
        withCredentials: true,
      });
      setisLoggedIn(true);
      setcurUser(response.data.data.user);
      alert.success("Login successfully");
    } catch (err) {
      alert.error(err.response.data.message);
    }
  };
  return (
    <>
      {isLoggedIn == true ? (
        <Redirect to="/" />
      ) : (
        <>
          <div className={classes.content}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={userDetails.email}
                    onChange={handleEmailChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={userDetails.password}
                    onChange={handlePasswordChange}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={handleSubmit}
                  >
                    Sign In
                  </Button>
                </form>
              </div>
            </Container>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};
export default Login;
