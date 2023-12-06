import { useDispatch, useSelector } from "react-redux";
import { addPriceFilter } from "../store/action";
import { Box, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import styled from "styled-components";

export default function PriceRangeSlider() {
  const dispatch = useDispatch();
  const { priceRange } = useSelector((state) => state);

  const handlePriceChange = (e) => {
    dispatch(addPriceFilter(e.target.value));
  };
  return (
    <BoxComponent>
      <Typography>Price</Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        step={50}
        min={10}
        max={2000}
      />
    </BoxComponent>
  );
}

const BoxComponent = styled(Box)`
  margin: 5% 0;
`;
