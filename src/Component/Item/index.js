import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useStyles from "./styles";
import PhoneIcon from "@material-ui/icons/Phone";
import axios from "axios";
import "./index.css";
import Footer from "../Footer";

const Item = ({ isLoggedIn, apiURL }) => {
  const classes = useStyles();
  let { id } = useParams();
  let alert = useAlert();
  const [itemDetails, setitemDetails] = useState("");
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setloading(true);
        let data = await axios.get(`${apiURL}/products/${id}`);
        data = data.data.data.product;
        let markup = (
          <div className="whole-container">
            <Carousel className="img">
              {data.images.map((el) => (
                <div className={classes.sliderWrapper}>
                  <img src={el} />
                </div>
              ))}
            </Carousel>
            <Box
              mt={2}
              border={1}
              borderRadius="borderRadius"
              borderColor="grey.300"
            >
              <Box pl={4} pt={2}>
                <Typography variant="h6" color="textPrimary">
                  {data.name}
                </Typography>
              </Box>
              <Box pl={4} py={2}>
                <Typography variant="h6">₹{data.price}</Typography>
              </Box>
            </Box>
            <Box
              mt={2}
              border={1}
              borderRadius="borderRadius"
              borderColor="grey.300"
            >
              <Box pl={4} pt={2}>
                <Typography color="textPrimary" variant="h6">
                  Details
                </Typography>
              </Box>
              <Box px={4} py={2}>
                <Typography color="textSecondary" varient="body1">
                  {data.description}
                </Typography>
              </Box>
            </Box>
            <Box
              mt={2}
              border={1}
              borderRadius="borderRadius"
              borderColor="grey.300"
              className="last-box"
            >
              <Button
                pl={4}
                pt={2}
                variant="contained"
                color="primary"
                startIcon={<PhoneIcon fontSize="large" />}
                className={classes.btn}
              >
                <div style={{ display: "block" }}>
                  {isLoggedIn === true ? (
                    <>
                      {" "}
                      <div>contact seller</div>
                      <div>{data.seller.phoneNo}</div>{" "}
                    </>
                  ) : (
                    <div>Log-in to see seller contact</div>
                  )}
                </div>
              </Button>
              <Box
                px={4}
                py={2}
                border={1}
                borderColor="grey.300"
                style={{ width: "50%" }}
              >
                <Typography color="textPrimary" variant="h6">
                  Buyer Guidlines
                </Typography>
                <Typography color="textSecondary" varient="body1">
                  • Be careful when paying offline.
                </Typography>
                <Typography color="textSecondary" varient="body1">
                  • Beware of ads with unrealistic prices, look alikes or clone
                  products.
                </Typography>
                <Typography color="textSecondary" varient="body1">
                  • Do not deposit/transfer money to bank or any third party
                  payment gateways without verifying the credentials.
                </Typography>
              </Box>
            </Box>
          </div>
        );
        setloading(false);
        setitemDetails(markup);
      } catch (err) {
        alert.error("some error occured. please try again");
      }
    }
    getData();
  }, []);

  return (
    <div>
      {loading === true ? (
        <div className={classes.prog}>
          <CircularProgress size={70} />
        </div>
      ) : (
        <div>
          <Container className="grid--container" maxWidth="md">
            {itemDetails}
          </Container>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Item;
