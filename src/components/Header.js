import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductSearch from "./ProductSearch";
import CartBadge from "./CartBadge";

function Header() {
  const navigate = useNavigate();
  return (
    <Container>
      <Button onClick={() => navigate("/")} >PHONO</Button>
      <ProductSearch sx={{ flexGrow: 1 }}/>
      <CartBadge/>
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
const Button = styled.button`
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
