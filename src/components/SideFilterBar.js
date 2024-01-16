import * as React from "react";
import { useRecoilState } from "recoil";
import { selectedCategoryState } from "../store/atom";
import { Grid, Divider, Select, InputLabel, MenuItem } from "@mui/material";
import { OuterBox, FormContent, Boxes, Filter } from "./SideFilterBarCss";
import PriceRangeFilter from "./PriceRangeFilter";
import RatingFilter from "./RateRangeSlider";

export default function SideFilterBar({ data }) {
  const [selectedCategory, setSelectedCategory]  = useRecoilState(selectedCategoryState)
  const availableCategories = [
    ...new Set(data.map((product) => product.category)),
  ];

  const handleChangeFiltering = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Grid container>
      <OuterBox>
        <Boxes>
          <h1>Products:</h1>
          <Filter>Filter with:</Filter>
          <Divider />
          <FormContent variant="standard">
            <InputLabel>Category</InputLabel>
            <Select value={selectedCategory} onChange={handleChangeFiltering}>
              <MenuItem value={""}>None</MenuItem>
              {availableCategories.map((category, id) => (
                <MenuItem value={category} key={id}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormContent>
          <PriceRangeFilter />
          <hr />
          <RatingFilter />
        </Boxes>
      </OuterBox>
    </Grid>
  );
}
