import { useDispatch, useSelector } from "react-redux";
import { addRatingFilter } from "../store/action";
import { Box, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import styled from "styled-components";

export function RateRangeSlider() {
  const dispatch = useDispatch();
  const { ratingRange} = useSelector((state) => state);
  const currentRating = Number(ratingRange);

const handleRatingChange = (e) => {
  dispatch(addRatingFilter(e.target.value));
}
  return (
    <BoxComponent>
      <Typography>Ratings</Typography>
      <Slider
        onChange={handleRatingChange}
        value={currentRating}
        valueLabelDisplay="auto"
        step={0.5}
        marks
        min={1}
        max={5}
      />
    </BoxComponent>
  );
}

const BoxComponent = styled(Box)`
  margin: 5% 0;
`;
