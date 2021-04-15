import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useAlert } from "react-alert";
import Footer from "../Footer";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 4,
    boxShadow: "0px 0px 2px 3px #eee ",
  },
  form: {
    width: "50%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  prog: {
    display: "flex",
    paddingLeft: "45%",
  },
}));

const ProductForm = ({ apiURL }) => {
  const classes = useStyles();
  const alert = useAlert();
  const [category, setcategory] = useState("");
  const [loading, setloading] = useState(false);

  const handleChange = (event) => {
    setcategory(event.target.value);
  };
  const handleSubmit = async () => {
    let name = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    try {
      setloading(true);
      let newProduct = await axios({
        method: "post",
        url: `${apiURL}/users/myAds`,
        data: {
          name,
          description,
          price,
          category,
        },
        withCredentials: true,
      });
      console.log(newProduct);
      alert.success("product added successfully");
    } catch (err) {
      alert.error(err.response.data.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      {loading === true ? (
        <div className={classes.prog}>
          <CircularProgress size={70} />
        </div>
      ) : (
        <>
          <Container component="main" maxWidth="md">
            <div className={classes.paper}>
              <form className={classes.form} noValidate>
                <Typography variant="h5" color="primary">
                  Fill product details
                </Typography>
                <br></br>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="Title"
                      name="Title"
                      variant="outlined"
                      required
                      fullWidth
                      id="title"
                      label="Title"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="Description"
                      name="Description"
                      variant="outlined"
                      required
                      fullWidth
                      id="description"
                      label="Description"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="Price"
                      type="number"
                      name="Price"
                      variant="outlined"
                      required
                      fullWidth
                      id="price"
                      label="Price"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={category}
                        onChange={handleChange}
                        label="Category"
                        fullWidth
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="electronics">Electronics</MenuItem>
                        <MenuItem value="fashion">Fashion</MenuItem>
                        <MenuItem value="vehicles">Vehicles</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      onClick={handleSubmit}
                    >
                      Add Product
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};
export default ProductForm;
