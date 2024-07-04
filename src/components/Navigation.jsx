import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { jwtDecode } from "jwt-decode";

import {
  faShoppingBag,
  faUserCircle,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Navigation() {
  var id;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const isAdmin = false;
  if (userInfo) {
    const decodedToken = jwtDecode(userInfo.access);
    id = decodedToken.user_id;
  }

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  // useEffect(() => {
  //   import("https://code.jquery.com/jquery-3.5.1.min.js");
  //   import(
  //     "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
  //   );
  //   import(
  //     "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
  //   );
  // }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          MPSHOP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Каталог <FontAwesomeIcon icon={faShoppingBag} />
              </NavLink>
            </li>
            {userInfo ? (
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="/"
                  id="navbarDropdown"
                  role="button"
                  data-hover="dropdown"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <FontAwesomeIcon icon={faUserCircle} />
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink
                      to={`/users/profile/${id}`}
                      className="dropdown-item"
                    >
                      Профиль
                    </NavLink>
                  </li>
                  {isAdmin && (
                    <li>
                      <NavLink className="dropdown-item" to="/admin">
                        Админ-панель
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={logoutHandler}>
                      Выйти
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Войти <FontAwesomeIcon icon={faSignInAlt} />
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
