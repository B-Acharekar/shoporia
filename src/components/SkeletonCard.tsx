// src/components/SkeletonCard.tsx
'use client'

export default function SkeletonCard() {
  return (
    <div className="animate-pulse border rounded-lg p-4">
      <div className="bg-gray-200 h-48 w-full mb-4 rounded-md"></div>
      <div className="bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
      <div className="bg-gray-200 h-4 w-1/2 mb-4 rounded"></div>
      <div className="bg-gray-200 h-10 w-full rounded-md"></div>
    </div>
  );
}
