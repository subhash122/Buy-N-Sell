import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  prog: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    paddingLeft: "40%",
  },
  card: {
    backgroundColor: "#222",
  },
  media: {
    height: "600px",
    width: "80%",
    border: "3px solid #847f86",
    marginLeft: "11%",
    objectFit: "fill",
  },
}));
export default useStyles;
