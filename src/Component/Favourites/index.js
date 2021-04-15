import {
  Box,
  CardMedia,
  CircularProgress,
  ClickAwayListener,
  Container,
  IconButton,
  makeStyles,
  MenuItem,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import "./index.css";
import Footer from "../Footer";

const useStyles = makeStyles((theme) => ({
  media: {
    width: "160px",
    height: "140px",
    border: "1px solid #cca",
    margin: "7%",
    objectFit: "fill",
  },
  root: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    boxShadow: "0px 0px 2px 3px #ccc",
    borderRadius: "5px",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    marginLeft: "-110px",
    fontWeight: "600",
    height: "50px",
  },
  prog: {
    display: "flex",
    paddingLeft: "45%",
  },
}));

const Favourites = ({ curUser, apiURL }) => {
  const classes = useStyles();
  const alert = useAlert();
  const [favouriteList, setfavouriteList] = useState([]);
  const [openedId, setopenedId] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(true);
  const [operationPerformed, setoperationPerformed] = useState(0);

  const handleClick = (id) => {
    setopenedId(id);
    setOpen((prev) => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };

  const deleteFavourite = async (id) => {
    try {
      setloading(true);
      await axios({
        method: "delete",
        url: `${apiURL}/users/favourites`,
        data: {
          id,
        },
        withCredentials: true,
      });
      curUser.favourites.splice(curUser.favourites.indexOf(id), 1);
      setoperationPerformed((prev) => (prev == 0 ? 1 : 0));
      alert.success("item deleted successfully");
    } catch (err) {
      console.log(err);
      alert.error("something went wrong");
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    async function getData() {
      try {
        setloading(true);
        let response = await axios.get(`${apiURL}/users/favourites`, {
          withCredentials: true,
        });
        setfavouriteList((favouriteList) => response.data.favourites);
        setloading(false);
      } catch (err) {
        alert.error("Something went wrong, please try again later");
      }
    }
    getData();
  }, [operationPerformed]);
  return (
    <>
      {loading === true ? (
        <div className={classes.prog}>
          <CircularProgress size={70} />
        </div>
      ) : (
        <>
          <div className="content">
            <Container className="grid--container" maxWidth="md">
              <Typography
                variant="h4"
                style={{ fontWeight: 600 }}
                color="primary"
              >
                Your Favourites
              </Typography>
              <br></br>
              {favouriteList.map((el, index) => (
                <>
                  <div
                    key={el._id}
                    className={
                      !el.active ? "overlay favourite-box" : "favourite-box"
                    }
                  >
                    <Link to={`/item/${el._id}`}>
                      <CardMedia
                        className={classes.media}
                        component="img"
                        image={`${el.images[0]}`}
                        title={`${el.name}`}
                      />
                    </Link>
                    <Link
                      to={`/item/${el._id}`}
                      style={{
                        textDecoration: "none",
                        color: "initial",
                        marginLeft: "5%",
                      }}
                    >
                      {!el.active ? (
                        <h1 style={{ color: "orange" }}>
                          this item is no longer available
                        </h1>
                      ) : (
                        ""
                      )}
                      <Box pt={4}>
                        <Box>
                          <Typography variant="h6" color="textPrimary">
                            {el.name}
                          </Typography>
                        </Box>
                        <Box py={2}>
                          <Typography variant="subtitle1">
                            ₹{el.price}
                          </Typography>
                        </Box>
                      </Box>
                    </Link>
                    <div className="popper">
                      <ClickAwayListener
                        onClickAway={
                          openedId === index ? handleClickAway : () => {}
                        }
                      >
                        <div className={classes.root}>
                          <IconButton
                            onClick={() => {
                              handleClick(index);
                            }}
                          >
                            <MoreHorizIcon fontSize="large" />
                          </IconButton>
                          {openedId === index ? (
                            open ? (
                              <div className={classes.dropdown}>
                                <MenuItem
                                  onClick={() => deleteFavourite(el._id)}
                                >
                                  Delete Favourite
                                </MenuItem>
                              </div>
                            ) : null
                          ) : null}
                        </div>
                      </ClickAwayListener>
                    </div>
                  </div>
                </>
              ))}
            </Container>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};
export default Favourites;
