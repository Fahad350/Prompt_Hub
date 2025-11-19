import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../Api/axios.js";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/login.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/user/login", {
        email,
        password,
      });
      toast.success("Login Successfully!");

      localStorage.setItem("token", data.token);

      setTimeout(() => navigate("/"), 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-300 flex justify-center items-center text-white p-4">
        <div
          style={{ backgroundImage: `url(${loginImg})` }}
          className="bg-cover bg-center bg-gray-900 p-6 sm:p-10 w-full max-w-md rounded-2xl"
        >
          <form onSubmit={handleForm}>
            <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

            <div>
              <label className="text-xl font-semibold">Email</label>
              <input
                className="h-12 w-full mt-2 bg-gray-300 text-purple-700 p-2 mb-3 rounded-lg"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xl font-semibold">Password</label>
              <input
                className="h-12 w-full mt-2 bg-gray-300 text-purple-700 p-2 mb-3 rounded-lg"
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between mt-3 text-center sm:text-left gap-2">
              <p className="text-red-400 text-sm sm:text-base">
                If you don't have an account?
              </p>

              <Link
                to={"/register"}
                className="text-cyan-300 text-sm sm:text-base"
              >
                Register
              </Link>
            </div>

            <button
              type="submit"
              className="h-12 w-full bg-black text-white mt-6 rounded-xl cursor-pointer hover:scale-110 duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
