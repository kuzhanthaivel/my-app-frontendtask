"use client"
import Image from 'next/image'
import Fillter from "./assets/Filter.png";
import Share from "./assets/share.png";
import Sort from "./assets/sort.png";

export default function ActionButtons({ open, handleClick, setMasterSearch, masterSearch }) {

  const generateSuggestions = (word) => {
    if (!word || word.length < 2) return [];
    return [word.slice(0, -1), word.slice(0, -2)].filter(Boolean);
  };
  const suggestions = generateSuggestions(masterSearch);

  return (<div className="flex sm:justify-between sm:items-center w-full py-3 px-1 flex-col gap-2 sm:flex-row">
          <div className="flex gap-3 items-center text-center py-3">
        <p className="text-[#4B5563]">Also try searching for</p>
        <div className="flex gap-2">
          {suggestions.slice(0, 2).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setMasterSearch(suggestion)}
              className="flex items-center justify-center p-2 bg-[#FEF7F0] rounded-xl border border-[#E7760E] text-[#E7760E]"
              type="button"
            >
              {suggestion}*
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-3 items-end justify-end">
      <button
        className={`gap-1 p-2 rounded-xl border border-[#969696] flex items-center justify-center text-sm ${open ? 'bg-[#5999f4] border border-[#4380EC] text-black' : ""}`}
        type="button"
        onClick={handleClick}
      >
        <Image src={Fillter} alt="Filter" />
        Filter
      </button>
      <button
        className="p-3 rounded-full text-[#575757] border border-[#C8C8C8] flex items-center justify-center text-sm"
        type="button"
        onClick={() => navigator.share({
          title: document.title,
          url: window.location.href
        })}
      >
        <Image src={Share} alt="Share" />
      </button>
      <button
        className="p-3 rounded-full text-[#575757] border border-[#C8C8C8] flex items-center justify-center text-sm"
        type="button"
      >
        <Image src={Sort} alt="Sort" />
      </button>
    </div>
  </div>

  )
}