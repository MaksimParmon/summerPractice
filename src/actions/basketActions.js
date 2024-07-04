import axios from "axios";
import {
  BASKET_ADD_ITEM,
  BASKET_REMOVE_ITEM,
  BASKET_REMOVE_ITEM_FAIL,
  BASKET_LIST_REQUEST,
  BASKET_LIST_SUCCESS,
  BASKET_LIST_FAIL,
} from "../constants/basketConstants";

export const addToBasket = (productId, userId) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://127.0.0.1:8000/api/basket/", {
      product: productId,
      user: userId,
    });

    dispatch({
      type: BASKET_ADD_ITEM,
      payload: data,
    });
  } catch (error) {
    console.error("Error adding item to basket:", error);
  }
};

export const removeFromBasket = (id, userId) => async (dispatch) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/basket/delete/${id}`);
    dispatch({
      type: BASKET_REMOVE_ITEM,
      payload: id,
    });
    console.log("Удаление элемента с id:", id);
    dispatch(basketListAction(userId));
  } catch (error) {
    dispatch({
      type: BASKET_REMOVE_ITEM_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const basketListAction = (userid) => async (dispatch) => {
  try {
    dispatch({ type: BASKET_LIST_REQUEST });
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/basket/${userid}`
    );
    console.log("Удаление элемента с id:", userid);
    dispatch({
      type: BASKET_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BASKET_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
