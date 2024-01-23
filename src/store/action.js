import axios from "axios";

export const EDIT_PRODUCT_REQUEST = "EDIT_PRODUCT_REQUEST";
export const EDIT_PRODUCT_SUCCESS = "EDIT_PRODUCT_SUCCESS";
export const EDIT_PRODUCT_FAILURE = "EDIT_PRODUCT_FAILURE";

export const ADD_PRODUCTS_REQUEST = "ADD_PRODUCTS_REQUEST";
export const ADD_PRODUCTS_SUCCESS = "ADD_PRODUCTS_SUCCESS";
export const ADD_PRODUCTS_ERROR = "ADD_PRODUCTS_ERROR";

export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

// cart
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";

// user authentication
export const AUTH_REQUEST = "auth_request";
export const AUTH_USERS = "auth_users";
export const AUTH_ERROR = "auth_error";

const authRequest = () => {
  return {
    type: AUTH_REQUEST,
  };
};
const authError = () => {
  return {
    type: AUTH_ERROR,
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

const deleteProductRequest = () => {
  return {
    type: DELETE_PRODUCT_REQUEST,
  };
};

const deleteProductSuccess = () => {
  return {
    type: DELETE_PRODUCT_SUCCESS,
  };
};

const deleteProductFailure = (error) => {
  return {
    type: DELETE_PRODUCT_FAILURE,
    payload: error,
  };
};

export const addProductToCart = (cartItem) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: cartItem,
  };
};

export const signup = (e, callback) => async (dispatch) => {
  try {
    dispatch(authRequest());
    const response = await axios.post("http://localhost:3005/signup", e);
    dispatch({ type: AUTH_USERS, payload: response.data.token });
    localStorage.setItem("Token", response.data.token);
    callback();
  } catch (error) {
    dispatch(authError("Email in use already"));
  }
};

export const signin = (e, callback) => async (dispatch) => {
  try {
    dispatch(authRequest());
    const response = await axios.post("http://localhost:3005/signin", e);
    dispatch({ type: AUTH_USERS, payload: response.data.token });
    localStorage.setItem("Token", response.data.token);
    callback();
  } catch (error) {
    dispatch(authError("invalid login credentialas"));
  }
};

export const signout = () => {
  localStorage.removeItem("Token");
  return {
    type: AUTH_USERS,
    payload: "",
  };
};

export const editProduct = (_id, updatedData) => {
  return async (dispatch) => {
    dispatch(editProductRequest());
    await axios
      .put(`http://localhost:3005/products/${_id}`, updatedData)
      .then(() => {
        dispatch(editProductSuccess);
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

export const deleteProduct = (_id) => {
  return async (dispatch) => {
    dispatch(deleteProductRequest());
    await axios
      .delete(`http://localhost:3005/products/${_id}`)
      .then(() => {
        dispatch(deleteProductSuccess);
      })
      .catch((error) => {
        dispatch(deleteProductFailure(error.message));
      });
  };
};

export const createProducts = (newProduct) => {
  return async (dispatch) => {
    try {
      dispatch(addProductsRequest());
      await axios.post("http://localhost:3005/products", newProduct);
      dispatch(addProductSuccess());
    } catch (error) {
      dispatch(
        addProductFailure({
          payload: "The product is already available in the store!!",
        })
      );
    }
  };
};
