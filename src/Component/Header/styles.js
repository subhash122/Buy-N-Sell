import { fade, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    marginLeft: "12%",
  },
  appbar: {
    backgroundColor: "#f8fafa",
    color: "#000",
  },
  search: {
    position: "relative",
    borderRadius: 20,
    backgroundColor: fade(theme.palette.common.black, 0.2),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.08),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: 70,
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    //   marginLeft:"40%",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));
export default useStyles;
