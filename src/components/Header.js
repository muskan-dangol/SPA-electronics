import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductSearch from "./ProductSearch";
import CartBadge from "./CartBadge";
import { Button } from "@mui/material";
import { discountFilterState } from "../store/atom";
import { useRecoilState } from "recoil";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { signout } from "../store/action";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.authenticated);

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
  const handleSignout = () => {
    dispatch(signout());
    navigate("/signin");
  };

  return (
    <Container>
      <Phono onClick={() => navigate("/")}>PHONO</Phono>
      {filterByDiscount === true ? (
        <Button
          onClick={handleAllProducts}
          data-filter={filterByDiscount}
        >
          All Products
        </Button>
      ) : (
        <Button
          onClick={handleDiscountedProducts}
          data-filter={filterByDiscount}
        >
          Weekly Discount
        </Button>
      )}

      <ProductSearch sx={{ flexGrow: 1 }} />
      {isAuthenticated ? (
        <>
          <Button
            sx={{
              ml: "auto",
            }}
            onClick={handleAddProducts}
          >
            Add Products
          </Button>
          <Button
            sx={{
              ml: 1,
            }}
            onClick={handleSignout}
          >
            sign out
          </Button>
        </>
      ) : (
        <Button
          sx={{
            ml: "auto",
          }}
          onClick={() => navigate("/signin")}
        >
          Signin
        </Button>
      )}
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
