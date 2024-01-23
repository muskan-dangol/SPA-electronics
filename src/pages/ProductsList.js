import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
// selectors
import {
  selectedCategoryState,
  discountFilterState,
  priceRangeState,
  searchTermState,
  ratingFilterState,
} from "../store/atom";
import { editProduct } from "../store/action";
import RatingStar from "../components/StarRating";
import LoadingSkeleton from "../components/Skeleton";
import SortBar from "../components/SortBar";
import SideFilterBar from "../components/SideFilterBar";
import { Grid, Box } from "@mui/material";
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
  const { data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3005/products");
      return response.json();
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });
  const productList = data || [];

  const searchTerm = useRecoilValue(searchTermState);
  const ratingRange = useRecoilValue(ratingFilterState);
  const priceRange = useRecoilValue(priceRangeState);
  const selectedCategory = useRecoilValue(selectedCategoryState);
  const isDiscountFilterEnabled = useRecoilValue(discountFilterState);

  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("");

  const handleClick = (product) => {
    navigate(`/${product.title}/${product._id}`);
  };

  const handleSortChange = (newSortOrder, newSortBy) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleRatingChange = async (e, _id, newRating) => {
    e.stopPropagation();
    await dispatch(editProduct(_id, { rating: newRating }));
    await refetch();
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

  if (productList.isLoading && productList.length === 0) {
    return (renderedProducts = (
      <Box sx={{ overflow: "hidden" }}>
        <LoadingSkeleton count={10} />
      </Box>
    ));
  } else if (productList.isError) {
    renderedProducts = <div>Error fetching data...</div>;
  } else {
    renderedProducts =
      productList &&
      productList.length > 0 &&
      filterCategory.map((product) => (
        <ContentBox key={product._id} onClick={() => handleClick(product)}>
          {/* <ProductImage src={product.images[0]} alt="pda logo" /> */}
          <ProductDetails>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPrice>${product.price}</ProductPrice>
            <RatingStar
              value={product.rating}
              onChange={(e, newRating) =>
                handleRatingChange(e, product._id, newRating)
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
