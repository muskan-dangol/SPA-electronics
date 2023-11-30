import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import styled from "styled-components";

const SortBar = ({ sortBy, handleSortChange , sortOrder }) => (
  <SortingNav>
    <FormContent variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>Sort Products By:</InputLabel>
      <Select value={sortBy}
        onChange={(e) =>
          handleSortChange(sortOrder, e.target.value)
        }>
        <MenuItem value="">Featured</MenuItem>
        <MenuItem value={"title"} >Alphabetically, A-Z</MenuItem>
        <MenuItem value={"title_Z-A"} >Alphabetically, Z-A</MenuItem>
        <MenuItem value={"lowtohigh"}>Price, low to high</MenuItem>
        <MenuItem value={"hightolow"} >Price, high to low</MenuItem>
      </Select>
    </FormContent>
  </SortingNav>
);
export default SortBar;

const SortingNav = styled.div`
  width: 100%;
  float: left;
  border-radius: 4px;
`;

const FormContent = styled(FormControl)`
  float: right;
  width: 25%;
  position: absolute;
  transform: translate(0%, -10%);
`;
