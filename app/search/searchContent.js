"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { Poppins } from 'next/font/google';
import { useState, useEffect } from "react";
import { FaSyncAlt, FaExclamationTriangle } from "react-icons/fa";
import SearchHeader from '../../components/searchComponents/SearchHeader';
import SearchResultsInfo from '../../components/searchComponents/SearchResultsInfo';
import ActionButtons from '../../components/searchComponents/ActionButtons';
import FiltersSidebar from '../../components/searchComponents/FiltersSidebar';
import TrademarkList from '../../components/searchComponents/TrademarkList';
import TrademarkGrid from '../../components/searchComponents/TrademarkGrid';

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
    setOpen(prevState => !prevState);
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
    <main className={`${poppins.className} bg-white text-black`}>
      <SearchHeader masterSearch={masterSearch} setMasterSearch={setMasterSearch} />
      <div className="bg-[#EAF1FF] h-1.5"></div>

      <div className="px-10">
        <SearchResultsInfo 
          masterSearch={masterSearch} 
          formattedData={formattedData} 
          setMasterSearch={setMasterSearch} 
        />

        <div >
          <ActionButtons open={open} handleClick={handleClick} setMasterSearch={setMasterSearch} masterSearch={masterSearch}  />
        </div>

        <div className="flex flex-row gap-6">
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
                  <TrademarkList 
                    formattedData={formattedData} 
                    selectedStatus={selectedStatus} 
                    selectedCompanies={selectedCompanies} 
                  />
                )}
                {currentView === "grid" && (
                  <TrademarkGrid 
                    formattedData={formattedData} 
                    selectedStatus={selectedStatus} 
                    selectedCompanies={selectedCompanies} 
                  />
                )}
              </>
            )}
          </div>

          <FiltersSidebar 
            open={open}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            formattedData={formattedData}
            filterSearch={filterSearch}
            setFilterSearch={setFilterSearch}
            selectedCompanies={selectedCompanies}
            toggleSelection={toggleSelection}
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        </div>
      </div>
    </main>
  );
}