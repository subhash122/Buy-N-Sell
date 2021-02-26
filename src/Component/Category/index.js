import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Route, useParams } from "react-router-dom";
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
}));

const Category = ({ apiURL }) => {
  const classes = useStyles();
  let { type } = useParams();

  const [itemsList, setitemsList] = useState([]);
  useEffect(() => {
    async function getData() {
      let data = await fetch(`${apiURL}/products/category/${type}`);
      data = await data.json();
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

      setitemsList(tempItems);
    }

    getData();
  }, []);
  return (
    <div>
      {itemsList == false ? (
        <div className={classes.prog}>
          <CircularProgress size={90} />{" "}
        </div>
      ) : (
        <>
          
          <div className={classes.root}>
            <Grid container spacing={8}>
              {itemsList}
            </Grid>
          </div>
        </>
      )}
    </div>
  );
};

export default Category;
