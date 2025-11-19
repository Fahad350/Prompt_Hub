import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../Api/axios.js";
import { Link, useNavigate } from "react-router-dom";

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
      <div className="min-h-screen bg-cyan-100 flex justify-center items-center text-white">
        <div className="  md:pt-15 sm:pt-10 bg-gray-900 md:p-10 w-100 h-110 rounded-2xl">
          <form onSubmit={handleForm}>
            <h1 className="text-2xl font-bold text-center mb-4">Login </h1>

            <div>
              <label className="text-xl font-semibold">Email</label>
              <br />
              <input
                className="h-12 w-full mt-2 bg-gray-700 p-2 mb-3 rounded-lg"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xl font-semibold mt-6">Password</label>
              <br />
              <input
                className="h-12 w-full mt-2 bg-gray-700 p-2 mb-3 rounded-lg"
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between mt-3">
              <p className="text-red-400">if don't have account?</p>
              <button className="text-cyan-300 cursor-pointer">
                <Link to={"/register"}> Register</Link>
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="h-12 w-full bg-black text-white mt-6 rounded-xl cursor-pointer hover:scale-110 duration-300"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
