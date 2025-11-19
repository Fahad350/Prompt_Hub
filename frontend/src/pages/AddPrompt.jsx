import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../Api/axios";
import { Link } from "react-router-dom";

function AddPrompt() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "/prompt/create",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Add New prompt Successfully!");
      setTimeout(() => navigate("/"), 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "add prompt error");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center text-white p-4">
        <div className="bg-gray-900 p-6 sm:p-10 w-full max-w-md rounded-2xl">
          <h1 className="text-2xl text-center mb-5">Add New Prompts</h1>

          <form onSubmit={handleForm}>
            <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
              <label className="mr-4 text-xl mb-1 sm:mb-0">Title</label>
              <input
                type="text"
                placeholder="Prompt Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-8 bg-gray-700 rounded-xl p-2"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between mb-5">
              <label className="mr-4 text-xl mb-1 sm:mb-0">Content</label>
              <textarea
                placeholder="Prompt Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-25 bg-gray-700 rounded-xl p-2"
              />
            </div>

            <button
              className="bg-black text-white cursor-pointer hover:scale-110 duration-300 rounded-2xl w-full h-10"
              type="submit"
            >
              Add Prompt
            </button>

            <Link to={"/"}>
              <button className="bg-gray-800 text-white cursor-pointer hover:scale-110 duration-300 mt-3 rounded-2xl w-full h-10">
                Back Home
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddPrompt;
