import { useRecoilState } from "recoil";
import { searchTermState } from "../store/atom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState); // const { searchTerm } = useSelector((state) => state);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <SearchContent sx={{ flexGrow: 1 }}>
      <TextField
        size="small"
        fullWidth
        label="Search Products..."
        onChange={handleSearchTerm}
        value={searchTerm}
      />
    </SearchContent>
  );
}

const SearchContent = styled(Box)`
  background-color: white;
  width: 30%;
  align-self: center;
  position: absolute;
  left: 35%;
`;
