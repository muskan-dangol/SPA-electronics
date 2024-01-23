import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { editProduct, deleteProduct } from "../store/action";
import { useSelector } from "react-redux/es/hooks/useSelector";

import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import RatingStar from "../components/StarRating";
import {
  Grid,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
  CardContent,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const [openDialogue, setOpenDialogue] = React.useState(false); //dialogue open/close state
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.authenticated);

  const { data, refetch, error } = useQuery({
    queryKey: ["productDetails"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3005/products/${productId}`
      );
      return response.json();
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });
  const productDetail = data || {};

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!productDetail) {
    return <div>Product not found</div>;
  }
  const handleRatingChange = async (e, _id, newRating) => {
    e.stopPropagation();
    await dispatch(editProduct(_id, { rating: newRating }));
    await refetch();
  };

  const notifyDeletion = () => {
    toast.success("Deleted product Successfully!!");
  };
  const notifyCartAddition = () => {
    toast.success("Added product to Cart Successfully!!");
  };

  const notifyisAuthenticated = () => {
    toast.error("Please register yourself before addintg items to cart!!");
  };
  const handleDeleteProduct = (e, _id) => {
    setOpenDialogue(false);
    dispatch(deleteProduct(_id));
    navigate("/");
  };

  const handleAddCart = () => {
    if (isAuthenticated) {
      const cartId = localStorage.getItem("cartId") || generateCartId();
      const data = localStorage.getItem(cartId);
      const existingCartItems = data ? JSON.parse(data) : [];
      const existingCartItemIndex = existingCartItems.findIndex(
        (item) => item.id === productDetail._id
      );
      if (existingCartItemIndex !== -1) {
        existingCartItems[existingCartItemIndex].quantity += 1;
      } else {
        const cartItem = {
          id: productDetail._id,
          title: productDetail.title,
          price: productDetail.price,
          quantity: 1,
        };
        existingCartItems.push(cartItem);
      }
      const totalQuantity = existingCartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      notifyCartAddition();
      localStorage.setItem(cartId, JSON.stringify(existingCartItems || []));
      localStorage.setItem("cartId", cartId);
      localStorage.setItem("totalQuantity", totalQuantity.toString());
    } else {
      notifyisAuthenticated();
    }
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
                {productDetail.title}
              </Typography>
              <Typography variant="body1" color="red">
                ${productDetail.price}
              </Typography>
              <Typography variant="h6" color="text.primary">
                {productDetail.description}
              </Typography>
            </CardContent>
          </CardContainer>
        </Grid>
        <Grid item sm={12} md={6}>
          <GridContainer container>
            <Grid item sm={12} md={12}>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  <strong>{productDetail.title}</strong>
                </Typography>
                <Typography variant="h5" color="red">
                  ${productDetail.price}
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6} md={6}>
                    <Typography variant="h6" color="text.primary">
                      <strong>Category</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="h6" color="text.primary">
                      {productDetail.category}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="h6" color="text.primary">
                      <strong>brand</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="h6" color="text.primary">
                      {productDetail.brand}
                    </Typography>
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <Typography variant="h6" color="text.primary">
                      <strong>description</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="h6" color="text.primary">
                      {productDetail.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="h6" color="text.primary">
                      <strong>Rating of Product</strong>
                    </Typography>
                  </Grid>
                  <Grid>
                    <RatingStar
                      value={productDetail.rating}
                      onChange={(e, newRating) =>
                        handleRatingChange(e, productDetail._id, newRating)
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={6} xs={5} sm={6} width={"100%"}>
                    <CartButton
                      variant="contained"
                      onClick={() => {
                        handleAddCart();
                      }}
                    >
                      Add to cart
                    </CartButton>
                  </Grid>
                  {isAuthenticated ? (
                    <Grid item md={6} xs={5} sm={6} width={"100%"}>
                      <CartButton
                        variant="contained"
                        color="error"
                        onClick={() => setOpenDialogue(true)}
                      >
                        Delete Product
                      </CartButton>
                      <Dialog
                        open={openDialogue}
                        onClose={() => setOpenDialogue(false)}
                      >
                        <DialogTitle id="alert-dialog-title">
                          {
                            "Are you sure you want to delete this product? This action is irreversible and will permanently remove all associated data. Confirm with 'DELETE' or click 'CANCEL' to go back."
                          }
                        </DialogTitle>
                        <DialogActions>
                          <Button
                            onClick={() => {
                              setOpenDialogue(false);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={(e) => {
                              handleDeleteProduct(e, productDetail._id);
                              notifyDeletion();
                            }}
                            autoFocus
                          >
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  ) : (
                    <></>
                  )}
                </Grid>
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
  width: auto;
`;
