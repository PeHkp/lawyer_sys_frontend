import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Home from '../pages/home/Home';
import Header from "../components/Layout/header/Header";
import RecoverPassword from "../pages/recover-password/RecoverPassword";
import Lawyer from "../pages/lawyer/Lawyer";
import Customer from "../pages/customer/Customer";
import Trainner from "../pages/trainee/Trainne";
import Book from "../pages/book/Book";
import Action from "../pages/action/Action";
import Loan from "../pages/loan/Loan";
import Report from "../pages/report/Report";
const ConfigRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
      </Routes>
      <Header>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/lawyer" element={<Lawyer />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/trainner" element={<Trainner />} />
          <Route path="/book" element={<Book />} />
          <Route path="/action" element={<Action />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Header>
    </>
  );
};

export default ConfigRoutes;
