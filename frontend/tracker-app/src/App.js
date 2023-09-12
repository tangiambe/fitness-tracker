import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { NavBar } from "./components/Navbar";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar/>
        <Routes>
          <Route path="/" exact element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;