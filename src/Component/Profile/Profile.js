import {
  Button,
  CircularProgress,
  Divider,
  FormLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import FavoriteIcon from "@material-ui/icons/Favorite";
import StoreIcon from "@material-ui/icons/Store";
import "./index.css";
import axios from "axios";
import { useAlert } from "react-alert";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    marginTop: 30,
    marginLeft: "60%",
  },
  menu: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    color: "white",
    width: "30%",
    boxSizing: "border-box",
  },
  content: {
    backgroundColor: "#fff",
    margin: "5% 5%",
  },
  field: {
    width: "60%",
  },
  prog: {
    display: "flex",
    paddingLeft: "45%",
  },
});

const Profile = ({ curUser, setcurUser, apiURL }) => {
  const classes = useStyles();
  const alert = useAlert();
  const [userObj, setuserObj] = useState(curUser);
  const [loading, setloading] = useState(false);
  const handleNameChange = (event) => {
    setuserObj({ ...userObj, name: event.target.value });
  };
  const handleEmailChange = (event) => {
    setuserObj({ ...userObj, email: event.target.value });
  };
  const handleNumberChange = (event) => {
    setuserObj({ ...userObj, phoneNo: event.target.value });
  };
  const submitUser = async () => {
    try {
      setloading(true);
      let updatedUser = await axios({
        method: "patch",
        url: `${apiURL}/users/updateMe`,
        data: {
          name: userObj.name,
          email: userObj.email,
          phoneNo: userObj.phoneNo,
        },
        withCredentials: true,
      });
      setcurUser(updatedUser.data.data.user);
      alert.success("Data updated successfully");
    } catch (err) {
      alert.error(err.response.data.message);
    } finally {
      setloading(false);
    }
  };
  const changePassword = async () => {
    let passwordCurrent = document.getElementById("current-password").value;
    let password = document.getElementById("password").value;
    let passwordConfirm = document.getElementById("confirm-password").value;
    try {
      setloading(true);
      await axios({
        method: "patch",
        url: `${apiURL}/users/updatePassword`,
        data: {
          passwordCurrent,
          password,
          passwordConfirm,
        },
        withCredentials: true,
      });
      alert.success("password updated successfully");
      document.getElementById("current-password").value = "";
      document.getElementById("password").value = "";
      document.getElementById("confirm-password").value = "";
    } catch (err) {
      alert.error(err.response.data.message);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    setuserObj(curUser);
  }, [curUser]);
  return (
    <>
      {loading === true ? (
        <div className={classes.prog}>
          <CircularProgress size={60} />
        </div>
      ) : (
        <div>
          <div className="user-view">
            <div className={classes.menu}>
              <ul className="nav">
                <li className="list-item">
                  <SettingsIcon className="icon" />
                  SETTINGS
                </li>
                <li className="list-item">
                  <Link
                    to="/ads"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <StoreIcon className="icon" />
                    MY ADS
                  </Link>
                </li>
                <li className="list-item">
                  <Link
                    to="/favourites"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <FavoriteIcon className="icon" />
                    MY FAVOURITES
                  </Link>
                </li>
              </ul>
            </div>
            <div className={classes.content}>
              <h2>Your Account Settings</h2>
              <div className="form-input">
                <FormLabel>Name</FormLabel>
                <br></br>
                <TextField
                  variant="filled"
                  margin="normal"
                  className={classes.field}
                  variant="filled"
                  onChange={handleNameChange}
                  value={`${userObj.name}`}
                />
              </div>
              <div className="form-input">
                <FormLabel>Email</FormLabel>
                <br></br>
                <TextField
                  variant="filled"
                  margin="normal"
                  className={classes.field}
                  variant="filled"
                  onChange={handleEmailChange}
                  value={`${userObj.email}`}
                />
              </div>
              <div className="form-input">
                <FormLabel>Phone</FormLabel>
                <br></br>
                <TextField
                  variant="filled"
                  margin="normal"
                  className={classes.field}
                  variant="filled"
                  onChange={handleNumberChange}
                  value={`${userObj.phoneNo}`}
                />
              </div>
              <Button className={classes.root} onClick={submitUser}>
                save settings
              </Button>
              <Divider class="divider" />
              <h2>Password Change</h2>
              <div className="form-input">
                <FormLabel>Current Password</FormLabel>
                <br></br>
                <TextField
                  id="current-password"
                  variant="filled"
                  margin="normal"
                  type="password"
                  className={classes.field}
                />
              </div>
              <div className="form-input">
                <FormLabel>Password</FormLabel>
                <br></br>
                <TextField
                  id="password"
                  variant="filled"
                  margin="normal"
                  type="password"
                  className={classes.field}
                  variant="filled"
                />
              </div>
              <div className="form-input">
                <FormLabel>Confirm Password</FormLabel>
                <br></br>
                <TextField
                  id="confirm-password"
                  variant="filled"
                  margin="normal"
                  type="password"
                  className={classes.field}
                  variant="filled"
                />
              </div>
              <Button className={classes.root} onClick={changePassword}>
                save password
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
export default Profile;
