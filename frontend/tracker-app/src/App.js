import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { NavBar } from "./components/Navbar";
import { Register } from "./components/register/Register";
import { Login } from "./components/Login";
import { Dashboard }  from "./components/dashboard/Dashboard";
import { Foods } from "./components/dashboard/Foods";
import { Details } from "./components/dashboard/Details";
import { Steps } from "./components/dashboard/Steps";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar/>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/foods" element={<Foods />} />
          <Route path="/steps" element={<Steps />} />
          <Route path="/details" element={<Details />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;