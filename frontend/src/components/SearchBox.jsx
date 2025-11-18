import React, { useState } from "react";

function SearchBox() {
  const [search, setSearch] = useState("");
  return (
    <div className="text-center mt-4 mb-3 pl-4 ">
      <div className="">
        <input
          type="text"
          placeholder="Search "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-3/4 h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-200"
        />
      </div>
    </div>
  );
}

export default SearchBox;
