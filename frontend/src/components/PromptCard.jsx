import React, { useState } from "react";
import AddBtn from "./AddBtn";
import SearchBox from "./SearchBox";
import PromptList from "./PromptList";

function PromptCard() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-white flex justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-gray-200 rounded-2xl ">
        <AddBtn />
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <PromptList searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default PromptCard;
