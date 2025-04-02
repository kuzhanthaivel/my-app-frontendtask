"use client"
import { Suspense } from 'react';
import SearchContent from "./searchContent"

export default function Search() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
