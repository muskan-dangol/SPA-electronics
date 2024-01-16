import axios from "axios";

export const FETCH_PRODUCT_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_PRODUCT_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_PRODUCT_FAILURE = "FETCH_DATA_FAILURE";

export const FETCH_PRODUCTBYID_REQUEST = "FETCH_DATABYID_REQUEST";
export const FETCH_PRODUCTBYID_SUCCESS = "FETCH_DATABYID_SUCCESS";
export const FETCH_PRODUCTBYID_FAILURE = "FETCH_DATABYID_FAILURE";

export const EDIT_PRODUCT_REQUEST = "EDIT_PRODUCT_REQUEST";
export const EDIT_PRODUCT_SUCCESS = "EDIT_PRODUCT_SUCCESS";
export const EDIT_PRODUCT_FAILURE = "EDIT_PRODUCT_FAILURE";

export const ADD_PRODUCTS_REQUEST = "ADD_PRODUCTS_REQUEST";
export const ADD_PRODUCTS_SUCCESS = "ADD_PRODUCTS_SUCCESS";
export const ADD_PRODUCTS_ERROR = "ADD_PRODUCTS_ERROR";

// cart
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";

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

const fetchProductByIdRequest = () => {
  return {
    type: FETCH_PRODUCTBYID_REQUEST,
  };
};

const fetchProductByIdSuccess = (dataById) => {
  return {
    type: FETCH_PRODUCTBYID_SUCCESS,
    payload: dataById,
  };
};
const fetchProductByIdFailure = (error) => {
  return {
    type: FETCH_PRODUCTBYID_FAILURE,
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

export const addProductsRequest = () => {
  return {
    type: ADD_PRODUCTS_REQUEST,
  };
};

const addProductSuccess = (newProduct) => {
  return {
    type: ADD_PRODUCTS_SUCCESS,
    payload: newProduct,
  };
};
export const addProductFailure = (error) => {
  return {
    type: ADD_PRODUCTS_ERROR,
    payload: error,
  };
};

export const addProductToCart = (cartItem) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: cartItem,
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
export const fetchProductById = (productId) => {
  return async (dispatch) => {
    dispatch(fetchProductByIdRequest());
    try {
      const response = await axios.get(`http://localhost:3005/${productId}`);
      const productDetail = response.data;
      dispatch(fetchProductByIdSuccess(productDetail));
    } catch (error) {
      dispatch(fetchProductByIdFailure(error.message));
    }
  };
};

export const editProduct = (_id, updatedData) => {
  return async (dispatch) => {
    dispatch(editProductRequest());
    await axios
      .put(`http://localhost:3005/product/${_id}`, updatedData)
      .then(() => {
        dispatch(editProductSuccess);
        dispatch(fetchProduct());
        dispatch(fetchProductById(_id));
      })
      .catch((error) => {
        dispatch(editProductFailure(error.message));
      });
  };
};

// cart

export const addCart = (id, product) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3005/cart", product);
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      payload: response.data.id,
    });
    localStorage.setItem("CartItem", response.data.token);
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

export const createProducts = (newProduct) => {
  return async (dispatch) => {
    try {
      dispatch(addProductsRequest());
      await axios.post("http://localhost:3005/", newProduct);
      dispatch(addProductSuccess());
      fetchProduct();
    } catch (error) {
      dispatch(
        addProductFailure({
          payload: "The product is already available in the store!!",
        })
      );
    }
  };
};
