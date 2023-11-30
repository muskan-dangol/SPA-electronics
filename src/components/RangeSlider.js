import { Box, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import styled from "styled-components";

export default function PriceRangeSlider() {
  const [value, setValue] = useState([20, 500]);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <BoxComponent>
      <Typography id="input-slider">
        Price 
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={50}
        min={10}
        max={2000}
      />
    </BoxComponent>
  );
}
export function RateRangeSlider() {
  return (
    <BoxComponent >
      <Typography>
        Ratings
      </Typography>
      <Slider
        defaultValue={3}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={5}
      />
    </BoxComponent>
  );
}


const BoxComponent = styled(Box)`
  margin: 5% 0;
`