import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/bootstrap/dist/js/bootstrap.min.js";
import TopBar from "./components/topbar/TopBar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import About from "./pages/about/about";
import Category from "./pages/category/Category";
import Update from "./pages/update/Update";
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Context } from "./context/Context";

function App() {
  const { user } = React.useContext(Context);
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/update/:id" element={user ? <Update /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/:postId" element={<Single />} />
        <Route path="/category" element={user ? <Category /> : <Login />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
