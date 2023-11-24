import ProductsList from "./ProductsList";
import SideBar from "./SideBar";
import styled from "styled-components";

function ProductShow() {
  return (
    <>
      <ProductPage>
        <SideBar />
        <ProductsList />
      </ProductPage>
    </>
  );
}
export default ProductShow;

const ProductPage = styled.div`
  padding-top: 5%;
  width: 100%;
`;

