import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../Api/axios";

function PromptUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch existing prompt data
  const fetchPrompt = async () => {
    try {
      const res = await axios.get(`/prompt/unique/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTitle(res.data.prompt.title);
      setContent(res.data.prompt.content);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch prompt");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  // Handle update submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/prompt/update/${id}`,
        { title, content },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Prompt updated successfully");
      navigate(`/prompt/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  useEffect(() => {
    fetchPrompt();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="bg-slate-200 min-h-screen ">
      <br />
      <br />
      <div className="max-w-xl mx-auto p-8 bg-slate-400  rounded-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Prompt</h2>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Prompt Title"
            className="p-2 border rounded bg-white"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Prompt Content"
            className="p-2 border rounded min-h-[120px] bg-white"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate(`/prompt/${id}`)}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default PromptUpdate;
