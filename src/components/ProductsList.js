import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store";
// import styled from "styled-components";
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
    return <Skeleton times={7} width="100%" height= "4vh" animation="1.5s ease infinite"/>;
  }
  if (error) {
    return <div>Error fetching data...</div>;
  }

  const renderedProducts = data.map((product) => {
    return (
      <div key={product.id} >
        {product.title}
      </div>
    )
  })
  return <div>{renderedProducts}</div>;
}

export default ProductsList;

