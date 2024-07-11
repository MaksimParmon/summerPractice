import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import "./LoginScreen/auth.css";

export default function RegisterScreen() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Пароли не совпадают");
    } else {
      dispatch(register(firstname, lastname, username, email, password));
    }
  };

  useEffect(() => {
    import("https://code.jquery.com/jquery-3.5.1.min.js");
    import(
      "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
    );
    import(
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js"
    );
  }, []);

  return (
    <div className="bg-primary">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                {message && (
                  <div
                    style={{ marginTop: "50px" }}
                    className="alert alert-warning alert-dismissible fade show"
                  >
                    {message}
                    <button
                      type="button"
                      className="close"
                      onClick={() => setMessage("")}
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                )}
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">
                      Создать аккаунт
                    </h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={submitHandler}>
                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="small mb-1" htmlFor="firstname">
                              Имя
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={firstname}
                              onChange={(e) => setFirstname(e.target.value)}
                              id="firstname"
                              placeholder="Введите имя пользователя"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="small mb-1" htmlFor="lastname">
                              Фамилия
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={lastname}
                              onChange={(e) => setLastname(e.target.value)}
                              id="lastname"
                              placeholder="Введите фамилию"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="small mb-1" htmlFor="username">
                              Введите логин
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              id="username"
                              placeholder="Введите логин"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="small mb-1" htmlFor="email">
                              Введите электронную почту
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              id="email"
                              placeholder="Введите электронную почту"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="small mb-1" htmlFor="password">
                              Введите пароль
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
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              className="small mb-1"
                              htmlFor="confimrPassword"
                            >
                              Повторите пароль
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              id="confimrPassword"
                              placeholder="Повторите пароль"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group mt-4 mb-0">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Создать аккаунт
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center">
                    <NavLink
                      to={redirect ? `/login?redirect=${redirect}` : "/login"}
                    >
                      Уже есть аккаунт? Авторизоваться
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
