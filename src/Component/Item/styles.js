import { makeStyles } from "@material-ui/core";
import { SignalWifi1BarLockSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  prog: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    paddingLeft: "40%",
  },
  // card: {
  //   backgroundColor: "#222",
  // },
  media: {
    height: "500px",
    width: "80%",
    border: "3px solid #847f86",
    marginLeft: "11%",
    objectFit: "fill",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    height: "120px",
    backgroundColor: theme.palette.background.paper,
  },
  sliderWrapper: {
    // height: "300px",
    width: "80%",
    marginLeft: "10%",
    objectFit: "fill",
  },
  btn: {
    width: "200px",
    height: "80px",
    marginLeft: "20px",
  },
}));
export default useStyles;
