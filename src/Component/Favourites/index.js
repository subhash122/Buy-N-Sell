import { Box, CardMedia, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./index.css";

const useStyles = makeStyles({
  media: {
    width: "160px",
    height: "140px",
    border: "1px solid #cca",
    margin: "2%",
    objectFit: "fill",
  },
});

const Favourites = ({ apiURL }) => {
  const classes = useStyles();
  const [favouriteList, setfavouriteList] = useState([]);
  useEffect(() => {
    async function getData() {
      let data = await fetch(`${apiURL}/products/5`);
      data = await data.json();
      let markup = (
        <>
          <div className="favourite-box">
            <CardMedia
              component="img"
              className={classes.media}
              image={`${data.image}`}
              title={`${data.title}`}
            />

            <Box pt={4}>
              <Box>
                <Typography variant="h6" color="textPrimary">
                  {data.title}
                </Typography>
              </Box>
              <Box py={2}>
                <Typography variant="subtitle1">Price:{data.price}</Typography>
              </Box>
            </Box>
          </div>
        </>
      );
      setfavouriteList(markup);
    }
    getData();
  }, []);

  return <div>{favouriteList}</div>;
};
export default Favourites;
