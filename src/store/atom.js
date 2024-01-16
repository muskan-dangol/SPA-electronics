import { atom } from "recoil";

export const selectedCategoryState = atom({
  key: 'selectedCategoryState', 
  default: ''
})

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
