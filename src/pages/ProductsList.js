import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProduct, editProduct } from "../store/action";
import RatingStar from "../components/StarRating";
import Skeleton from "../components/Skeleton";
import SortBar from "../components/SortBar";
import SideFilterBar from "../components/SideFilterBar";
import { Grid } from "@mui/material";
import {
  ContentBox,
  ProductTitle,
  ProductPrice,
  // ProductImage,
  ProductDetails,
} from "../components/ProductListCss";

const ProductsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error,
    priceRange,
    selectedCategory,
    ratingRange,
    isDiscountFilterEnabled,
    searchTerm,
  } = useSelector((state) => state) || {};
  const productList = data || [];
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    dispatch(fetchProduct(sortOrder, sortBy));
  }, []);

  const handleClick = (product) => {
    navigate(`/productDetail/${product.title}/${product.id}`);
  };

  const handleSortChange = (newSortOrder, newSortBy) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleRatingChange = (e, id, newRating) => {
    e.stopPropagation();
    dispatch(editProduct(id, { rating: newRating }));
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
    const searchCondition = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryCondition =
      !selectedCategory ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    const ratingCondition = !ratingRange || product.rating <= ratingRange;
    const priceCondition =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const discountFilter = isDiscountFilterEnabled
      ? product.discountPercentage > 0
      : true;
    return (
      categoryCondition &&
      ratingCondition &&
      priceCondition &&
      searchCondition &&
      discountFilter
    );
  });

  let renderedProducts;

  if (isLoading && productList.length === 0) {
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
      <ContentBox key={product.id} onClick={() => handleClick(product)}>
        {/* <ProductImage src={product.images[0]} alt="pda logo" /> */}
        <ProductDetails>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductPrice>${product.price}</ProductPrice>
          <RatingStar
            value={product.rating}
            onChange={(e, newRating) =>
              handleRatingChange(e, product.id, newRating)
            }
          />
        </ProductDetails>
      </ContentBox>
    ));
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={3.5} md={3.2} mt={5}>
        <SideFilterBar data={sortedData} />
      </Grid>
      <Grid item xs={12} sm={8} md={8.8} mt={7}>
        <SortBar
          sortBy={sortBy}
          sortOrder={sortOrder}
          handleSortChange={handleSortChange}
        />
        {renderedProducts}
      </Grid>
    </Grid>
  );
};

export default ProductsList;
