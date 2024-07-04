import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { useParams } from "react-router-dom";
import Product from "./Product";
import Loader from "./Loader";

export default function Products() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;
  useEffect(() => {
    dispatch(listProducts(category));
  }, [dispatch, category]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          {products?.map((product) => (
            <div key={product.id} className="col-lg-4 col-md-6 mb-4">
              <Product product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
