import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";


const useStyles = makeStyles((theme) => ({
  prog: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    paddingLeft: "40%",
  },
  card:{
    backgroundColor:'#222',
  },
  media: {
    height:'600px',
    width:"80%",
    border:'3px solid #847f86',
    marginLeft:'11%',
    objectFit:'fill',
  },
}));


const Item = ({ apiURL }) => {
  const classes = useStyles();
  let { id } = useParams();
  const [itemDetails, setitemDetails] = useState('');
  useEffect(() => {
    async function getData() {
      let data = await fetch(`${apiURL}/products/${id}`);
      data = await data.json();
      let markup = (
        <div>
          <Card className={classes.card}>
            <CardMedia
              component="img"
              className={classes.media}
              image={`${data.image}`}
              title={`${data.title}`}
            />
          </Card>
          <Box
            mt={2}
            border={1}
            borderRadius="borderRadius"
            borderColor="grey.300"
          >
            <Box pl={4} pt={2}>
              <Typography variant="h6" color="textPrimary" >
                {data.title}
              </Typography>
            </Box>
            <Box pl={4} py={2}>
              <Typography   variant="subtitle1">
                Price:{data.price}
              </Typography>
            </Box>
          </Box>
          <Box
            mt={2}
            border={1}
            borderRadius="borderRadius"
            borderColor="grey.300"
          >
            <Box pl={4} pt={2}>
              <Typography color="textPrimary" variant="h6">Details</Typography>
            </Box>
            <Box px={4} py={2}>
              <Typography color="textSecondary" varient="body1">
                {data.description}
              </Typography>
            </Box>
          </Box>
          <Typography color="primary" varient="h1">
            {data.category}
          </Typography>
        </div>
      );
      setitemDetails(markup);
    }
    getData();
  }, []);

  return(
    <div>
      {itemDetails == false ? (
        <div className={classes.prog}>
          <CircularProgress size={90} />
        </div>
      ) : (
       <div> {itemDetails} </div>
      )}
    </div>
  ) 
 
};

export default Item;
