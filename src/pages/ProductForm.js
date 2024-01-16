import * as React from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { formDataState } from "../store/atom";
import { useDispatch, useSelector } from "react-redux";
import { createProducts } from "../store/action";
import {
  FormControl,
  Typography,
  Button,
  Grid,
  Snackbar,
  IconButton,
  Alert,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ProductForm() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useRecoilState(formDataState);
  const { error } = useSelector((state) => state);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      dispatch(createProducts(formData));
      setFormData({
        title: "",
        description: "",
        price: 0,
        stock: 0,
        brand: "",
        discountPercentage: 0,
        category: "",
        rating: 0,
        img: "",
      });
      setOpen(true);
    } catch (error) {
      return error;
    }
  };
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FormControl
            variant="outlined"
            sx={{
              mt: 15,
              width: "50%",
              border: "1px solid gray",
              p: 5,
              borderRadius: 5,
            }}
          >
            <Typography variant="h5">Add Products</Typography>
            <TextField
              required
              type="title"
              variant="standard"
              label="Title"
              name="title"
              onChange={handleChange}
            />
            <TextField
              required
              type="price"
              variant="standard"
              label="Price"
              name="price"
              onChange={handleChange}
            />
            <TextField
              required
              type="brand"
              variant="standard"
              label="Brand"
              name="brand"
              onChange={handleChange}
            />
            <TextField
              required
              type="category"
              variant="standard"
              label="Category"
              name="category"
              onChange={handleChange}
            />
            <TextField
              required
              type="rating"
              variant="standard"
              label="Rating"
              name="rating"
              onChange={handleChange}
            />
            <TextField
              required
              type="stock"
              variant="standard"
              label="Stock"
              name="stock"
              onChange={handleChange}
            />
            <TextField
              type="discountPercentage"
              variant="standard"
              label="DiscountPercentage"
              name="discountPercentage"
              onChange={handleChange}
            />
            <TextField
              required
              type="img"
              variant="standard"
              label="Image"
              name="img"
              onChange={handleChange}
            />
            <TextField
              required
              type="descriptipn"
              variant="standard"
              label="Description"
              name="description"
              onChange={handleChange}
            />
            <Button
              variant="contained"
              sx={{
                ml: "auto",
                mt: 3,
              }}
              type="submit"
            >
              Submit
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              action={action}
            >
              {error !== null ? (
                <Alert
                  onClose={handleClose}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  {error.payload || "Failed to add product"}
                </Alert>
              ) : (
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  New Product has been added successfully
                </Alert>
              )}
            </Snackbar>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
}
