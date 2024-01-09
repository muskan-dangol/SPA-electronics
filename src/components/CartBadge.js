import React from "react";
import { useState } from "react";
import { Badge, Drawer, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartItems from "./CartItems";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const CartBadge = () => {
  const totalCartItems = localStorage.getItem("totalQuantity") || 0;
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(totalCartItems);

  const handleOpen = () => {
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };
  const handleTotalQuantityChange = (newTotalQuantity) => {
    localStorage.setItem("totalQuantity", newTotalQuantity.toString());
    setTotalQuantity(newTotalQuantity);
  };

  return (
    <>
      <IconButton
        sx={{
          ml: "auto",
          mt: "5px",
          marginRight: "30px",
          borderRadius: "2px",
          display: "flex",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={handleOpen}
      >
        {totalQuantity > 0 ? (
          <StyledBadge badgeContent={totalQuantity} color="primary">
            <ShoppingCartIcon />
          </StyledBadge>
        ) : (
          <StyledBadge color="primary">
            <ShoppingCartIcon />
          </StyledBadge>
        )}
        <Typography>
          <strong>Cart Items</strong>
        </Typography>
      </IconButton>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleCloseDrawer}>
        <CartItems
          onClose={handleCloseDrawer}
          onTotalQuantityChange={handleTotalQuantityChange}
        />
      </Drawer>
    </>
  );
};

export default CartBadge;
