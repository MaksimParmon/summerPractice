import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { basketListAction, removeFromBasket } from "../actions/basketActions";
import BasketItem from "./BasketItem";

export default function Basket({ user }) {
  const dispatch = useDispatch();
  const basketList = useSelector((state) => state.basketList);
  const { error, loading, basketItems } = basketList;

  useEffect(() => {
    dispatch(basketListAction(user));
  }, [dispatch, user]);

  return (
    <div className="col-lg-5">
      <h4 className="mt-3 mb-3 d-flex justify-content-between align-items-center mb-3">
        Корзина
      </h4>
      {basketItems.basket_items !== [] &&
        basketItems.basket_items?.map((item) => (
          <BasketItem
            key={item.id}
            item={item}
            onRemove={() => dispatch(removeFromBasket(item.id, user))}
          />
        ))}
      {basketItems.basket_items !== [] && (
        <div className="card mb-3">
          <div className="card-footer">
            <p className="float-left">Итого</p>
            <h4 className="float-right">{basketItems.total_sum} руб.</h4>
          </div>
        </div>
      )}

      {basketItems.basket_items === [] && (
        <h4 className="mt-3 mb-3 text-center">Корзина пуста</h4>
      )}
    </div>
  );
}
