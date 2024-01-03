// RatingStar.js
import React from "react";
import styled from "styled-components";

const RatingStar = ({ value, onChange }) => {
  const handleClick = (selectedValue) => {
    onChange(selectedValue);
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const fillClass = i <= value ? "filled" : "empty";
    stars.push(
      <Star key={i} className={fillClass} onClick={() => handleClick(i)}>
        &#9733;
      </Star>
    );
  }
  return <StarContainer>{stars}</StarContainer>;
};

const StarContainer = styled.div`
  padding: 4px;
`;

const Star = styled.span`
  font-size: 30px;
  color: rgb(192, 192, 192);
  margin: 1px;
  cursor: pointer;
  &.filled {
    color: #000; /* Color for filled stars */
  }
`;

export default RatingStar;
