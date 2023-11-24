import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import styled from "styled-components";
import { Divider } from "@mui/material";

const category = [
  { label: "smartphones" },
  { label: "laptops" },
  { label: "fragrances" },
  { label: "skincare" },
  { label: "groceries" },
  { label: "home-decoration" },
];

const price = [
  { label: 100 },
  { label: 200 },
  { label: 300 },
  { label: 400 },
  { label: 500 },
  { label: 1000 },
  { label: 1500 },
];

const rating = [
  { label: 1 },
  { label: 2 },
  { label: 3 },
  { label: 4 },
  { label: 5 },
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
      </Boxes>
    </OuterBox>
  );
}

const OuterBox = styled.div`
  position: static;
  float: left;
  width: 100vw;
  width: 25%;
  margin: 1%;
  @media (min-width: 600px) {
    width: 25%;
    margin: 1%;
  }
  @media (max-width: 600px) {
    width: 95%;
    height: 210px;
    padding-top: 20px;
  }
`;

const BoxContent = styled(Autocomplete)`
  margin-top: 5%;
`;
const Boxes = styled.div`
  position: fixed;
  @media (min-width: 600px) {
    width: 22%;
    margin: 1%;
  }
  @media (max-width: 600px) {
    width: 95%;
    position: absolute;
  }
`;

const Filter = styled.h3`
  margin: 0;
`;
