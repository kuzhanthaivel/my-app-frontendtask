"use client"
import Image from 'next/image'
import { FaSyncAlt } from "react-icons/fa";
import ImageUnavailable from "./assets/Image Unavailable.png";
import classImage from "./assets/classImg.png";

export default function TrademarkListItem({ item }) {
  return (
    <div className="grid grid-cols-1 border border-gray-200 rounded-xl xl:border-none sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4 items-center hover:bg-gray-100 pl-2 hover:rounded-2xl p-4">
      <div className="w-40 h-28 bg-white flex items-center justify-center rounded-lg lg:shadow-[0px_4.34px_108.57px_0px_#98989840] lg:shadow-[0px_3.94px_10px_0px_#E8E8E840]">
        <Image className="w-auto h-auto" src={ImageUnavailable} alt="ImageUnavailable" />
      </div>
      <div className="flex flex-col justify-between md:gap-6">
        <div>
          <p className="text-[#1A1A1A] font-semibold">{item.name}</p>
          <p className="text-sm text-[#1A1A1A]">{item.owner}</p>
        </div>
        <div>
          <p className="text-[#1A1A1A] font-semibold">{item.regNumber}</p>
          <p className="text-sm text-[#1A1A1A]">{item.filingDate}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between md:gap-11 gap-5">
        <div>
          <p className={`flex items-center gap-2 ${item.status === "registered" ? "text-[#52B649]" :
            item.status === "pending" ? "text-[#ECC53C]" :
              item.status === "abandoned" ? "text-[#EC3C3C]" :
                "text-[#4380EC]"
            }`} >
            <span className={`rounded-full w-2.5 h-2.5 ${item.status === "registered" ? "bg-[#52B649]" :
              item.status === "pending" ? "bg-[#ECC53C]" :
                item.status === "abandoned" ? "bg-[#EC3C3C]" :
                  "bg-[#4380EC]"
              }`} ></span>
            {`${item.status === "registered" ? "Live/Registered" :
              item.status === "pending" ? "Live/Pending" :
                item.status === "abandoned" ? "Dead/Abandoned" :
                  "Others"
              }`}
          </p>
          <p className="text-sm text-gray-500">on <span className="font-semibold">{item.statusDate}</span></p>
        </div>
        <div>
          {item.status === "registered" && (
            <p className="text-red-500 flex items-center gap-2 text-sm">
              <FaSyncAlt /> {item.renewalDate}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between md:gap-3">
        <p className="text-sm text-[#1D1C1D] line-clamp-2 overflow-hidden">{item.description}</p>
        <div className="flex gap-2 mt-2 text-gray-500 text-xs font-semibold">
          {item.classes.slice(0, 3).map((cls, i) => (
            <div key={i} className="flex items-center gap-1">
              <Image className="w-5" src={classImage} alt="classImage" />
              <span className="py-1 rounded-full">Class {cls}</span>
            </div>
          ))}
          {item.classes.length > 3 && (
            <button
              className="flex items-center justify-center text-black rounded-xl bg-[#EAEAEA] text-sm w-5 aspect-square leading-none"
              type="button"
            >
              ...
            </button>
          )}
        </div>
      </div>
    </div>
  )
}