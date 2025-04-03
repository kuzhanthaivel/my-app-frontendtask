"use client"

import StatusFilter from "./StatusFilter";
import OwnersFilter from "./OwnersFilter";
import DisplayOptions from "./DisplayOptions";

export default function FiltersSidebar({ 
  open, 
  selectedStatus, 
  setSelectedStatus, 
  formattedData, 
  filterSearch, 
  setFilterSearch, 
  selectedCompanies, 
  toggleSelection,
  currentView,
  setCurrentView
}) {
  return (
    <div className={`w-72 space-y-6 ${open ? "absolute z-10 top-[360px] right-0 bg-white p-4 shadow-lg sm:shadow-none" : "hidden"} sm:block sm:relative sm:top-0 sm:left-0 sm:bg-transparent sm:p-0`}>
      <div className="w-full p-4 gap-5 bg-white rounded-lg shadow-[0px_4.34px_108.57px_0px_#98989840] shadow-[0px_3.94px_10px_0px_#E8E8E840] flex flex-col">
        <StatusFilter 
          selectedStatus={selectedStatus} 
          setSelectedStatus={setSelectedStatus} 
        />
      </div>

      <div className="w-full p-4 gap-5 bg-white rounded-lg shadow-[0px_4.34px_108.57px_0px_#98989840] shadow-[0px_3.94px_10px_0px_#E8E8E840] flex flex-col">
        <OwnersFilter 
          formattedData={formattedData}
          filterSearch={filterSearch}
          setFilterSearch={setFilterSearch}
          selectedCompanies={selectedCompanies}
          toggleSelection={toggleSelection}
        />
      </div>

      <div className="w-full p-4 gap-5 bg-white rounded-lg shadow-[0px_4.34px_108.57px_0px_#98989840] shadow-[0px_3.94px_10px_0px_#E8E8E840] flex flex-col">
        <DisplayOptions 
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      </div>
    </div>
  )
}