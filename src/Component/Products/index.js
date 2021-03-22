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
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import useStyles from "./styles.js";

const Products = ({ apiURL }) => {
  const classes = useStyles();
  const [pageItem, setpageItem] = useState([0, 8]);
  const [items, setItems] = useState([]);
  const [apiResponse, setapiResponse] = useState([]);

  useEffect(() => {
    if (apiResponse != false) {
      let startIndex = pageItem[0];
      let endIndex = pageItem[1];
      let tempItems = [];
      for (let i = startIndex; i <= endIndex; i++) {
        let markup = (
          <Grid item md={4}>
            <Link
              style={{ textDecoration: "none", color: "initial" }}
              to={`/item/${apiResponse[i].id}`}
            >
              <Card className={classes.element}>
                {/* <CardActionArea> */}
                <CardMedia
                  className={classes.media}
                  component="img"
                  alt="loading"
                  height="170"
                  image={apiResponse[i].image}
                  title={apiResponse[i].title}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="subtitle1"
                  >
                    {apiResponse[i].title.substring(0, 25)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="h6"
                  >
                    Price :{apiResponse[i].price}
                  </Typography>
                </CardContent>
                {/* </CardActionArea> */}
              </Card>
            </Link>
          </Grid>
        );
        tempItems.push(markup);
      }
      setItems(tempItems);
    }
  }, [apiResponse, pageItem]);

  const nextPage = () => {
    if (pageItem[1] + 9 <= apiResponse.length - 1) {
      setpageItem([pageItem[1] + 1, pageItem[1] + 9]);
    } else {
      setpageItem([pageItem[1] + 1, apiResponse.length - 1]);
    }
  };
  const prevPage = () => {
    setpageItem([pageItem[0] - 9, pageItem[0] - 1]);
  };
  useEffect(() => {
    let data;
    async function getData() {
      data = await fetch(`${apiURL}/products`);
      data = await data.json();
      setapiResponse((apiResponse) => data);
    }
    getData();
  }, []);
  return (
    <div>
      {items == false ? (
        <div className={classes.prog}>
          <CircularProgress size={90} />
        </div>
      ) : (
        <>
          <Link to="/favourites">
            <Button className={classes.favourites} endIcon={<FavoriteIcon />}>
              Favourites
            </Button>
          </Link>
          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Categories</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.content}>
              <Box mt={0.5}></Box>
              <Link
                style={{ textDecoration: "none", color: "initial" }}
                to={`Category-electronics`}
              >
                <Typography>Electronics</Typography>
              </Link>
              <Box mt={0.5}></Box>
              <Link
                style={{ textDecoration: "none", color: "initial" }}
                to={`Category-jewelery`}
              >
                <Typography>Jewelery</Typography>
              </Link>
              <Box mt={0.5}></Box>
              <Link
                style={{ textDecoration: "none", color: "initial" }}
                to={`Category-men clothing`}
              >
                <Typography>Men clothing</Typography>
              </Link>
              <Box mt={0.5}></Box>
              <Link
                style={{ textDecoration: "none", color: "initial" }}
                to={`Category-women clothing`}
              >
                <Typography>Women clothing</Typography>
              </Link>
            </AccordionDetails>
          </Accordion>

          <div className={classes.root}>
            <Grid container spacing={8}>
              {items}
            </Grid>
          </div>
          {pageItem[0] !== 0 ? (
            <Button
              className="btn-prev"
              onClick={prevPage}
              variant="contained"
              color="primary"
              // className={classes.button}
              startIcon={<NavigateBeforeIcon />}
            >
              Prev
            </Button>
          ) : (
            ""
          )}
          {pageItem[1] !== apiResponse.length - 1 ? (
            <Button
              className="btn-next"
              onClick={nextPage}
              variant="contained"
              color="primary"
              // className={classes.button}
              endIcon={<NavigateNextIcon />}
            >
              Next
            </Button>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default Products;
