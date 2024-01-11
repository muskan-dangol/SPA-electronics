import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProducts } from "../store/action";
import { FormControl, Typography, Button, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function ProductForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createProducts(
        formData
      )
    );
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
    })
  };

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
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
}
