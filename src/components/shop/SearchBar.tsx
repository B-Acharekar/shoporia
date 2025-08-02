"use client";

import { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function SearchBar({ query, setQuery, setPage }: SearchBarProps) {
  return (
    <div className="flex items-center mb-8">
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 border px-4 py-2 rounded-l-md focus:outline-none"
      />
      <button
        onClick={() => setPage(1)}
        className="bg-black text-white px-6 py-2 rounded-r-md hover:bg-neutral-800"
      >
        Search
      </button>
    </div>
  );
}
