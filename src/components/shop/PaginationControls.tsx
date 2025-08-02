"use client";

import { Dispatch, SetStateAction } from "react";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function PaginationControls({ page, totalPages, setPage }: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8 gap-2">
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="px-3 py-1">
        {page} / {totalPages}
      </span>
      <button
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
