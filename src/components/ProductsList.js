import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store";
import styled from "styled-components";
import RatingStar from "./StarRating";
import Skeleton from "./Skeleton";
import SortBar from "./SortBar";

const ProductsList = () => {
  const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("");

  const { isLoading, data, error } = useSelector((state) => {
    return state.products; //{data:[], isLoading:false, error:null}
  });

  useEffect(() => {
    dispatch(fetchProducts(sortOrder, sortBy));
  }, [dispatch, sortOrder, sortBy]);

  const handleSortChange = (newSortOrder, newSortBy) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const sortedData = [...data].sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;
    if (sortBy === "title") {
      return a.title.localeCompare(b.title) * order;
    } else if (sortBy === "title_Z-A") {
      return b.title.localeCompare(a.title) * order;
    } else if (sortBy === "lowtohigh") {
      return (a.price - b.price) * order;
    } else if (sortBy === "hightolow") {
      return (b.price - a.price) * order;
    }
    return 0;
  });

  if (isLoading) {
    return (
      <Skeleton
        times={7}
        width="70%"
        height="4vh"
        animation="1.5s ease infinite"
      />
    );
  }
  if (error) {
    return <div>Error fetching data...</div>;
  }

  const renderedProducts = sortedData.map((product) => (
    <ContentBox key={product.id}>
      <ProductImage src={product.images[0]} alt="pda logo" />
      <ProductDetails>
        <ProductTitle>{product.title}</ProductTitle>
        <ProductPrice>${product.price}</ProductPrice>
        <RatingStar value={product.rating} />
      </ProductDetails>
    </ContentBox>
  ));

  return (
    <ContentContainer>
      <SortBar
        sortBy={sortBy}
        sortOrder={sortOrder}
        handleSortChange={handleSortChange}
      />
      {renderedProducts}
    </ContentContainer>
  );
};

export default ProductsList;

const ContentContainer = styled.div`
  float: left;
  width: 70%;
  padding-top: 8%;
  @media (max-width: 600px) {
    width: 100%;
    padding: 2%;
  }
`;

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
@media (min-width: 1000px) {
    width: 30%;
  }
  @media (max-width: 600px) {
    width: 95%;
  }
 
`;

const ProductTitle = styled.p`
  margin: 5px 0px;
  font-size: 1.2rem;
  height: 4vh;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  margin: 0px;
  color: red;
`;

const ProductImage = styled.img`
  object-fit: cover;
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
