"use client"
import Image from 'next/image'
import Searchicon from './assets/Searchicon.png';

export default function OwnersFilter({ 
  formattedData, 
  filterSearch, 
  setFilterSearch, 
  selectedCompanies, 
  toggleSelection 
}) {
  return (
    <div className="p-4 gap-1">
      <div className="flex pb-2 mb-2 space-x-4 text-sm">
        <span className="font-semibold ">Owners</span>
      </div>
      <div className="flex border bg-white border-[#D4D4D4] rounded-xl items-center p-1">
        <Image className="w-6 h-6" src={Searchicon} alt="Search" />
        <input
          type="text"
          placeholder="Search Owners"
          value={filterSearch}
          onChange={(e) => setFilterSearch(e.target.value)}
          className="w-full focus:border-transparent focus:outline-none focus:ring-0 text-sm"
        />
      </div>

      <div className="max-h-40 overflow-y-auto rounded p-2">
        {formattedData
          .filter((item) => item.owner.toLowerCase().includes(filterSearch.toLowerCase()))
          .filter((item, index, self) =>
            index === self.findIndex((t) => t.owner === item.owner)
          )
          .map((item) => (
            <div key={item.id} className="flex items-center space-x-2 py-1">
              <input
                type="checkbox"
                checked={selectedCompanies.includes(item.owner)}
                onChange={() => toggleSelection(item.owner)}
                className="w-4 h-4 rounded-2xl flex-shrink-0"
              />
              <span
                className={`text-sm line-clamp-1 ${selectedCompanies.includes(item.owner) ? "text-blue-600" : ""
                  }`}
              >
                {item.owner}
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}