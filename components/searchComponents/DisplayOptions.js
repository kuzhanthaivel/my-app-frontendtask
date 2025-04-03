"use client"

export default function DisplayOptions({ currentView, setCurrentView }) {
  return (
    <div className="p-4 bg-white rounded-2xl w-full">
      <h2 className="font-semibold mb-3">Display</h2>
      <div className="relative flex bg-gray-100 rounded-lg p-1 w-full">
        <button
          className={`w-1/2 py-2 text-center font-medium transition-all duration-300 rounded-lg text-sm ${currentView === "grid" ? "bg-white shadow-md text-black" : "text-gray-500"}`}
          onClick={() => setCurrentView("grid")}
        >
          Grid View
        </button>
        <button
          className={`w-1/2 py-2 text-center font-medium transition-all duration-300 rounded-lg text-sm ${currentView === "list" ? "bg-white shadow-md text-black" : "text-gray-500"}`}
          onClick={() => setCurrentView("list")}
        >
          List View
        </button>
      </div>
    </div>
  )
}