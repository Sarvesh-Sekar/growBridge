"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { removeCookies } from "../helpers/cookieHelper";
import suggestionsData from "./suggestionData"; // Import the new data

export default function Home() {
  const router = useRouter();

  const [showLogout, setShowLogout] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Filter State
  const [filters, setFilters] = useState({
    category: "",
    marketCap: "",
    returnRate: "",
    location: "",
  });

  const [checkedFields, setCheckedFields] = useState({
    category: false,
    marketCap: false,
    returnRate: false,
    location: false,
  });

  // Filter suggestions based on selected criteria if checkbox is ticked
  const filteredSuggestions = suggestionsData.filter((sugg) => {
    if (
      checkedFields.category &&
      filters.category &&
      sugg.category !== filters.category
    ) {
      return false;
    }
    if (
      checkedFields.marketCap &&
      filters.marketCap &&
      sugg.marketCap < parseFloat(filters.marketCap)
    ) {
      return false;
    }
    if (
      checkedFields.returnRate &&
      filters.returnRate &&
      sugg.returnRate < parseFloat(filters.returnRate)
    ) {
      return false;
    }
    if (
      checkedFields.location &&
      filters.location &&
      !sugg.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleLogout = () => {
    removeCookies("token");
    removeCookies("userId");
    removeCookies("role");
    console.log("User logged out");
    router.push("/login");
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field) => {
    setCheckedFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-mono relative">
      {/* Header */}
      <header className="bg-gradient-to-r from-black to-gray-800 text-white flex justify-between items-center px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">GrowBridge</h1>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowSidebar(true)}
            className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Filters
          </button>

          <div className="relative">
            <img
              src="https://randomuser.me/api/portraits/men/11.jpg"
              alt="Profile"
              className="rounded-full w-10 h-10 cursor-pointer"
              onClick={() => setShowLogout(!showLogout)}
            />
            {showLogout && (
              <div className="absolute top-12 right-0 bg-white text-gray-700 shadow-lg rounded-lg p-4 mt-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar for Filters */}
      {showSidebar && (
        <div className="fixed inset-0 flex justify-end z-50">
          {/* Background Blur */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setShowSidebar(false)}
          ></div>

          {/* Sidebar */}
          <div className="relative w-80 bg-black text-white p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Filters</h2>

            {/* Category */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-lg">Category</label>
                <input
                  type="checkbox"
                  checked={checkedFields.category}
                  onChange={() => handleCheckboxChange("category")}
                />
              </div>
              <select
                className="w-full bg-gray-800 text-white p-2 rounded-lg"
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="AI & ML">AI & ML</option>
                <option value="Fintech">Fintech</option>
                <option value="Clean Tech">Clean Tech</option>
                <option value="E-commerce">E-commerce</option>
              </select>
            </div>

            {/* MarketCap */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-lg">MarketCap</label>
                <input
                  type="checkbox"
                  checked={checkedFields.marketCap}
                  onChange={() => handleCheckboxChange("marketCap")}
                />
              </div>
              <input
                type="number"
                className="w-full bg-gray-800 text-white p-2 rounded-lg"
                placeholder="Enter Min MarketCap"
                value={filters.marketCap}
                onChange={(e) =>
                  handleFilterChange("marketCap", e.target.value)
                }
              />
            </div>

            {/* ReturnRate */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-lg">ReturnRate</label>
                <input
                  type="checkbox"
                  checked={checkedFields.returnRate}
                  onChange={() => handleCheckboxChange("returnRate")}
                />
              </div>
              <input
                type="number"
                className="w-full bg-gray-800 text-white p-2 rounded-lg"
                placeholder="Enter Min Return Rate"
                value={filters.returnRate}
                onChange={(e) =>
                  handleFilterChange("returnRate", e.target.value)
                }
              />
            </div>

            {/* Location */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-lg">Location</label>
                <input
                  type="checkbox"
                  checked={checkedFields.location}
                  onChange={() => handleCheckboxChange("location")}
                />
              </div>
              <input
                type="text"
                className="w-full bg-gray-800 text-white p-2 rounded-lg"
                placeholder="Enter Location"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
              />
            </div>

            <button
              onClick={() => setShowSidebar(false)}
              className="w-full bg-white text-black font-bold py-2 rounded-lg hover:bg-gray-300"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="p-6">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Suggestions
        </h2>

        {/* Suggestions Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredSuggestions.map((s, idx) => (
            <div
              key={idx}
              onClick={() =>
                router.push(`/profile/${encodeURIComponent(s.name)}`)
              }
              className="cursor-pointer bg-white shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={s.image}
                alt={s.name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800">{s.name}</h3>
                <p className="text-gray-600 mt-2">Category: {s.category}</p>
                <p className="text-gray-600 mt-1">Contact: {s.contact}</p>
                <p className="text-gray-600 mt-1">
                  Market Cap: ${s.marketCap.toLocaleString()}
                </p>
                <p className="text-gray-600 mt-1">
                  Return Rate: {(s.returnRate * 100).toFixed(2)}%
                </p>
                <p className="text-gray-600 mt-1">Location: {s.location}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
