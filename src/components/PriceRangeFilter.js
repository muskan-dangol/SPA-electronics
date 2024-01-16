import { useRecoilState } from "recoil";
import { priceRangeState } from "../store/atom";
import { Box, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import styled from "styled-components";

export default function PriceRangeSlider() {
  const [priceRange, setPriceRange] = useRecoilState(priceRangeState);

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
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
