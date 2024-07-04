import React, { useEffect } from "react";
import Categories from "../../Categories";
import Carousel from "../../Carousel";
import Products from "../../Products";
import Navigation from "../../Navigation";
import Footer from "../../Footer";

export default function HomeScreen() {
  const bootstrapUrl =
    "http://localhost:8000/static/vendor/bootstrap/css/bootstrap.min.css";

  useEffect(() => {
    import("https://code.jquery.com/jquery-3.5.1.min.js");
    import(
      "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
    );
    import(
      "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
    );
  }, []);
  return (
    <>
      <link rel="stylesheet" href={bootstrapUrl} />
      <Navigation />
      <div className="container" style={{ paddingTop: "56px" }}>
        <div className="row">
          <div className="col-lg-3">
            <Categories />
          </div>
          <div className="col-lg-9">
            <Carousel />
            <Products />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
