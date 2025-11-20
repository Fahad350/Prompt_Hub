import React, { useState } from "react";
import axios from "axios";

function OpenAIForm() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/openai/run",
        { prompt },
        {
          headers: {
            Authorization: "Bearer my-secret-token",
          },
        }
      );

      setResponse(res.data.choices?.[0]?.message?.content || "No response");
    } catch (err) {
      console.error(err);
      setResponse("Error fetching response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-gray-300 ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          className="border p-2 rounded bg-gray-100"
          rows={4}
          placeholder="Type your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </form>

      {response && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <h3 className="font-bold mb-2">Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default OpenAIForm;
