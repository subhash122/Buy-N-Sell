import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import Item from "../Item";

const useStyles = makeStyles((theme) => ({
  element: {
    maxWidth: 250,
    height: 250,
  },
  root: {
    flexGrow: 1,
  },
  prog: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    paddingLeft: "40%",
  },
  accordion: {
    position: "absolute",
    top: "25%",
    left: "2%",
    boxShadow: "none",
  },
  heading: {
    fontWeight: "600",
  },
  content: {
    display: "block",
  },
}));

const Products = ({ apiURL }) => {
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const [apiResponse, setapiResponse] = useState([]);
  useEffect(() => {
    let data;
    async function getData() {
      data = await fetch(`${apiURL}/products`);
      data = await data.json();
      setapiResponse((apiResponse) => data);
      let tempItems = data.map((element) => {
        return (
          <Grid item md={4}>
            <Link
              style={{ textDecoration: "none", color: "initial" }}
              to={`/item/${element.id}`}
            >
              <Card className={classes.element}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="170"
                    image={element.image}
                    title={element.title}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="subtitle1"
                    >
                      {element.title.substring(0, 25)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="h6"
                    >
                      Price :{element.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        );
      });
      setItems((items) => tempItems);
    }
    // const x=await fetch("https://fakestoreapi.com/products")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setapiResponse((apiResponse) => res);
    //   });
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
          {/* <Route path="/item/:id">
              <Item apiURL={apiURL} />
          </Route> */}
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
        </>
      )}
    </div>
  );
};

export default Products;
