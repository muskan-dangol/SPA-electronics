import {
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAILURE,

  ADD_PRODUCTS_SUCCESS,
  ADD_PRODUCTS_REQUEST,
  ADD_PRODUCTS_ERROR,

  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  
  AUTH_REQUEST,
  AUTH_USERS,
  AUTH_ERROR,

  // cart
  ADD_PRODUCT_TO_CART,
} from "./action";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  cartItem: "",
  newProduct: "",
  authenticated: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case AUTH_USERS:
      return {
        ...state,
        isLoading: false,
        authenticated: action.payload,
      };
    case AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case EDIT_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case EDIT_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case ADD_PRODUCTS_SUCCESS:
      return {
        ...state,
        newProduct: action.payload,
      };
    case ADD_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ADD_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cartItem: [...state.cartItem, action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
