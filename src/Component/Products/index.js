import {
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  IconButton,
} from "@material-ui/core";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import StoreIcon from "@material-ui/icons/Store";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { Link, Redirect, useLocation } from "react-router-dom";
import Footer from "../Footer";
import useStyles from "./styles.js";
import { PaginationItem } from "@material-ui/lab";

const Products = ({
  isLoggedIn,
  curUser,
  setcurUser,
  curPage,
  setcurPage,
  apiURL,
}) => {
  const classes = useStyles();
  const location = useLocation();
  const [productList, setproductList] = useState([]);
  const alert = useAlert();
  const query = new URLSearchParams(useLocation().search);
  const [loading, setloading] = useState(true);
  const [countPages, setcountPages] = useState(0);

  const addToFavourites = async (id) => {
    try {
      let response = await axios({
        method: "post",
        url: `${apiURL}/users/favourites`,
        data: {
          id,
        },
      });
      setcurUser(response.data.user);
    } catch (err) {
      alert.error("some error occured. please try again");
    }
  };
  const deleteFromFavourites = async (id) => {
    try {
      let response = await axios({
        method: "delete",
        url: `${apiURL}/users/favourites`,
        data: {
          id,
        },
      });
      setcurUser(response.data.user);
    } catch (err) {
      alert.error("some error occured. please try again");
    }
  };
  const pageChange = (event, value) => {
    setcurPage(value);
  };

  useEffect(() => {
    async function getData() {
      try {
        setloading(true);
        let data = await axios.get(`${apiURL}/products${location.search}`);
        setloading(false);
        setproductList((productList) => data.data.data.products);
        setcountPages(Math.ceil(data.data.countProducts / 9));
      } catch (err) {
        alert.error("error in loading . please try again");
      }
    }
    getData();
  }, [location]);

  return (
    <div>
      {loading == true ? (
        <div className={classes.prog}>
          <CircularProgress size={70} />
        </div>
      ) : (
        <>
          <div className={classes.wholecontainer}>
            <Grid container spacing={0}>
              <Grid item md>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="center"
                  spacing={4}
                >
                  <Grid item md={12}>
                    <Accordion className={classes.accordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>
                          Categories
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={classes.content}>
                        <Box mt={0.5}></Box>
                        <Link
                          style={{ textDecoration: "none", color: "initial" }}
                          to={`?category=electronics${
                            query.get("sort")
                              ? `&sort=${query.get("sort")}`
                              : ""
                          }`}
                          onClick={() => setcurPage(1)}
                        >
                          <Typography>Electronics</Typography>
                        </Link>
                        <Box mt={0.5}></Box>
                        <Link
                          style={{ textDecoration: "none", color: "initial" }}
                          to={`?category=fashion${
                            query.get("sort")
                              ? `&sort=${query.get("sort")}`
                              : ""
                          }`}
                          onClick={() => setcurPage(1)}
                        >
                          <Typography>Fashion</Typography>
                        </Link>
                        <Box mt={0.5}></Box>
                        <Link
                          style={{ textDecoration: "none", color: "initial" }}
                          to={`?category=vehicles${
                            query.get("sort")
                              ? `&sort=${query.get("sort")}`
                              : ""
                          }`}
                          onClick={() => setcurPage(1)}
                        >
                          <Typography>Vehicles</Typography>
                        </Link>
                        <Box mt={0.5}></Box>
                        <Link
                          style={{ textDecoration: "none", color: "initial" }}
                          to={`?category=lifestyle${
                            query.get("sort")
                              ? `&sort=${query.get("sort")}`
                              : ""
                          }`}
                          onClick={() => setcurPage(1)}
                        >
                          <Typography>Home Decor</Typography>
                        </Link>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  <Grid item md={12}>
                    <Accordion className={classes.accordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>
                          Sort-by
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={classes.content}>
                        <Box mt={0.5}></Box>
                        <Link
                          style={{ textDecoration: "none", color: "initial" }}
                          to={`?sort=priceIncreasing${
                            query.get("category")
                              ? `&category=${query.get("category")}`
                              : ""
                          }`}
                          onClick={() => setcurPage(1)}
                        >
                          <Typography>Price-Increasing</Typography>
                        </Link>
                        <Box mt={0.5}></Box>
                        <Link
                          style={{ textDecoration: "none", color: "initial" }}
                          to={`?sort=priceDecreasing${
                            query.get("category")
                              ? `&category=${query.get("category")}`
                              : ""
                          }`}
                          onClick={() => setcurPage(1)}
                        >
                          <Typography>Price-Decreasing</Typography>
                        </Link>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={8}>
                <Grid className={classes.root} container spacing={5}>
                  {productList.map((el) => (
                    <Grid
                      key={el._id}
                      item
                      md={4}
                      className={classes.singleProduct}
                    >
                      {isLoggedIn === true ? (
                        <IconButton className={classes.favIcon}>
                          {curUser.favourites.includes(el._id) ? (
                            <FavoriteIcon
                              fontSize="large"
                              color="secondary"
                              onClick={() => deleteFromFavourites(el._id)}
                            />
                          ) : (
                            <FavoriteBorderIcon
                              fontSize="large"
                              color="secondary"
                              onClick={() => addToFavourites(el._id)}
                            />
                          )}
                        </IconButton>
                      ) : null}
                      <Link
                        style={{ textDecoration: "none", color: "initial" }}
                        to={`/item/${el._id}`}
                      >
                        <Card className={classes.element}>
                          <CardMedia
                            className={classes.media}
                            component="img"
                            alt="loading"
                            height="200"
                            image={el.images[0]}
                            title={el.name}
                          />

                          <CardContent>
                            <Typography gutterBottom variant="subtitle1">
                              {el.name.substring(0, 25)}...
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="h6"
                            >
                              Price :{el.price}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Link>
                    </Grid>
                  ))}
                </Grid>

                <Pagination
                  className={classes.paginationItem}
                  count={countPages}
                  color="secondary"
                  page={curPage}
                  onChange={pageChange}
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`?page=${item.page}${
                        query.get("category")
                          ? `&category=${query.get("category")}`
                          : ""
                      }${
                        query.get("sort") ? `&sort=${query.get("sort")}` : ""
                      }`}
                      {...item}
                    />
                  )}
                />
              </Grid>
              <Grid className={classes.sideItem} item md>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item md={12}>
                    {isLoggedIn == true ? (
                      <Link
                        to="/favourites"
                        style={{ textDecoration: "none", color: "initial" }}
                      >
                        <Button
                          className={classes.favourites}
                          endIcon={<FavoriteIcon />}
                        >
                          Favourites
                        </Button>
                      </Link>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item md={12}>
                    {isLoggedIn == true ? (
                      <Link
                        to="/productform"
                        style={{ textDecoration: "none", color: "initial" }}
                      >
                        <Button
                          className={classes.favourites}
                          endIcon={<AddCircleIcon />}
                        >
                          sell
                        </Button>
                      </Link>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item md={12}>
                    {isLoggedIn == true ? (
                      <Link
                        to="/ads"
                        style={{ textDecoration: "none", color: "initial" }}
                      >
                        <Button
                          className={classes.favourites}
                          endIcon={<StoreIcon />}
                        >
                          my ads
                        </Button>
                      </Link>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Products;
