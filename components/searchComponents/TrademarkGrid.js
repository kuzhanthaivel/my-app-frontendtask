"use client"

import TrademarkCard from "./TrademarkCard";

export default function TrademarkGrid({ formattedData, selectedStatus, selectedCompanies }) {
  return (
    <div className="grid lg:grid-cols-2 gap-4 px-6 w-full mx-auto scale-95 grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4">
      {formattedData
        .filter(item => (selectedStatus === "All" || !selectedStatus || item.status === selectedStatus) &&
          (selectedCompanies.length === 0 || selectedCompanies.includes(item.owner)))
        .map((item, index) => (
          <TrademarkCard key={index} item={item} />
        ))}
    </div>
  )
}