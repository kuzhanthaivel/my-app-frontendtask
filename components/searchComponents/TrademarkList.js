"use client"

import TrademarkListItem from "./TrademarkListItem";

export default function TrademarkList({ formattedData, selectedStatus, selectedCompanies }) {
  return (
    <div className="w-full mx-auto bg-white pt-4 rounded-lg max-w-4xl">
      <div className="hidden xl:grid grid-cols-4 text-[#313131] font-bold border-b pb-2 border-b-[#E7E6E6] text-center flex justify-center items-center">
        <span className="pl-6">Mark</span>
        <span className="">Details</span>
        <span className="">Status</span>
        <span className="">Class/Description</span>
      </div>
      <div className="flex flex-col gap-4 xl:gap-0">
        {formattedData
          .filter(item => (selectedStatus === "All" || !selectedStatus || item.status === selectedStatus) &&
            (selectedCompanies.length === 0 || selectedCompanies.includes(item.owner)))
          .map((item, index) => (
            <TrademarkListItem key={index} item={item} />
          ))}
      </div>
    </div>
  )
}