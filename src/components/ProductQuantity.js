import React from "react";
import { useState } from "react";
import { Button, Input } from "@mui/material";
import styled from "styled-components";

const ProductQuantity = () => {
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleMinus = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setError(null);
    } else {
      setError("No items in cart");
    }
  };

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };
  return (
    <QuantityContainer>
      <Button onClick={handleMinus}>-</Button>
      <Input value={quantity} onChange={handleChange} />
      <Button onClick={handleAdd}>+</Button>
    </QuantityContainer>
  );
};

export default ProductQuantity;

const QuantityContainer = styled.div`
  display: flex;
`;
