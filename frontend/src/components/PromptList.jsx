import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../Api/axios";

function PromptList({ searchTerm = "" }) {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePrompts = async () => {
    try {
      const res = await axios.get("/prompt/list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPrompts(res.data.prompts); // backend returns { prompts: [...] }
      console.log(res.data); // What does this show?
    } catch (error) {
      toast.error(error.response?.data?.message || "Prompt list error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePrompts();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (prompts.length === 0)
    return <p className="text-center">No prompts found</p>;

  // Filter prompts based on searchTerm
  const filteredPrompts = prompts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredPrompts.length === 0)
    return <p className="text-center">No matching prompts</p>;

  return (
    <div className="space-y-4">
      {filteredPrompts.map((item) => (
        <div
          key={item._id}
          className="flex justify-center cursor-pointer hover:scale-105 duration-300"
        >
          <div className="md:px-5 md:py-2 w-full max-w-xl">
            <div className="border-2 border-gray-200 p-4 w-full rounded-2xl">
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p>{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PromptList;
