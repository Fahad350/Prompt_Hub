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
      <div className="min-h-screen bg-cyan-100 flex justify-center items-center text-white">
        <div className="  md:pt-15 sm:pt-10 bg-gray-900 md:p-10 w-110 h-130 rounded-2xl">
          <form onSubmit={handleForm}>
            <h1 className="text-2xl font-bold text-center ">Register </h1>
            <div>
              <label className="text-xl font-semibold">Name</label>
              <br />
              <input
                className="h-10 w-full mt-2 bg-gray-700 p-2 mb-3 rounded-lg"
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xl font-semibold">Email</label>
              <br />
              <input
                className="h-10 w-full mt-2 bg-gray-700 p-2 mb-3 rounded-lg"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xl font-semibold">Password</label>
              <br />
              <input
                className="h-10 w-full mt-2 bg-gray-700 p-2 mb-3 rounded-lg"
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between mt-3">
              <p className="text-red-400">if already have account?</p>

              <button className="text-cyan-300 cursor-pointer">
                <Link to={"/login"}>Login</Link>
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="h-12 w-full bg-black text-white mt-6 rounded-xl cursor-pointer hover:scale-110 duration-300"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
