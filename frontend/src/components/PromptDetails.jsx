import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../Api/axios";

function PromptDetails() {
  const { id } = useParams();
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPrompt = async () => {
    try {
      const res = await axios.get(`/prompt/unique/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPrompt(res.data.prompt);
    } catch (error) {
      toast.error(error.response?.data?.message || "Prompt fetch error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this prompt?")) return;
    try {
      await axios.delete(`/prompt/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Prompt deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchPrompt();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!prompt) return <p className="text-center">Prompt not found</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-gray-400 min-w-60 min-h-40 rounded-2xl p-4">
        <h2 className="text-2xl font-bold mb-2">{prompt.title}</h2>
        <p className="mb-4">{prompt.content}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(`/prompt/update/${id}`)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromptDetails;
