import React, { useState } from "react";
import axios from "../../Api/axios.js";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/user/register",
        { name, email, password },
        { withCredentials: true }
      );
      toast.success("User Registered Successfully!");

      setTimeout(() => {
        navigate("/login"), 800;
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid register credentials"
      );
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-300 flex justify-center items-center text-white p-4">
        <div className="bg-gray-900 p-6 sm:p-10 w-full max-w-md rounded-2xl">
          <form onSubmit={handleForm}>
            <h1 className="text-2xl font-bold text-center">Register</h1>

            <div>
              <label className="text-xl font-semibold">Name</label>
              <input
                className="h-12 w-full mt-2 bg-gray-700 p-2 mb-3 rounded-lg"
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xl font-semibold">Email</label>
              <input
                className="h-12 w-full mt-2 bg-gray-700 p-2 mb-3 rounded-lg"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xl font-semibold">Password</label>
              <input
                className="h-12 w-full mt-2 bg-gray-700 p-2 mb-3 rounded-lg"
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between text-center sm:text-left mt-3 gap-2">
              <p className="text-red-400">If already have account?</p>

              <Link to={"/login"} className="text-cyan-300 cursor-pointer">
                Login
              </Link>
            </div>

            <button
              type="submit"
              className="h-12 w-full bg-black text-white mt-6 rounded-xl cursor-pointer hover:scale-110 duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
