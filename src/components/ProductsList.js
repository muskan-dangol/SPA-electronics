import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../store";

function ProductsList () {
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(fetchProducts());
  }, [dispatch]);

  
  return (
    <div>List of the Products</div>
    )
}

export default ProductsList;
