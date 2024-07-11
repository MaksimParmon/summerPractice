import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./components/screens/HomeScreen/HomeScreen";
import LoginScreen from "./components/screens/LoginScreen/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ProductScreen from "./components/screens/ProductScreen";
import ProfileScreen from "./components/screens/ProfileScreen";

function App() {
  useEffect(() => {
    document.title = "MPSHOP";
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/:category?" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/users/profile/:id" element={<ProfileScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
