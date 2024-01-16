import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAILURE,

  ADD_PRODUCTS_SUCCESS,
  ADD_PRODUCTS_REQUEST,
  ADD_PRODUCTS_ERROR,

  FETCH_PRODUCTBYID_REQUEST,
  FETCH_PRODUCTBYID_SUCCESS,
  FETCH_PRODUCTBYID_FAILURE,
  // cart
  ADD_PRODUCT_TO_CART,
} from "./action";

const initialState = {
  data: [],
  productDetail: {},
  isLoading: false,
  error: null,
  cartItem: "",
  newProduct: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      case FETCH_PRODUCTBYID_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_PRODUCTBYID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productDetail: action.payload,
      };
    case FETCH_PRODUCTBYID_FAILURE:
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
