import { makeStyles } from "@material-ui/core";

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
  media: {
    width: "80%",
    marginLeft: "10%",
    border: "1.4px solid #cca",
    objectFit: "fill",
  },
}));
export default useStyles;
