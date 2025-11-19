import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../Api/axios";

function PromptList({ searchTerm = "" }) {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigate = useNavigate();

  const fetchPrompts = async (pageNumber = 1) => {
    try {
      if (pageNumber === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await axios.get(`/prompt/list?page=${pageNumber}&limit=10`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setPrompts((prev) =>
        pageNumber === 1 ? res.data.prompts : [...prev, ...res.data.prompts]
      );

      if (res.data.prompts.length < 10) setHasMore(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Prompt list error");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchPrompts(page);
  }, [page]);

  if (loading && page === 1) return <p className="text-center">Loading...</p>;
  if (prompts.length === 0)
    return <p className="text-center">No prompts found</p>;

  // Filter prompts based on search
  const filteredPrompts = prompts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredPrompts.length === 0 ? (
        <p className="text-center">No matching prompts</p>
      ) : (
        filteredPrompts.map((item) => (
          <div
            key={item._id}
            className="flex justify-center cursor-pointer hover:scale-105 duration-300"
            onClick={() => navigate(`/prompt/${item._id}`)} // navigate to detail page
          >
            <div className="md:px-5 md:py-2 w-full max-w-3xl">
              <div className="border-2 border-gray-200 bg-white p-4 w-full rounded-2xl">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p>{item.content.slice(0, 100)}...</p> {/* snippet */}
              </div>
            </div>
          </div>
        ))
      )}

      {hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default PromptList;
