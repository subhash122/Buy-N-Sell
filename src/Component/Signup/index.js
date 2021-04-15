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

  const handleSubmit = async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phoneNo = document.getElementById("phone-no").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("confirm-password").value;
    try {
      await axios({
        method: "post",
        url: `${apiURL}/users/signup`,
        data: {
          name,
          email,
          phoneNo,
          password,
          passwordConfirm,
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
                      autoFocus
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
