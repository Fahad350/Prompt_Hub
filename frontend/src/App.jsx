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
import OpenAIForm from "./components/OpenAiForm";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prompts"
            element={
              <ProtectedRoute>
                <PromptList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prompt/:id"
            element={
              <ProtectedRoute>
                <PromptDetait />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddPrompt />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prompt/update/:id"
            element={
              <ProtectedRoute>
                <PromptUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/openai"
            element={
              <ProtectedRoute>
                <OpenAIForm />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer position="top-center" autoClose={2000} />
      </BrowserRouter>
    </>
  );
}

export default App;
