"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCookies, setCookies } from "../helpers/cookieHelper";
import axios from "axios";
import { toast } from "react-toastify";

export default function Details() {
  const role = getCookies("role");
  const userId = getCookies("userId");

  const [startupDetails, setStartupDetails] = useState({
    username: "",
    type: "",
    startupName: "",
    marketCap: "",
    burnRate: "",
    returnRate: "",
    contactNo: "",
    location: "",
    startupCategory: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const [investorDetails, setInvestorDetails] = useState({
    username: "",
    type: "",
    interests: "",
    location: "",
    contactNo: "",
  });

  const router = useRouter();

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setStartupDetails({
      ...startupDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleInvestorChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInvestorDetails({
      ...investorDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleInvestorSubmit = async () => {
    const payload = {
      investorName: investorDetails.username,
      contactNo: investorDetails.contactNo,
      investorType: investorDetails.type,
      interests: tags,
      userId: userId,
      location: investorDetails.location,
    };
    try {
      await axios.post("http://localhost:4000/api/postInvestor", payload, {
        headers: {
          Authorization: `Bearer ${getCookies("token")}`,
        },
      });
      setCookies("details", "true");
      toast.success("Details submitted successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      // Wait for 2 seconds so user can see toast before routing
      setTimeout(() => {
        router.push("/home");
      }, 4000);
    } catch (e) {
      toast.error("Details submission failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === " ") && inputValue.trim() !== "") {
      e.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const payload = {
      username: startupDetails.username,
      contactNo: startupDetails.contactNo,
      type: startupDetails.type,
      startupName: startupDetails.startupName,
      marketCap: startupDetails.marketCap,
      burnRate: startupDetails.burnRate,
      returnRate: startupDetails.returnRate,
      location: startupDetails.location,
      category: startupDetails.startupCategory,
    };

    try {
      await axios.post("http://localhost:4000/api/postStartup", payload, {
        headers: {
          Authorization: `Bearer ${getCookies("token")}`,
        },
      });

      setCookies("startupDetails", "true");

      toast.success("Details submitted successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      // Wait for 2 seconds so user can see toast before routing
      setTimeout(() => {
        router.push("/home");
      }, 4000);
    } catch (error) {
      toast.error("Details submission failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="p-0 m-0">
      <div className="flex flex-col items-center mx-auto my-10 px-4 sm:px-8 md:px-16">
        <h1 className="font-mono overflow-hidden pr-2 md:pr-5 text-2xl md:text-5xl text-black font-bold text-center mb-8">
          Details
        </h1>

        <div className="flex flex-col gap-4 items-start w-full max-w-2xl border-2 border-black px-6 py-8 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 self-center">
            Enter your Details
          </h2>

          {role === "investor" && (
            <div className="w-full">
              <label className="block mb-1 font-medium">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter Investor Name"
                value={investorDetails.username}
                onChange={handleInvestorChange}
                className="w-full border-2 border-black p-2 rounded-lg"
              />
            </div>
          )}

          {role === "startup" && (
            <div className="w-full">
              <label className="block mb-1 font-medium">
                {role === "startup" ? "Startup Name" : "Investor Organisation"}
              </label>
              <input
                type="text"
                name="startupName"
                placeholder={
                  role === "startup" ? "Startup Name" : "Investor Organisation"
                }
                value={startupDetails.startupName}
                onChange={handleChange}
                className="w-full border-2 border-black p-2 rounded-lg"
              />
            </div>
          )}

          <div className="w-full">
            <label htmlFor="startups" className="block mb-1 font-medium">
              {role === "startup" ? "Type of Startup" : "Type of Investor"}
            </label>
            <select
              name="type"
              id="startups"
              value={
                role === "startup" ? startupDetails.type : investorDetails.type
              }
              className="w-full border-2 border-black p-2 rounded-lg"
              onChange={role === "startup" ? handleChange : handleInvestorChange}
            >
              {role === "startup" ? (
                <>
                  <option value="fintech">Fintech</option>
                  <option value="fast-commerce">Fast Commerce</option>
                  <option value="ai">Artificial Intelligence</option>
                  <option value="quantum-computing">Quantum Computing</option>
                </>
              ) : (
                <>
                  <option value="vc">Venture Capitalist (VC)</option>
                  <option value="angel-investor">Angel Investor</option>
                  <option value="corporate-venture">Corporate Venture</option>
                  <option value="private-equity">Private Equity</option>
                </>
              )}
            </select>
          </div>

          {role === "investor" && (
            <div className="w-full">
              <label className="block mb-1 font-medium">Interests</label>
              <div className="flex flex-wrap gap-2 border-2 border-black p-2 rounded-lg">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-black text-white px-2 py-1 rounded-full"
                  >
                    <span>{tag}</span>
                    <button
                      className="ml-2 text-white"
                      onClick={() => handleRemoveTag(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="flex-grow min-w-[120px] outline-none border-2 border-black p-2 rounded-lg"
                  placeholder="Type and press Space or Enter"
                />
              </div>
            </div>
          )}

          {role === "startup " && (
            <div className="w-full">
              <label className="block mb-1 font-medium">
                Market Cap(in Cr)
              </label>
              <input
                type="number"
                name="marketCap"
                placeholder="Enter net worth"
                value={startupDetails.marketCap}
                onChange={handleChange}
                className="w-full border-2 border-black p-2 rounded-lg"
              />
            </div>
          )}
          {role === "startup" && (
            <div className="w-full">
              <label className="block mb-1 font-medium">Burn Rate(in Cr)</label>
              <input
                type="number"
                name="burnRate"
                placeholder="Enter net worth"
                value={startupDetails.burnRate}
                onChange={handleChange}
                className="w-full border-2 border-black p-2 rounded-lg"
              />
            </div>
          )}

          {role === "startup" && (
            <div className="w-full">
              <label className="block mb-1 font-medium">
                Return Rate(in Cr)
              </label>
              <input
                type="number"
                name="returnRate"
                placeholder="Enter net worth"
                value={startupDetails.returnRate}
                onChange={handleChange}
                className="w-full border-2 border-black p-2 rounded-lg"
              />
            </div>
          )}

          <div className="w-full">
            <label className="block mb-1 font-medium">Contact No.</label>
            <input
              type="number"
              name="contactNo"
              placeholder="Enter Contact No."
              value={
                role === "startup"
                  ? startupDetails.contactNo
                  : investorDetails.contactNo
              }
              onChange={role === "startup" ? handleChange : handleInvestorChange}
              className="w-full border-2 border-black p-2 rounded-lg"
            />
          </div>
          <div className="w-full">
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter Location"
              value={
                role === "startup"
                  ? startupDetails.location
                  : investorDetails.location
              }
              onChange={role === "startup" ? handleChange : handleInvestorChange}
              className="w-full border-2 border-black p-2 rounded-lg"
            />
          </div>

          {role === "startup" && (
            <div className="w-full">
              <label
                htmlFor="business_details"
                className="block mb-1 font-medium"
              >
                Startup Category
              </label>
              <select
                name="startupCategory"
                id="business_details"
                className="w-full border-2 border-black p-2 rounded-lg"
                onChange={handleChange}
              >
                <option value="B2B">👶 Born-Child Startup</option>
                <option value="B2C">🚀 High-Speed Growing</option>
                <option value="DTC">🏢 Grown/Mature Startup</option>
                <option value="subscription">🔁 Pivoting/Struggling</option>
              </select>
            </div>
          )}

          <div className="w-full flex justify-center">
            <button
              className="px-4 py-2 bg-black text-white rounded-lg mt-4"
              onClick={role === "startup" ? handleSubmit : handleInvestorSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
