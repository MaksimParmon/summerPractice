import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addToBasket } from "../actions/basketActions";
import { jwtDecode } from "jwt-decode";

export default function Product({ product }) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addToBasketHandler = () => {
    if (userInfo) {
      const id = jwtDecode(userInfo.access).user_id;
      console.log(id);
      dispatch(addToBasket(product.id, id));
    } else {
      console.error("User not logged in");
    }
  };
  return (
    <div className="card h-100">
      <NavLink to={`/product/${product.id}`}>
        <img
          className="card-img-top"
          src={`http://127.0.0.1:8000${product.image}`}
          alt="sdasd"
        />
      </NavLink>
      <div className="card-body">
        <h4 className="card-title">
          <NavLink to={`/product/${product.id}`}>{product.name}</NavLink>
        </h4>
        <h5>{product.price} руб.</h5>
        <p className="card-text">{product.description}</p>
      </div>
      <div className="card-footer text-center">
        <button
          className="btn btn-outline-success"
          onClick={addToBasketHandler}
        >
          Отправить в корзину
        </button>
      </div>
    </div>
  );
}
