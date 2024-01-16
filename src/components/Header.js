import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductSearch from "./ProductSearch";
import CartBadge from "./CartBadge";
import { Button } from "@mui/material";
import { discountFilterState } from "../store/atom";
import { useRecoilState } from "recoil";

function Header() {
  const navigate = useNavigate();
  const [filterByDiscount, setFilterByDiscount] =
    useRecoilState(discountFilterState);

  const handleAllProducts = () => {
    setFilterByDiscount(false);
    navigate("/");
  };
  const handleDiscountedProducts = () => {
    setFilterByDiscount(true);
    navigate("/");
  };
  const handleAddProducts = () => {
    navigate("/productForm");
  };

  return (
    <Container>
      <Phono onClick={() => navigate("/")}>PHONO</Phono>
      {filterByDiscount === true ? (
        <Button
          variant="outlined"
          onClick={handleAllProducts}
          data-filter={filterByDiscount}
        >
          All Products
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={handleDiscountedProducts}
          data-filter={filterByDiscount}
        >
          Weekly Discount
        </Button>
      )}

      <ProductSearch sx={{ flexGrow: 1 }} />
      <Button
        sx={{
          ml: "auto",
        }}
        variant="outlined"
        onClick={handleAddProducts}
      >
        Add Products
      </Button>
      <CartBadge />
    </Container>
  );
}
export default Header;

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 5px;
  background-color: #e2effe;
  display: flex;
  position: fixed;
  height: 50px;
  z-index: 3;
`;
const Phono = styled.button`
  padding: 3px;
  background: transparent;
  border-radius: 3px;
  margin: 5px;
  border-color: lightblue;
  cursor: pointer;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;
