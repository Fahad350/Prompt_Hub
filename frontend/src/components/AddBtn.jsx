import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Api/axios";

function AddBtn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Unknown");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/user/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsername(res.data.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-gray-900 text-2xl text-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-center sm:text-left">AI Prompt Bookmark Hub</h1>
        <p className="text-blue-400 text-lg ">
          Logged In: <span className="font-xl text-gray-300 ">{username}</span>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <button className="text-xl bg-gray-800 px-4 py-2 cursor-pointer hover:bg-black hover:scale-110 duration-300">
          <Link to={"/add"}>Add Prompts</Link>
        </button>
        <button className="text-xl bg-blue-500 px-4 py-2 cursor-pointer hover:bg-black hover:scale-110 duration-300">
          <Link to={"/openai"}>OpenAi</Link>
        </button>

        <button
          onClick={handleLogout}
          className="text-xl bg-gray-800 px-4 py-2 cursor-pointer hover:bg-black hover:scale-110 duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AddBtn;
