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
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [loading, setloading] = useState(false);
  const [photo1, setphoto1] = useState(null);
  const [photo2, setphoto2] = useState(null);
  const [photo3, setphoto3] = useState(null);

  const handleChange = (event) => {
    setcategory(event.target.value);
  };

  const handleSubmit = async () => {
    let formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("category", category);
    if (photo1) formdata.append("photo1", photo1);
    if (photo2) formdata.append("photo2", photo2);
    if (photo3) formdata.append("photo3", photo3);
    try {
      setloading(true);
      let newProduct = await axios({
        method: "post",
        url: `${apiURL}/users/myAds`,
        data: formdata,
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
              <form
                className={classes.form}
                noValidate
                enctype="multipart/form-data"
              >
                <Typography variant="h5" color="primary">
                  Fill product details
                </Typography>
                <br></br>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <TextField
                      name="Title"
                      variant="outlined"
                      required
                      fullWidth
                      id="title"
                      label="Title"
                      value={name}
                      onChange={(event) => setname(event.target.value)}
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
                      value={description}
                      onChange={(event) => setdescription(event.target.value)}
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
                      value={price}
                      onChange={(event) => setprice(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <h3>Add upto 3 Images</h3>
                    <input
                      type="file"
                      name="first"
                      onChange={(event) => setphoto1(event.target.files[0])}
                    ></input>
                    <input
                      type="file"
                      name="second"
                      onChange={(event) => setphoto2(event.target.files[0])}
                    ></input>
                    <input
                      type="file"
                      name="third"
                      onChange={(event) => setphoto3(event.target.files[0])}
                    ></input>
                  </Grid>
                  ;
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
