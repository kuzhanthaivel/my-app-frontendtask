"use client"
import Image from 'next/image'
import Logo from "./assets/TradeMarkiaLogo.png";
import Searchicon from './assets/Searchicon.png';

export default function SearchHeader({ masterSearch, setMasterSearch }) {
  return (
    <div className="w-full h-auto flex md:flex-row items-center justify-start md:gap-9 sm:p-4 sm:pl-14 bg-[#F8FAFE] flex-col p-3 gap-3">
      <Image className="w-40" src={Logo} alt="Trademarkia Logo" />
      <div className="flex sm:flex-row w-auto space-x-3 justify-center items-center flex-col gap-3">
        <div className="flex border p-2 bg-white border-[#D4D4D4] rounded-xl border-2 items-center gap-1 w-auto">
          <Image className="w-6 h-6" src={Searchicon} alt="Search" />
          <input
            className="md:w-96 focus:border-transparent focus:outline-none focus:ring-0 "
            type="text"
            placeholder="Search Trademark Here eg. Mickey Mouse"
            onChange={(e) => setMasterSearch(e.target.value)}
            value={masterSearch}
          />
        </div>
        <button
          className="flex text-white md:w-32 items-center justify-center md:p-3 bg-[#4380EC] rounded-xl p-2 "
          type="button"
        >
          Search
        </button>
      </div>
    </div>
  )
}