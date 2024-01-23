import { atom } from "recoil";

export const userSignupState = atom({
  key: "userSignupState",
  default: { email: "", password: "", username: "" },
});

export const userSigninState = atom({
  key: "userSigninState",
  default: { email: "", password: "", username: "" },
});

export const selectedCategoryState = atom({
  key: "selectedCategoryState",
  default: "",
});

export const discountFilterState = atom({
  key: "discountFilterState",
  default: false,
});

export const priceRangeState = atom({
  key: "priceRangeState",
  default: [0, 2000],
});

export const searchTermState = atom({
  key: "searchTermState",
  default: "",
});

export const ratingFilterState = atom({
  key: "RatingFilterStata",
  default: 5,
});

export const formDataState = atom({
  key: "formDataState",
  default: {
    title: "",
    description: "",
    price: 0,
    stock: 0,
    brand: "",
    discountPercentage: 0,
    category: "",
    rating: 0,
    img: "",
  },
});
