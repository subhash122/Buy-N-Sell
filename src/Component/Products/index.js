import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  FormControlLabel,
  FormLabel,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  element: {
    maxWidth: 250,
    height: 250,
  },
  root: {
    flexGrow: 1,
  },
}));
const Products = ({ apiURL }) => {
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const [apiResponse, setapiResponse] = useState([]);
  useEffect(() => {
    let x;
    async function getData() {
      x = await fetch(`${apiURL}/products`);
      x = await x.json();
      setapiResponse((apiResponse) => x);
      let tempItems = x.map((element) => {
        return (
          // <Link to={`/items/${element.id}`}>
          <Grid item md={4}>
            <Link style={{ textDecoration: "none", color: "initial" }} to={`/item/${element.id}`}>
              <Card className={classes.element}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="170"
                    image={element.image}
                    title="Contemplative Reptile"
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
          // </Link>
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
    <div className={classes.root}>
      <Grid container spacing={8}>
        {items}
      </Grid>
    </div>
  );
};

export default Products;
