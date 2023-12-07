import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/action";
import RatingStar from "./StarRating";
import Skeleton from "./Skeleton";
import SortBar from "./SortBar";
import SideFilterBar from "./SideFilterBar";
import {
  ContentContainer,
  ContentBox,
  ProductTitle,
  ProductPrice,
  ProductImage,
  ProductDetails,
} from "./ProductListCss";

const ProductsList = () => {
  const dispatch = useDispatch();
  const {
    data,
    isLoading,
    error,
    priceRange,
    selectedCategory,
    ratingRange,
    searchTerm,
  } = useSelector((state) => state) || {};
  const productList = data.products || [];

  console.log(selectedCategory);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    dispatch(fetchProduct(sortOrder, sortBy));
  }, []);

  const handleSortChange = (newSortOrder, newSortBy) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const sortedData = productList.sort((a, b) => {
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

  const filterCategory = sortedData.filter((product) => {
    const searchCondition =
    product.title.toLowerCase().includes(searchTerm.toLowerCase());
    console.log(searchCondition);
    const categoryCondition =
      !selectedCategory ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    const ratingCondition = !ratingRange || product.rating <= ratingRange;
    const priceCondition =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return (
      categoryCondition && ratingCondition && priceCondition && searchCondition
    );
  });

  let renderedProducts;

  if (isLoading) {
    return (renderedProducts = (
      <Skeleton
        times={10}
        width="100%"
        height="4vh"
        animation="1.5s ease infinite"
      />
    ));
  } else if (error) {
    renderedProducts = <div>Error fetching data...</div>;
  } else {
    renderedProducts = filterCategory.map((product) => (
      <ContentBox key={product.id}>
        <ProductImage src={product.images[0]} alt="pda logo" />
        <ProductDetails>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductPrice>${product.price}</ProductPrice>
          <RatingStar value={product.rating} />
        </ProductDetails>
      </ContentBox>
    ));
  }

  return (
    <div>
      <SideFilterBar data={sortedData} />
      <ContentContainer>
        <SortBar
          sortBy={sortBy}
          sortOrder={sortOrder}
          handleSortChange={handleSortChange}
        />
        {renderedProducts}
      </ContentContainer>
    </div>
  );
};

export default ProductsList;
