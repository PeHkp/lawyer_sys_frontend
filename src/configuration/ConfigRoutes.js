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
        <Route path="/*" element={<Navigate to="/login" replace={true} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Header><Home /></Header>} />

      </Routes>
    </>
  );
};

export default ConfigRoutes;