import React from "react";

function SearchBox({ searchTerm, setSearchTerm }) {
  // const [search, setSearch] = useState("");
  return (
    <div className="text-center mt-4 mb-3 pl-4 ">
      <div className="">
        <input
          type="text"
          placeholder="Search "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-3/4 h-10 px-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-blue-500"
        />
      </div>
    </div>
  );
}

export default SearchBox;
