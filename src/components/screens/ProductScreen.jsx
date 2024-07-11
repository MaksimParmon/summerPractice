import React, { useState, useEffect } from "react";
import { listProductDetails } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import Navigation from "../Navigation";
import Footer from "../Footer";
import "./HomeScreen/HomeScreen.css";

export default function ProductScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);
  return (
    <>
      <div className="py-5">
        <Navigation />
        {loading ? (
          <Loader />
        ) : (
          <div className="container mt-5" style={{ marginBottom: "10  0px" }}>
            <div className="row">
              <div className="col-md-6">
                <img
                  src={`http://127.0.0.1:8000${product.image}`}
                  alt={product.name}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-6">
                <h2 className="my-3">{product.name}</h2>
                <h4 className="text-muted">{product.price} BYN</h4>
                <p className="mt-3">{product.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
