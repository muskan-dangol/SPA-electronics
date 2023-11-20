import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store";
import styled from "styled-components";
import RatingStar from "./StarRating";
import Skeleton from "./Skeleton";

function ProductsList() {
  const dispatch = useDispatch();

  const { isLoading, data, error } = useSelector((state) => {
    return state.products; //{data:[], isLoading:false, error:null}
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Skeleton
        times={7}
        width="100%"
        height="4vh"
        animation="1.5s ease infinite"
      />
    );
  }
  if (error) {
    return <div>Error fetching data...</div>;
  }

  const renderedProducts = data.map((product) => {
    return (
      <ContentBox key={product.id}>
        <ProductImage src={product.images[0]} alt="pda logo" />
        <ProductDetails>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductPrice>${product.price}</ProductPrice>
          <RatingStar value={product.rating} />
        </ProductDetails>
      </ContentBox>
    );
  });
  return <ContentContainer>{renderedProducts}</ContentContainer>;
}

export default ProductsList;

const ContentBox = styled.div`
  float: left;
  width: 100%;
  height 25vh;
  box-sizing: border-box;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2px;
  &:hover{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  @media (min-width: 600px) {
    width: 48%;
    margin: 1%;
  }

  @media (min-width: 900px) {
    width: 31.33%;
  }
  @media (min-width: 1350px) {
    width: 23%;
  }
`;

const ProductTitle = styled.p`
  margin: 5px 0px;
  font-size: 1.1rem;
  over-flow: hidden;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  margin: 0px;
  color: red;
`;

const ProductImage = styled.img`
  object-fit: cover;
  over-flow: hidden;
  width: 100%;
  height: 300px;
`;

const ProductDetails = styled.div`
  width: 100%;
  text-align: center;
  background-color: aliceblue;
  height: 10%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const ContentContainer = styled.div`
  padding: 1%;
`;
