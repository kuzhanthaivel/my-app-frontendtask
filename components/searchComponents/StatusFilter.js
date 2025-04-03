"use client"

export default function StatusFilter({ selectedStatus, setSelectedStatus }) {
  return (
    <div>
      <p className="text-black font-bold">Status</p>
      <div className="flex flex-wrap gap-2 mt-2">
        <button
          onClick={() => setSelectedStatus("")}
          className={`h-8 px-3 rounded-xl flex items-center gap-1 justify-center text-sm ${selectedStatus === "" ? "border text-[#4380EC] border-[#4380EC] bg-[#EEF4FF]" : "border border-[#D1D1D1] text-black"}`}
          type="button"
        >
          All
        </button>
        <button
          onClick={() => setSelectedStatus("registered")}
          className={`h-8 px-3 rounded-xl flex items-center gap-1 justify-center text-sm ${selectedStatus === "registered" ? "border text-[#4380EC] border-[#4380EC] bg-[#EEF4FF]" : "border border-[#D1D1D1] text-black"}`}
          type="button"
        >
          <span className="w-2.5 h-2.5 bg-[#52B649] rounded-full"></span>
          Registered
        </button>
        <button
          onClick={() => setSelectedStatus("pending")}
          className={`h-8 px-3 rounded-xl flex items-center gap-1 justify-center text-sm ${selectedStatus === "pending" ? "border text-[#4380EC] border-[#4380EC] bg-[#EEF4FF]" : "border border-[#D1D1D1] text-black"}`}
          type="button"
        >
          <span className="w-2.5 h-2.5 bg-[#ECC53C] rounded-full"></span>
          Pending
        </button>
        <button
          onClick={() => setSelectedStatus("abandoned")}
          className={`h-8 px-3 rounded-xl flex items-center gap-1 justify-center text-sm ${selectedStatus === "abandoned" ? "border text-[#4380EC] border-[#4380EC] bg-[#EEF4FF]" : "border border-[#D1D1D1] text-black"}`}
          type="button"
        >
          <span className="w-2.5 h-2.5 bg-[#EC3C3C] rounded-full"></span>
          Abandoned
        </button>
        <button
          onClick={() => setSelectedStatus("others")}
          className={`h-8 px-3 rounded-xl flex items-center gap-1 justify-center text-sm ${selectedStatus === "others" ? "border text-[#4380EC] border-[#4380EC] bg-[#EEF4FF]" : "border border-[#D1D1D1] text-black"}`}
          type="button"
        >
          <span className="w-2.5 h-2.5 bg-[#4380EC] rounded-full"></span>
          Others
        </button>
      </div>
    </div>
  )
}