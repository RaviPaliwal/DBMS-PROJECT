import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import UserDashboard from "./Components/UserDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          index
          element={
            <>
              <HomePage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <LoginPage />
            </>
          }
        />
        <Route
          path="/user"
          element={
            <>
              <UserDashboard />
            </>
          }
        />

        <Route
          path="/signup"
          element={
            <>
              <SignupPage/>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
