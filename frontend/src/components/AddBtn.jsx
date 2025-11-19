import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AddBtn() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className="bg-gray-900 text-2xl text-white p-5 
      flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h1 className="text-center sm:text-left">AI Prompt Bookmark Hub</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="text-xl bg-gray-800 px-4 py-2 cursor-pointer hover:bg-black hover:scale-110 duration-300">
          <Link to={"/add"}>Add Prompts</Link>
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
