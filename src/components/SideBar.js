import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import styled from "styled-components";
import { Divider, Button } from "@mui/material";
import PriceRangeSlider from "./RangeSlider";
import { RateRangeSlider } from "./RangeSlider";

const category = [
  { label: "smartphones" },
  { label: "laptops" },
  { label: "fragrances" },
  { label: "skincare" },
  { label: "groceries" },
  { label: "home-decoration" },
];

export default function SideBar() {
  return (
    <OuterBox>
      <Boxes>
        <h1>Products</h1>
        <Filter>Filter with:</Filter>
        <Divider />
        <BoxContent
          options={category}
          renderInput={(params) => (
            <TextField {...params} label="Category" variant="standard" />
          )}
        />
        <PriceRangeSlider />
        <hr />
        <RateRangeSlider />
        <Button
          variant="contained"
          style={{
            float: "right",
            color: "white",
          }}
        >
          Search
        </Button>
      </Boxes>
    </OuterBox>
  );
}

const OuterBox = styled.div`
  float: left;
  width: 25%;
  margin: 1%;
  height: 50vh;
  padding-top: 5%;
  @media (max-width: 600px) {
    width: 100%;
    // overflow: hidden;
    // max-height: 65vh
  }
`;

const BoxContent = styled(Autocomplete)`
  margin-top: 5%;
`;

const Boxes = styled.div`
  position: fixed;
  width: 23%;
  margin: 1%;
  @media (max-width: 600px) {
    width: 90%;
    position: absolute;
    padding: 4%;
  }
`;

const Filter = styled.h3`
  margin: 0;
`;
