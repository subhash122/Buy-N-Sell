import { Box, Card, CardMedia, makeStyles, Typography } from "@material-ui/core";
import React ,{useState,useEffect}from "react";
import { useParams } from "react-router-dom";
import { spacing } from '@material-ui/system';
import './index.css';

const theme = {
    spacing: 8,
  }
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
}))
const Item = ({apiURL}) => {
    const classes = useStyles();
    let { id } = useParams();
    const [itemDetails, setitemDetails] = useState();
    useEffect(() => {
        async function getData() {
            let data=await fetch(`${apiURL}/products/${id}`);
            data= await data.json();
            let markup=<div class="item">
                            <Card  >
                            <CardMedia className={classes.media}  image={`${data.image}`} title={`${data.title}`}/>
                            </Card> 
                            <Box pl={4} pt={5} ><Typography  color="primary" varient="h1">{data.title}</Typography></Box>
                            <Box pl={4} pt={5} ><Typography m={2}color="text-secondary" varient="h3">Price:{data.price}</Typography></Box>
                            <Box pt={5}>Description</Box>
                            <Box px={4}  ><Typography  color="text-primary" varient="body1">{data.description}</Typography></Box>
                            <Typography color="primary" varient="h1">{data.category}</Typography>
                        </div>
            setitemDetails(markup);
        }
        getData();
    }, [])
    return(
        <div>{itemDetails}</div>
    )
}

export default Item;