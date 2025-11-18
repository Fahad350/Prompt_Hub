import React from "react";
import { Link } from "react-router-dom";
function AddBtn() {
  return (
    <div className="bg-gray-900 text-2xl text-white p-5 flex justify-between">
      <div>
        <h1>AI Prompt Bookmark Hub</h1>
      </div>
      <div>
        <button className="text-xl bg-gray-800 px-4 py-2 cursor-pointer  hover:bg-black hover:scale-110 duration-300">
          <Link to={"/add"}>Add Prompts</Link>
        </button>
        <button className="text-xl bg-gray-800 px-4 py-2 ml-4 cursor-pointer hover:bg-black hover:scale-110 duration-300">
          <Link to={"/login"}>Logout</Link>
        </button>
      </div>
    </div>
  );
}

export default AddBtn;
