import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { discountFilterState } from "../store/atom";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  Avatar,
  Button,
  Typography,
  Grid,
  Card,
  Divider,
  Input,
} from "@mui/material";

const CartItems = ({ onClose, onTotalQuantityChange }) => {
  const [filterByDiscount, setFilterByDiscount] =
    useRecoilState(discountFilterState);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const cartId = localStorage.getItem("cartId") || null;
  let totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );
  let totalAmount = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity || 0),
    0
  );

  useEffect(() => {
    if (onTotalQuantityChange) {
      onTotalQuantityChange(totalQuantity);
    }
  }, [onClose, onTotalQuantityChange, totalQuantity]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem(cartId)) || [];
    setCartItems(storedCartItems);
  }, [cartId]);

  const handleChange = (e, item) => {
    const newQuantity = parseInt(e.target.value, 10) || 0;
    item.quantity = newQuantity;
  };

  const handleAdd = (item) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  const handleClickDiscountedProducts = () => {
    setFilterByDiscount(true);
    onClose(true);
    navigate("/");
  };

  const handleMinus = (item) => {
    if (item.quantity > 1) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCartItems(updatedCartItems);
      updateLocalStorage(updatedCartItems);
    } else {
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== item.id
      );
      setCartItems(item.quantity === 0 ? [] : updatedCartItems);
      updateLocalStorage(updatedCartItems);
    }
  };

  const updateLocalStorage = (items) => {
    localStorage.setItem(cartId, JSON.stringify(items));
    localStorage.setItem("cartId", cartId);
  };

  const handleClearCart = () => {
    localStorage.removeItem("cartId");
    setCartItems([]);
  };

  return (
    <Grid container sx={{ p: 2, maxWidth: 450, overflow: "auto" }}>
      <Grid item xs={12} md={12} sx={{ mb: 0 }}>
        {cartItems.length === 0 ? (
          <Grid>
            <Grid container>
              <Grid item xs={8} sm={10}>
                <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
                  <strong>Your cart is empty.</strong>
                </Typography>
              </Grid>
              <Grid item xs={4} sm={2}>
                <CloseIcon
                  sx={{ mt: 2, mb: 3, fontSize: 30 }}
                  onClick={onClose}
                />
              </Grid>
            </Grid>
            <Divider />
            <Typography
              variant="subtitle1"
              sx={{ mt: 2, mb: 3, textAlign: "center" }}
            >
              Start by filling your shopping cart with the products of your
              choice.
            </Typography>
            <hr />
            <Typography variant="h6" sx={{ mt: 2, mb: 3, textAlign: "center" }}>
              Need inspiration to find the right product?
            </Typography>
            <Grid container spacing={2} align="center" width="100%">
              <Grid item sm={12}>
                <Button
                  variant="contained"
                  onClick={handleClickDiscountedProducts}
                  data-filter={filterByDiscount}
                >
                  Discounted Products
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item xs={11} sm={11}>
              <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                <strong>
                  You have {totalQuantity} items in your shopping cart.
                </strong>
              </Typography>
            </Grid>
            <Grid item xs={1} sm={1}>
              <CloseIcon
                sx={{ mt: 2, mb: 2, fontSize: 30 }}
                onClick={onClose}
              />
            </Grid>
            <Typography sx={{ mb: 3, textAlign: "center" }}>
              id: {cartId}
            </Typography>
            {cartItems.map((item) => (
              <Card
                key={item.id}
                variant="outlined"
                sx={{ width: "100%", height: "100%", p: 1, m: 1 }}
              >
                <Grid container sx={{ m: 1 }}>
                  <Grid sx={{ mr: 2 }}>
                    {item.title && item.title.length > 0 ? (
                      <Avatar sx={{ bgcolor: "#70c1ff" }}>
                        {item.title[0]}
                      </Avatar>
                    ) : (
                      <Avatar sx={{ bgcolor: "#70c1ff" }}>N/A</Avatar>
                    )}{" "}
                  </Grid>
                  <Typography variant="h6">{item.title}</Typography>
                </Grid>

                <Grid container>
                  <Grid item sm={10} xs={10}>
                    <Grid container>
                      <Grid item sm={1.5} xs={2} mt={1}>
                        <RemoveCircleOutlineIcon
                          onClick={() => handleMinus(item)}
                        />
                      </Grid>
                      <Grid item sm={1} xs={1}>
                        <Input
                          value={item.quantity}
                          onChange={(e) => handleChange(e, item)}
                        />
                      </Grid>
                      <Grid item sm={2} xs={2} mt={1} ml={1.5}>
                        <AddCircleOutlineIcon onClick={() => handleAdd(item)} />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={2} xs={2}>
                    <Typography variant="subtitle1">
                      ${item.price * item.quantity}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            ))}
            <Grid container>
              <Grid item sm={10} xs={10} mt={2}>
                <Typography variant="h6">
                  <strong>Total Amount:</strong>
                </Typography>
              </Grid>
              <Grid item sm={2} xs={2} mt={2}>
                <Typography variant="h6">
                  <strong>{totalAmount}</strong>
                </Typography>
              </Grid>
              <Grid item sm={12} xs={12}>
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default CartItems;
