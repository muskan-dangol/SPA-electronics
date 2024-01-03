import axios from "axios";

export const FETCH_PRODUCT_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_PRODUCT_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_PRODUCT_FAILURE = "FETCH_DATA_FAILURE";

export const EDIT_PRODUCT_REQUEST = "EDIT_PRODUCT_REQUEST";
export const EDIT_PRODUCT_SUCCESS = "EDIT_PRODUCT_SUCCESS";
export const EDIT_PRODUCT_FAILURE = "EDIT_PRODUCT_FAILURE";

export const ADD_CATEGORY_FILTER = "ADD_CATEGORY_FILTER";
export const ADD_PRICE_FILTER = "ADD_PRICE_FILTER";
export const ADD_RATING_FILTER = "ADD_RATING_FILTER";
export const ADD_PRODUCT_SEARCH = "ADD_PRODUCT_SEARCH";


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

const editProductRequest = () => {
  return {
    type: EDIT_PRODUCT_REQUEST,
  };
};

const editProductSuccess = () => {
  return {
    type: EDIT_PRODUCT_SUCCESS,
  };
};

const editProductFailure = (error) => {
  return {
    type: EDIT_PRODUCT_FAILURE,
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

export const addProductSearch = (searchTerm) => {
  return {
    type: ADD_PRODUCT_SEARCH,
    payload: searchTerm,
  };
};

export const fetchProduct = () => {
  return (dispatch) => {
    dispatch(fetchProductRequest());
    axios
      .get("http://localhost:3005")
      .then((response) => {
        const data = response.data;
        dispatch(fetchProductSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchProductFailure(error.message));
      });
  };
};


export const editProduct = (id, updatedData) => {
  return (dispatch) => {
    dispatch(editProductRequest());
    axios
      .put(`http://localhost:3005/products/${id}`, updatedData)
      .then(() => {
        dispatch(editProductSuccess)
        dispatch(fetchProduct());
      })
      .catch((error) => {
        dispatch(editProductFailure(error.message));
      });
  };
};