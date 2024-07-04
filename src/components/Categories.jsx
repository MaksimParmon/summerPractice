import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { listCategories } from "../actions/productActions";

export default function Categories() {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { error, loading, categories } = categoryList;
  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  return (
    <>
      <h1 className="my-4">Категории</h1>
      <div className="list-group">
        {categories?.map((category) => (
          <div className="list-group-item" key={category.id}>
            <NavLink to={`/${category.name}`}>{category.name}</NavLink>
          </div>
        ))}
      </div>
    </>
  );
}
