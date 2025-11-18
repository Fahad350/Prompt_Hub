import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../Api/axios";

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
      <div className="min-h-screen bg-gray-100 flex justify-center items-center text-white">
        <div className=" md:pt-15 sm:pt-10 bg-gray-900 md:p-10 w-100 h-90 rounded-2xl">
          <h1 className="text-2xl text-center mb-5">Add New Prompts</h1>

          <form onSubmit={handleForm}>
            <div className=" flex justify-between">
              <label className="mr-4 text-xl">Title</label>
              <input
                type="text"
                placeholder="Prompt Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-8 mb-3 bg-gray-700 rounded-xl p-2"
              />
            </div>
            <div className=" flex justify-between">
              <label className="mr-4 text-xl">Content</label>
              <textarea
                placeholder="Prompt Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-25 mb-5 bg-gray-700 rounded-xl p-2"
              />
            </div>
            <div>
              <button
                className="bg-black text-white cursor-pointer rounded-2xl w-full h-10"
                type="submit"
              >
                Add Prompt
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddPrompt;
