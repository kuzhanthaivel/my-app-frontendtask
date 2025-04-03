"use client"
import Image from 'next/image'
import { FaSyncAlt } from "react-icons/fa";
import ImageUnavailable from "./assets/Image Unavailable.png";
import classImage from "./assets/classImg.png";

export default function TrademarkCard({ item }) {
  return (
    <div className="w-full border rounded-lg shadow-md p-4 bg-white border-[#E7E6E6] hover:shadow-lg transition-shadow">
      <div className="flex flex-row items-center gap-4">
        <div className="w-40 h-28 bg-white flex items-center justify-center rounded-lg">
          <Image
            className="w-14"
            src={ImageUnavailable}
            alt="Image unavailable"
            width={56}
            height={56}
          />
        </div>
        <div className="flex flex-col items-center text-left w-full">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${item.status === "registered" ? "bg-[#52B649]" :
                item.status === "pending" ? "bg-[#ECC53C]" :
                  item.status === "abandoned" ? "bg-[#EC3C3C]" :
                    "bg-[#4380EC]"
                }`}
            ></span>
            <p
              className={`font-semibold ${item.status === "registered" ? "text-[#52B649]" :
                item.status === "pending" ? "text-[#ECC53C]" :
                  item.status === "abandoned" ? "text-[#EC3C3C]" :
                    "text-[#4380EC]"
                }`}
            >
              {`${item.status === "registered" ? "Live/Registered" :
                item.status === "pending" ? "Live/Pending" :
                  item.status === "abandoned" ? "Dead/Abandoned" :
                    "Others"
                }`}
            </p>
          </div>
          <p className="text-gray-600 text-sm">
            on <span className="font-semibold text-gray-900">
              {item.statusDate}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-between mt-4 gap-2">
        <div className="gap-1">
          <h2 className="text-lg font-bold line-clamp-1">{item.name}</h2>
          <p className="text-gray-700 text-base line-clamp-1">{item.owner}</p>
          <p className="text-gray-500 text-sm">{item.regNumber} • {item.filingDate}</p>
        </div>
        <div className="self-end">
          {item.status === "registered" &&
            (<p className="text-red-500 flex items-center gap-2 text-sm">
              <FaSyncAlt size={14} /> {item.renewalDate}
            </p>)}
        </div>
      </div>

      <div className="flex my-3 gap-2 flex-wrap">
        {item.classes.slice(0, 2).map((cls, i) => (
          <div key={i} className="flex items-center gap-1">
            <Image
              className="w-5"
              src={classImage}
              alt="Class icon"
              width={20}
              height={20}
            />
            <span className="text-gray-900 text-sm">{cls}</span>
          </div>
        ))}
        {item.classes.length > 3 && (
          <div>
            <button
              className="flex items-center justify-center text-black rounded-xl bg-[#EAEAEA] text-sm w-5 aspect-square leading-none"
              type="button"
              aria-label="More classes"
            >
              ...
            </button>
          </div>
        )}
      </div>

      <p className="text-sm text-[#1D1C1D] line-clamp-2 overflow-hidden">{item.description}</p>
    </div>
  )
}