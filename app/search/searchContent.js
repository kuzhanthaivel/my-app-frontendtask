"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { Poppins } from 'next/font/google';
import { useState, useEffect } from "react";
import Logo from "./assets/TradeMarkiaLogo.png";
import Searchicon from './assets/Searchicon.png';
import Fillter from "./assets/Filter.png";
import Share from "./assets/share.png";
import Sort from "./assets/sort.png";
import ImageUnavailable from "./assets/Image Unavailable.png";
import { FaSyncAlt, FaExclamationTriangle } from "react-icons/fa";
import Image from 'next/image'
import classImage from "./assets/classImg.png";

const poppins = Poppins({
    subsets: ["latin"],
    weight: "400",
  });

export default function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
  
  
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || "");
    const [masterSearch, setMasterSearch] = useState(searchParams.get("q") || "nike");
    const [filterSearch, setFilterSearch] = useState("");
    const [currentView, setCurrentView] = useState(searchParams.get('view') || "list")
    const [apiResData, setApiResData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
  
    const toggleSelection = (companyName) => {
      setSelectedCompanies((prev) =>
        prev.includes(companyName)
          ? prev.filter((name) => name !== companyName)
          : [...prev, companyName]
      );
    };
  
    const handleClick = () => {
      setOpen(prevState => !prevState); // Toggles the state
    };
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
  
        try {
          const response = await fetch("https://vit-tm-task.api.trademarkia.app/api/v3/us", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              input_query: masterSearch || "",
              input_query_type: "",
              sort_by: "default",
              status: selectedStatus ? [selectedStatus] : [],
              exact_match: false,
              date_query: false,
              owners: [],
              attorneys: [],
              law_firms: [],
              mark_description_description: [],
              classes: [],
              page: 1,
              rows: 10,
              sort_order: "desc",
              states: [],
              counties: [],
            }),
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
  
          const result = await response.json();
          setApiResData(result);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      const params = new URLSearchParams();
      if (masterSearch) params.set("q", masterSearch);
      if (currentView) params.set("view", currentView);
      if (selectedStatus) params.set("status", selectedStatus);
  
      router.push(`?${params.toString()}`, undefined, { shallow: true });
  
      fetchData();
    }, [masterSearch, currentView, selectedStatus]);
  
    const formatDate = (timestamp) => {
      if (!timestamp) return "N/A";
      return new Date(timestamp * 1000).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    };
  
    const formattedData = apiResData?.body?.hits?.hits
      ? apiResData.body.hits.hits.map((hit) => ({
        id: hit._id,
        status: hit._source.status_type,
        statusDate: formatDate(hit._source.status_date),
        name: hit._source.mark_identification,
        owner: hit._source.current_owner,
        regNumber: hit._source.registration_number,
        filingDate: formatDate(hit._source.filing_date),
        renewalDate: formatDate(hit._source.renewal_date),
        classes: hit._source.class_codes,
        description: hit._source.mark_description_description?.[0] || "No description",
        lawFirm: hit._source.law_firm || "N/A",
        attorney: hit._source.attorney_name || "N/A"
      }))
      : [];
  
    return (
      <main className={`${poppins.className} bg-white text-black `}>
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
              onClick={() => alert("I am done with the useEffect")}
            >
              Search
            </button>
          </div>
        </div>
  
        <div className="bg-[#EAF1FF] h-1.5"></div>
  
        <div className="px-10 ">
          <div className="py-4">
            <p className="text-[#4B5563] font-semibold">About {formattedData.length} Trademarks found for {`"${masterSearch}"`}</p>
          </div>
  
          <div className="bg-[#E7E6E6] h-0.5"></div>
  
  
  
          <div className="flex sm:justify-between sm:items-center w-full py-3 px-1 flex-col gap-2 sm:flex-row">
            <div className="flex gap-3 items-center text-center">
              <p className="text-[#4B5563]">Also try searching for</p>
              <div className="flex gap-2">
                {(() => {
                  const generateSuggestions = (word) => {
                    if (!word || word.length < 2) return [];
                    return [word.slice(0, -1), word.slice(0, -2)].filter(Boolean);
                  };
  
                  const suggestions = generateSuggestions(masterSearch);
  
                  return suggestions.slice(0, 2).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setMasterSearch(suggestion)}
                      className="flex items-center justify-center p-2 bg-[#FEF7F0] rounded-xl border border-[#E7760E] text-[#E7760E]"
                      type="button"
                    >
                      {suggestion}*
                    </button>
                  ));
                })()}
              </div>
            </div>
  
            <div className="flex gap-3 items-end justify-end
            ">
              <button
                className={`gap-1 p-2 rounded-xl  border border-[#969696] flex items-center justify-center text-sm ${open ? 'bg-[#5999f4] border border-[#4380EC] text-black bg ':"" }`}
                type="button"
                onClick={handleClick}
              >
                <Image src={Fillter} alt="Filter" />
                Filter
              </button>
              <button
                className="p-3 rounded-full text-[#575757] border border-[#C8C8C8] flex items-center justify-center text-sm"
                type="button"
                onClick={() => navigator.share({
                  title: document.title,
                  url: window.location.href
                })}
              >
                <Image src={Share} alt="Share" />
              </button>
              <button
                className="p-3 rounded-full text-[#575757] border border-[#C8C8C8] flex items-center justify-center text-sm"
                type="button"
              >
                <Image src={Sort} alt="Sort" />
              </button>
            </div>
          </div>
  
          <div className="flex flex-row gap-6  ">
            <div className="flex-1">
              {loading ? (
                <div className="w-full mx-auto bg-white p-4 rounded-lg scale-95 flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  <span className="ml-3 text-gray-600">Loading data...</span>
                </div>
              ) : error ? (
                <div className="w-full mx-auto bg-white p-4 rounded-lg scale-95 flex flex-col justify-center items-center h-64 text-red-500">
                  <FaExclamationTriangle className="text-3xl mb-3" />
                  <p className="text-lg font-medium">Error loading data</p>
                  <p className="text-sm text-gray-600 mt-1">{error.message || "Please try again later"}</p>
                </div>
              ) : (
                <>
  
                  {currentView === "list" && (
                    <div className="w-full mx-auto bg-white p-4 rounded-lg scale-95   max-w-4xl gap-8 ">
                      <div className="hidden xl:grid grid-cols-5 text-[#313131] font-bold border-b pb-2 border-b-[#E7E6E6]  ">
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
                          <div key={index} className="grid grid-cols-1  border border-gray-200  rounded-xl xl:border-none   sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5  py-4 items-center hover:bg-gray-100 pl-2 hover:rounded-2xl p-4">
                            <div className="w-40 h-28 bg-white flex items-center justify-center rounded-lg lg:shadow-[0px_4.34px_108.57px_0px_#98989840] lg:shadow-[0px_3.94px_10px_0px_#E8E8E840]">
                              <Image className=" w-auto h-auto " src={ImageUnavailable} alt="ImageUnavailable" />
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
                        ))} </div>
                    </div>
                  )}
  
  
  
  
  
  
  
                  {currentView === "grid" && (
                    <div className="grid lg:grid-cols-2 gap-4 px-6 w-full mx-auto scale-95 grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4">
                      {formattedData
                        .filter(item => (selectedStatus === "All" || !selectedStatus || item.status === selectedStatus) &&
                          (selectedCompanies.length === 0 || selectedCompanies.includes(item.owner)))
                        .map((item, index) => (
                          <div key={index} className="w-full border rounded-lg shadow-md p-4 bg-white border-[#E7E6E6] hover:shadow-lg transition-shadow">
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
                        ))}
                    </div>
                  )}
                </>
              )}
            </div>
  
  
  
            <div className={`w-72 space-y-6 ${open ? "absolute z-10 top-[360px] right-0 bg-white p-4 shadow-lg sm:shadow-none" : "hidden"} sm:block sm:relative sm:top-0 sm:left-0 sm:bg-transparent sm:p-0`}>
              <div className="w-full p-4 gap-5 bg-white rounded-lg shadow-[0px_4.34px_108.57px_0px_#98989840] shadow-[0px_3.94px_10px_0px_#E8E8E840] flex flex-col">
                <div>
                  <p className="text-black font-bold">Status</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedStatus("")}
                    className={`h-8 px-3 rounded-xl flex items-center gap-1 justify-center text-sm ${selectedStatus === "" ? "border text-[#4380EC] border-[#4380EC] bg-[#EEF4FF]" : "border border-[#D1D1D1] text-black"
                      }`}
                    type="button"
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedStatus("registered")}
                    className={`h-8 px-3 rounded-xl flex items-center gap-1 justify-center text-sm ${selectedStatus === "registered" ? "border text-[#4380EC] border-[#4380EC] bg-[#EEF4FF]" : "border border-[#D1D1D1] text-black"
                      }`}
                    type="button"
                  >
                    <span className="w-2.5 h-2.5 bg-[#52B649] rounded-full"></span>
                    Registered
                  </button>
                  <button
                    onClick={() => setSelectedStatus("pending")}
                    className={`h-8 px-3 rounded-xl flex items-center gap-1 justify-center text-sm ${selectedStatus === "pending" ? "border text-[#4380EC] border-[#4380EC] bg-[#EEF4FF]" : "border border-[#D1D1D1] text-black"
                      }`}
                    type="button"
                  >
                    <span className="w-2.5 h-2.5 bg-[#ECC53C] rounded-full"></span>
                    Pending
                  </button>
                  <button
                    onClick={() => setSelectedStatus("abandoned")}
                    className={`h-8 px-3 rounded-xl flex items-center gap-1 justify-center text-sm ${selectedStatus === "abandoned" ? "border text-[#4380EC] border-[#4380EC] bg-[#EEF4FF]" : "border border-[#D1D1D1] text-black"
                      }`}
                    type="button"
                  >
                    <span className="w-2.5 h-2.5 bg-[#EC3C3C] rounded-full"></span>
                    Abandoned
                  </button>
                  <button
                    onClick={() => setSelectedStatus("others")}
                    className={`h-8 px-3 rounded-xl flex items-center gap-1 justify-center text-sm ${selectedStatus === "others" ? "border text-[#4380EC] border-[#4380EC] bg-[#EEF4FF]" : "border border-[#D1D1D1] text-black"
                      }`}
                    type="button"
                  >
                    <span className="w-2.5 h-2.5 bg-[#4380EC] rounded-full"></span>
                    Others
                  </button>
                </div>
              </div>
  
              <div className="w-full p-4 gap-5 bg-white rounded-lg shadow-[0px_4.34px_108.57px_0px_#98989840] shadow-[0px_3.94px_10px_0px_#E8E8E840] flex flex-col">
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
              </div>
  
              <div className="w-full p-4 gap-5 bg-white rounded-lg shadow-[0px_4.34px_108.57px_0px_#98989840] shadow-[0px_3.94px_10px_0px_#E8E8E840] flex flex-col">
                <div className="p-4 bg-white rounded-2xl w-full">
                  <h2 className="font-semibold mb-3">Display</h2>
                  <div className="relative flex bg-gray-100 rounded-lg p-1 w-full">
                    <button
                      className={`w-1/2 py-2 text-center font-medium transition-all duration-300 rounded-lg text-sm ${currentView === "grid" ? "bg-white shadow-md text-black" : "text-gray-500"
                        }`}
                      onClick={() => setCurrentView("grid")}
                    >
                      Grid View
                    </button>
                    <button
                      className={`w-1/2 py-2 text-center font-medium transition-all duration-300 rounded-lg text-sm ${currentView === "list" ? "bg-white shadow-md text-black" : "text-gray-500"
                        }`}
                      onClick={() => setCurrentView("list")}
                    >
                      List View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }