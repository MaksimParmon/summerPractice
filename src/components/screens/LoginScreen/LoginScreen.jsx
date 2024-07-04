import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./auth.css";
import { FaGoogle, FaVk, FaGithub, FaFacebook } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../../actions/userActions";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  useEffect(() => {
    if (error) {
      setLocalError("Неправильный логин или пароль");
    } else {
      setLocalError("");
    }
  }, [error]);

  useEffect(() => {
    import("https://code.jquery.com/jquery-3.5.1.min.js");
    import(
      "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
    );
    import(
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js"
    );
  }, []);

  const closeErrorHandler = () => {
    setLocalError("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <div className="bg-primary">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  {localError && (
                    <div className="alert alert-warning alert-dismissible fade show">
                      Неправильный логин или пароль
                      <button
                        type="button"
                        className="close"
                        onClick={closeErrorHandler}
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  )}
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Авторизация
                      </h3>
                    </div>
                    <div className="card-body">
                      <form onSubmit={submitHandler}>
                        <div className="form-group">
                          <label className="small mb-1" htmlFor="username">
                            Имя пользователя
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            id="username"
                            placeholder="Введите имя пользователя"
                          />
                        </div>
                        <div className="form-group">
                          <label className="small mb-1" htmlFor="password">
                            Пароль
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            placeholder="Введите пароль"
                          />
                        </div>
                        <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                          <button type="submit" className="btn btn-primary">
                            Авторизоваться
                          </button>
                        </div>
                        <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                          <a href="#">
                            <FaGoogle size={32} style={{ color: "#d9503e" }} />
                          </a>
                          <a href="#">
                            <FaVk size={32} style={{ color: "#4a658b" }} />
                          </a>
                          <a href="#">
                            <FaGithub size={32} style={{ color: "#303030" }} />
                          </a>
                          <a href="#">
                            <FaFacebook
                              size={32}
                              style={{ color: "#405794" }}
                            />
                          </a>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center">
                      <div className="small">
                        <NavLink
                          to={
                            redirect
                              ? `/register?redirect=${redirect}`
                              : "/register"
                          }
                        >
                          Нет аккаунта? Зарегистрируйся
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
