import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchProductById, editProduct } from "../store/action";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import RatingStar from "../components/StarRating";
import { Grid, Button, Card, CardContent, Typography } from "@mui/material";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, []);

  const product = useSelector((state) =>
    state.data.find((item) => item._id === productId)
);
  if (!product) {
    return <div>Product not found</div>;
  }
  const handleRatingChange = (e, _id, newRating) => {
    e.stopPropagation();
    dispatch(editProduct(_id, { rating: newRating }));
  };
  const handleAddCart = () => {
    const cartId = localStorage.getItem("cartId") || generateCartId();
    const data = localStorage.getItem(cartId);
    const existingCartItems = data ? JSON.parse(data) : [];
    const existingCartItemIndex = existingCartItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingCartItemIndex !== -1) {
      existingCartItems[existingCartItemIndex].quantity += 1;
    } else {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      };
      existingCartItems.push(cartItem);
    }
    const totalQuantity = existingCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    localStorage.setItem(cartId, JSON.stringify(existingCartItems || []));
    localStorage.setItem("cartId", cartId);
    localStorage.setItem("totalQuantity", totalQuantity.toString());

    window.location.reload();
  };
  const generateCartId = () => {
    return uuidv4();
  };

  return (
    <DetailContainer container>
      <Button
        sx={{
          width: 100,
          marginLeft: 2,
          marginTop: 2,
          height: 40,
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
            <Grid item sm={12} md={12}>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  <strong>{product.title}</strong>
                </Typography>
                <Typography variant="h5" color="red">
                  ${product.price}
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6} md={6}>
                    <Typography variant="h6" color="text.primary">
                      <strong>Category</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="h6" color="text.primary">
                      {product.category}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="h6" color="text.primary">
                      <strong>brand</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="h6" color="text.primary">
                      {product.brand}
                    </Typography>
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <Typography variant="h6" color="text.primary">
                      <strong>description</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="h6" color="text.primary">
                      {product.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="h6" color="text.primary">
                      <strong>Rating of Product</strong>
                    </Typography>
                  </Grid>
                  <Grid >
                    <RatingStar
                      value={product.rating}
                      onChange={(e, newRating) =>
                        handleRatingChange(e, product._id, newRating)
                      }
                    />
                  </Grid>
                </Grid>
                <CartButton variant="contained" onClick={handleAddCart}>
                  Add to cart
                </CartButton>
              </CardContent>
            </Grid>
          </GridContainer>
        </Grid>
      </GridContainer>
    </DetailContainer>
  );
};

export default ProductDetails;

export const DetailContainer = styled(Grid)`
  && {
    position: relative;
    top: 100px;
    left: 5%;
    width: 90%;
    height: 100%;
    border: 1px solid #c1c1c1;
    border-radius: 15px;
    // background-color: #e5e9ec;
  }
`;

const GridContainer = styled(Grid)`
  height: 90%;
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
    margin-top: 3%;
  }
  width: 40%;
`;