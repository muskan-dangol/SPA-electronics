import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryFilter } from "../store/action";
import { Divider, Select, InputLabel, MenuItem } from "@mui/material";
import { OuterBox, FormContent, Boxes, Filter } from "./SideFilterBarCss";
import PriceRangeFilter from "./PriceRangeFilter";
import RatingFilter from "./RateRangeSlider";

export default function SideFilterBar({ data }) {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.selectedCategory);
  const availableCategories = [
    ...new Set(data.map((product) => product.category)),
  ];

  const handleChangeFiltering = (e) => {
    dispatch(addCategoryFilter(e.target.value));
  };

  return (
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
  );
}
