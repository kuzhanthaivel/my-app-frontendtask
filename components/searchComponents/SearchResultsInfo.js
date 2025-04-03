"use client"

export default function SearchResultsInfo({ masterSearch, formattedData }) {


  return (
    <>
      <div className="py-4">
        <p className="text-[#4B5563] font-semibold">About {formattedData.length} Trademarks found for {`"${masterSearch}"`}</p>
      </div>
      <div className="bg-[#E7E6E6] h-0.5"></div>
    </>
  )
}