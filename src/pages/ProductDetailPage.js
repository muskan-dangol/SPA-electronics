import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchProduct, editProduct } from "../store/action";
import styled from "styled-components";
import ProductQuantity from "../components/ProductQuantity";
import RatingStar from "../components/StarRating";
import { Grid, Button, Card, CardContent, Typography } from "@mui/material";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, []);

  const product = useSelector((state) =>
    state.data.find((item) => item.id === parseInt(productId))
  );
  if (!product) {
    return <div>Product not found</div>;
  }
  const handleRatingChange = (e, id, newRating) => {
    e.stopPropagation();
    dispatch(editProduct(id, { rating: newRating }));
  };
  return (
    <DetailContainer>
      <Button
        sx={{
          width: 100,
          marginLeft: 2,
          marginTop: 2
          
        }}
        variant="outlined"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <GridContainer container>
        <Grid item sm={12} md={6}>
          <CardContainer>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography variant="body1" color="red">
                ${product.price}
              </Typography>
              <Typography variant="h6" color="text.primary">
                {product.description}
              </Typography>
            </CardContent>
          </CardContainer>
        </Grid>
        <Grid item sm={12} md={6}>
          <GridContainer container>
            <Grid item sm={6} md={12}>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  <strong>{product.title}</strong>
                </Typography>
                <Typography variant="h5" color="red">
                  ${product.price}
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6} md={4}>
                    <Typography variant="h6" color="text.primary">
                      <strong>Category</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    <Typography variant="h6" color="text.primary">
                      {product.category}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="h6" color="text.primary">
                      <strong>brand</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    <Typography variant="h6" color="text.primary">
                      {product.brand}
                    </Typography>
                  </Grid>

                  <Grid item xs={6} md={4}>
                    <Typography variant="h6" color="text.primary">
                      <strong>description</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    <Typography variant="h6" color="text.primary">
                      {product.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="h6" color="text.primary">
                      <strong>Quantity</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <ProductQuantity />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="h6" color="text.primary">
                      <strong>Rating of Product</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <RatingStar
                      value={product.rating}
                      onChange={(e, newRating) =>
                        handleRatingChange(e, product.id, newRating)
                      }
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CartButton variant="contained">Add to cart</CartButton>
            </Grid>
          </GridContainer>
        </Grid>
      </GridContainer>
    </DetailContainer>
  );
};

export default ProductDetails;

export const DetailContainer = styled.div`
  position: relative;
  top: 100px;
  left: 5%;
  float: left;
  width: 90%;
  height: 70vh;
  border: 1px solid #c1c1c1;
  border-radius: 15px;
  // background-color: #e5e9ec;
`;

const GridContainer = styled(Grid)`
  height: 80%;
`;

export const CardContainer = styled(Card)`
  height: 90%;
  border: 0.5px solid ##c1c1c1;
  background-color: #e5f5ff !important ;
  margin: 3%;
`;

export const CardDetails = styled(Card)`
  height: 80%;
  border: 0.5px solid ##c1c1c1;
  margin: 3%;
  width: 90%;
`;

export const CartButton = styled(Button)`
  && {
    margin: 3%;
  }
  width: 40%;
`;
