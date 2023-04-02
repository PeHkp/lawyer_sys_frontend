import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from '../pages/login/Login';
import Register from './../pages/register/Register';
import Home from './../pages/home/Home';
import Header from "../components/Layout/header/Header";
const ConfigRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Header>
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/*" element={<Navigate to="/login" replace={true} />} /> */}
        </Routes>
      </Header>
    </>
  );
};

export default ConfigRoutes;
