// import { useState } from "react"
// import UrlTable from "./UrlTable"
// import CreateUrlModal from "./CreateUrlModel"
// import { Search, Plus } from "lucide-react"

// const Dashboard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [sortBy, setSortBy] = useState("dateCreated")
//   const [urls, setUrls] = useState([
//     {
//       id: 1,
//       shortUrl: "sho.rt/abc123",
//       originalUrl: "https://longurl.com/example",
//       clicks: 10,
//       dateCreated: "03/01/2025",
//       expiration: "03/08/2025",
//     },
//   ])
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)

//   const handleCreateUrl = (newUrl) => {
//     setUrls([
//       ...urls,
//       {
//         id: urls.length + 1,
//         ...newUrl,
//         clicks: 0,
//         dateCreated: new Date().toLocaleDateString(),
//       },
//     ])
//     setIsModalOpen(false)
//   }

//   const handleSort = (field) => {
//     setSortBy(field)
//   }

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value)
//   }

//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">URL Shortener</h1>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
//           >
//             <Plus size={16} />
//             <span>New URL</span>
//           </button>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-6">
//           <div className="relative mb-4">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search size={18} className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search by name"
//               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
//               value={searchQuery}
//               onChange={handleSearch}
//             />
//           </div>

//           <div className="mb-4">
//             <button
//               className="w-full md:w-auto text-left px-4 py-2 border border-gray-300 rounded-md flex items-center justify-between"
//               onClick={() => handleSort("dateCreated")}
//             >
//               <span>Date Created</span>
//               <span className="ml-2">▼</span>
//             </button>
//           </div>

//           <UrlTable urls={urls} currentPage={currentPage} />

//           <div className="flex justify-between items-center mt-4">
//             <div className="text-sm text-gray-600">
//               Showing {urls.length > 0 ? 1 : 0} to {urls.length} of {urls.length} results
//             </div>
//             <div className="flex gap-2">
//               <button
//                 className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
//                 disabled={currentPage === 1}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               >
//                 Previous
//               </button>
//               <button className="px-3 py-1 bg-gray-900 text-white rounded-md">{currentPage}</button>
//               <button
//                 className="px-3 py-1 border border-gray-300 rounded-md"
//                 onClick={() => handlePageChange(currentPage + 1)}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {isModalOpen && <CreateUrlModal onClose={() => setIsModalOpen(false)} onSubmit={handleCreateUrl} />}
//     </div>
//   )
// }

// export default Dashboard

import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import UrlTable from "./UrlTable";
import CreateUrlModal from "./CreateUrlModel";
import { useUrlStore } from "../store";

export default function Dashboard() {
  const { urls, load } = useUrlStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* fetch once */
  useEffect(() => { load(); }, [load]);

  const filtered = urls.filter((u) =>
    u.originalUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">URL Shortener</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus size={16} />
            <span>New URL</span>
          </button>
        </div>

        {/* card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* search */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by URL"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* table */}
          <UrlTable urls={filtered} />

          {/* footer (simple count) */}
          <div className="text-sm text-gray-600 mt-4">
            Showing {filtered.length} of {urls.length} results
          </div>
        </div>
      </div>

      {isModalOpen && <CreateUrlModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
