import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import PromptList from "./components/PromptList";
import PromptDetait from "./components/PromptDetails";
import AddPrompt from "./pages/AddPrompt";
import PromptUpdate from "./components/PromptUpdate";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />

          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/prompts" element={<PromptList />} />
          <Route path="/prompt/:id" element={<PromptDetait />} />
          <Route path="/add" element={<AddPrompt />} />
          <Route path="//prompt/update/:id" element={<PromptUpdate />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={2000} />
      </BrowserRouter>
    </>
  );
}

export default App;
