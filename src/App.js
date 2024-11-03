// App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/Login";
import Header from "../src/Header";
import Cookies from "js-cookie";
import "./App.css";

const App = () => {
  const jwtToken = Cookies.get("jwt_token");
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={jwtToken ? <Navigate to="/header" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/header" element={<Header />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
