// "use client"

// import { useState } from "react"
// import { X } from "lucide-react"

// const CreateUrlModal = ({ onClose, onSubmit }) => {
//   const [longUrl, setLongUrl] = useState("")
//   const [customAlias, setCustomAlias] = useState("")
//   const [expiration, setExpiration] = useState("1 day")
//   const [isInvalidUrl, setIsInvalidUrl] = useState(false)

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     // Basic URL validation
//     if (!longUrl.startsWith("http")) {
//       setIsInvalidUrl(true)
//       return
//     }

//     const shortCode = customAlias || Math.random().toString(36).substring(2, 8)

//     onSubmit({
//       shortUrl: `sho.rt/${shortCode}`,
//       originalUrl: longUrl,
//       expiration: getExpirationDate(expiration),
//     })
//   }

//   const getExpirationDate = (expirationOption) => {
//     const date = new Date()

//     switch (expirationOption) {
//       case "1 day":
//         date.setDate(date.getDate() + 1)
//         break
//       case "7 days":
//         date.setDate(date.getDate() + 7)
//         break
//       case "30 days":
//         date.setDate(date.getDate() + 30)
//         break
//       case "1 year":
//         date.setFullYear(date.getFullYear() + 1)
//         break
//       default:
//         date.setDate(date.getDate() + 7)
//     }

//     return date.toLocaleDateString()
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-lg font-medium">Shorten a URL</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <X size={20} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-4 space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">URL</label>
//             <input
//               type="text"
//               placeholder="Enter your long URL"
//               className={`w-full p-2 border ${isInvalidUrl ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200`}
//               value={longUrl}
//               onChange={(e) => {
//                 setLongUrl(e.target.value)
//                 setIsInvalidUrl(false)
//               }}
//               required
//             />
//             {isInvalidUrl && <p className="text-red-500 text-sm mt-1">Invalid URL</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Custom Alias (optional)</label>
//             <input
//               type="text"
//               placeholder="Enter custom alias"
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
//               value={customAlias}
//               onChange={(e) => setCustomAlias(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Expiration</label>
//             <select
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
//               value={expiration}
//               onChange={(e) => setExpiration(e.target.value)}
//             >
//               <option value="1 day">1 day</option>
//               <option value="7 days">7 days</option>
//               <option value="30 days">30 days</option>
//               <option value="1 year">1 year</option>
//             </select>
//           </div>

//           <div className="flex justify-end gap-2 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
//               Shorten URL
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default CreateUrlModal

"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useUrlStore } from "../store";

export default function CreateUrlModal({ onClose }) {
  const create = useUrlStore((s) => s.create);

  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expiration, setExpiration] = useState("1 day");
  const [isInvalidUrl, setIsInvalidUrl] = useState(false);
  const [error, setError] = useState("");

  const expiresMap = { "1 day": 1, "7 days": 7, "30 days": 30, "1 year": 365 };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!longUrl.startsWith("http")) {
      setIsInvalidUrl(true);
      return;
    }
    try {
      await create({
        originalUrl: longUrl.trim(),
        customAlias: customAlias.trim() || undefined,
        expiresInDays: expiresMap[expiration],
      });
      onClose();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Shorten a URL</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* URL */}
          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="text"
              placeholder="Enter your long URL"
              className={`w-full p-2 border ${
                isInvalidUrl ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200`}
              value={longUrl}
              onChange={(e) => {
                setLongUrl(e.target.value);
                setIsInvalidUrl(false);
                setError("");
              }}
              required
            />
            {isInvalidUrl && <p className="text-red-500 text-sm mt-1">Invalid URL</p>}
          </div>

          {/* alias + expiration (unchanged) */}
          <div>
            <label className="block text-sm font-medium mb-1">Custom Alias (optional)</label>
            <input
              type="text"
              placeholder="Enter custom alias"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Expiration</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
            >
              <option value="1 day">1 day</option>
              <option value="7 days">7 days</option>
              <option value="30 days">30 days</option>
              <option value="1 year">1 year</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
              Shorten URL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
