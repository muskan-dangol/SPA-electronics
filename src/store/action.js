import axios from "axios";

export const FETCH_PRODUCT_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_PRODUCT_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_PRODUCT_FAILURE = "FETCH_DATA_FAILURE";

export const ADD_CATEGORY_FILTER = "ADD_CATEGORY_FILTER";
export const ADD_PRICE_FILTER = "ADD_PRICE_FILTER";
export const ADD_RATING_FILTER = "ADD_RATING_FILTER";

const fetchProductRequest = () => {
  return {
    type: FETCH_PRODUCT_REQUEST,
  };
};

const fetchProductSuccess = (data) => {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: data,
  };
};
const fetchProductFailure = (error) => {
  return {
    type: FETCH_PRODUCT_FAILURE,
    payload: error,
  };
};

export const addCategoryFilter = (selectedCategory) => {
  return {
    type: ADD_CATEGORY_FILTER,
    payload: selectedCategory,
  };
};

export const addPriceFilter = (priceRange) => {
  return {
    type: ADD_PRICE_FILTER,
    payload: priceRange,
  };
};
export const addRatingFilter = (ratingRange) => {
  return {
    type: ADD_RATING_FILTER,
    payload: ratingRange,
  };
};

export const fetchProduct = () => {
  return (dispatch) => {
    dispatch(fetchProductRequest());
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        const data = response.data;
        dispatch(fetchProductSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchProductFailure(error.message));
      });
  };
};
