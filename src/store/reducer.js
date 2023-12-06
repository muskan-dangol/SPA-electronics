import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  ADD_PRICE_FILTER,
  ADD_CATEGORY_FILTER,
  ADD_RATING_FILTER,
} from "./action";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  priceRange: [0, 2000],
  selectedCategory: "",
  ratingRange: 5,
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
    case ADD_CATEGORY_FILTER:
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case ADD_PRICE_FILTER:
      return {
        ...state,
        priceRange: action.payload,
      };
    case ADD_RATING_FILTER:
      return {
        ...state,
        ratingRange: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
