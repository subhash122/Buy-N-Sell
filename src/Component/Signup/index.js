import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./style";
import Footer from "../Footer";
import { useAlert } from "react-alert";
import axios from "axios";
import { useState } from "react";

const Signup = ({ apiURL }) => {
  const classes = useStyles();
  const alert = useAlert();
  const [signUp, setsignUp] = useState(false);
  const [userDetails, setuserDetails] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    passwordConfirm: "",
  });

  const handleNameChange = (event) => {
    setuserDetails({ ...userDetails, name: event.target.value });
  };
  const handleEmailChange = (event) => {
    setuserDetails({ ...userDetails, email: event.target.value });
  };
  const handlePhoneNoChange = (event) => {
    setuserDetails({ ...userDetails, phoneNo: event.target.value });
  };
  const handlePasswordChange = (event) => {
    setuserDetails({ ...userDetails, password: event.target.value });
  };
  const handlePasswordConfirmChange = (event) => {
    setuserDetails({ ...userDetails, passwordConfirm: event.target.value });
  };
  const handleSubmit = async () => {
    try {
      await axios({
        method: "post",
        url: `${apiURL}/users/signup`,
        data: {
          name: userDetails.name,
          email: userDetails.email,
          phoneNo: userDetails.phoneNo,
          password: userDetails.password,
          passwordConfirm: userDetails.passwordConfirm,
        },
        withCredentials: true,
      });
      alert.success("Sign up successfully. please login");
      setsignUp(true);
    } catch (err) {
      alert.error(err.response.data.message);
    }
  };
  return (
    <>
      {signUp == true ? (
        <Redirect to="/login" />
      ) : (
        <Container className="grid--container" maxWidth="md">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="name"
                      name="Name"
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      value={userDetails.name}
                      onChange={handleNameChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={userDetails.email}
                      onChange={handleEmailChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="phone-no"
                      label="PhoneNo"
                      name="PhoneNo"
                      autoComplete="phoneNo"
                      value={userDetails.phoneNo}
                      onChange={handlePhoneNoChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="Confirm Password"
                      label="Confirm Password"
                      type="password"
                      id="confirm-password"
                      autoComplete="confirm-password"
                      value={userDetails.passwordConfirm}
                      onChange={handlePasswordConfirmChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link to="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </Container>
      )}
      <Footer />
    </>
  );
};
export default Signup;
