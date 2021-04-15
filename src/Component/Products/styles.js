import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  prog: {
    display: "flex",
    paddingLeft: "45%",
  },
  accordion: {
    boxShadow: "none",
  },
  heading: {
    fontWeight: "600",
  },
  content: {
    display: "block",
  },
  element: {
    width: 280,
    height: 280,
    transition: "0.17s",
    "&:hover": {
      boxShadow: " 1px 1px 5px 2px #999999",
    },
  },
  media: {
    border: "1.4px solid #cca",
    objectFit: "fill",
  },

  favourites: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 5,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 15px",
  },
  wholecontainer: {
    marginTop: "3.3%",
    minHeight: "calc(100vh - 40vh)",
  },
  singleProduct: {
    position: "relative",
  },
  favIcon: {
    position: "absolute",
    bottom: 15,
    right: 5,
  },
  paginationItem: {
    marginTop: "40px",
    marginLeft: "30%",
  },
}));
export default useStyles;
