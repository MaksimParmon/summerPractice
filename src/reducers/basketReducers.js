import {
  BASKET_ADD_ITEM,
  BASKET_REMOVE_ITEM,
  BASKET_REMOVE_ITEM_FAIL,
  BASKET_LIST_REQUEST,
  BASKET_LIST_SUCCESS,
  BASKET_LIST_FAIL,
} from "../constants/basketConstants";

export const basketReducer = (state = { basketItems: [] }, action) => {
  switch (action.type) {
    case BASKET_ADD_ITEM:
      return {
        ...state,
        basketItems: [...state.basketItems, action.payload],
      };
    default:
      return state;
  }
};

export const basketListReducer = (state = { basketItems: [] }, action) => {
  switch (action.type) {
    case BASKET_LIST_REQUEST:
      return { loading: true, basketItems: [] };
    case BASKET_LIST_SUCCESS:
      return { loading: false, basketItems: action.payload };
    case BASKET_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const basketRemoveReducer = (state = { basketItems: [] }, action) => {
  switch (action.type) {
    case BASKET_REMOVE_ITEM:
      return {
        ...state,
        basketItems: state.basketItems.filter(
          (item) => item.id !== action.payload
        ),
      };
    case BASKET_REMOVE_ITEM_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
