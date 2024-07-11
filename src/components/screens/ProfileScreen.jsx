import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../actions/userActions";
import Navigation from "../Navigation";
import Basket from "../Basket";

export default function ProfileScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const profileUser = useSelector((state) => state.profileUser);
  const { loading, error, user } = profileUser;

  useEffect(() => {
    dispatch(userProfile(id));
  }, [dispatch, id]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setUsername(user.username || "");
      setEmail(user.email || "");
      setImage(user.image || "");
    }
  }, [user]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     formSubmitHandler({
  //       first_name: firstName,
  //       last_name: lastName,
  //       username,
  //       email,
  //       image,
  //     });
  //   };

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="row">
          <div className="col-lg-7" style={{ paddingTop: "56px" }}>
            <h4 className="mt-3 mb-3">Профиль</h4>
            <div className="col-lg-12 text-center">
              <img
                width="100"
                height="100"
                src={
                  user.image
                    ? `http://127.0.0.1:8000${user.image}`
                    : "http://127.0.0.1:8000/media/users_images/default_avatar.jpg"
                }
                className="img-thumbnail"
                alt="Profile"
              />
            </div>
            <form encType="multipart/form-data">
              <div className="form-row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="small mb-1" htmlFor="firstName">
                      Имя
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="small mb-1" htmlFor="lastName">
                      Фамилия
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-row mb-2">
                <div className="col-lg-12">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="image"
                      onChange={handleImageChange}
                    />
                    <label className="custom-file-label" htmlFor="image">
                      Выберите изображение
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="small mb-1" htmlFor="username">
                      Имя пользователя
                    </label>
                    <input
                      readOnly
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="small mb-1" htmlFor="email">
                      Адрес электронной почты
                    </label>
                    <input
                      readOnly
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-12" style={{ marginTop: "33px" }}>
                  <button type="submit" className="btn btn-info btn-block">
                    Сохранить
                  </button>
                </div>
              </div>
            </form>
          </div>
          <Basket user={id} />
        </div>
      </div>
    </>
  );
}
