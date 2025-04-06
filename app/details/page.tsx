"use client";
import { useState } from "react";
import {useRouter} from 'next/navigation';
export default function Details() {
  const [isStartUp, setIsStartUp] = useState<boolean>(true);
  const router = useRouter();
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

          <div className="w-full">
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full border-2 border-black p-2 rounded-lg"
            />
          </div>

          <div className="w-full">
            <label className="block mb-2 font-medium">Register as</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  id="startup"
                  name="register"
                  value="startup"
                  onClick={() => setIsStartUp(true)}
                />
                Startup
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  id="investor"
                  name="register"
                  value="investor"
                  onClick={() => setIsStartUp(false)}
                />
                Investor
              </label>
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="startups" className="block mb-1 font-medium">
              Category
            </label>
            <select
              name="categories"
              id="startups"
              className="w-full border-2 border-black p-2 rounded-lg"
            >
              <option value="fintech">Fintech</option>
              <option value="Fast Commerce">Fast Commerce</option>
              <option value="AI">Artificial Intelligence</option>
              <option value="Quantum Computing">Quantum Computing</option>
            </select>
          </div>

          <div className="w-full">
            <label className="block mb-1 font-medium">
              {isStartUp ? "Startup Name" : "Investor Organisation"}
            </label>
            <input
              type="text"
              placeholder={isStartUp ? "Startup Name" : "Investor Organisation"}
              className="w-full border-2 border-black p-2 rounded-lg"
            />
          </div>

          <div className="w-full">
            <label className="block mb-1 font-medium">Net Worth (in Cr)</label>
            <input
              type="number"
              placeholder="Enter net worth"
              className="w-full border-2 border-black p-2 rounded-lg"
            />
          </div>

          <div className="w-full">
            <label className="block mb-1 font-medium">
              {isStartUp ? "Startup Description" : "Investor thoughts"}
            </label>
            <input
              type="text"
              placeholder="Brief description"
              className="w-full border-2 border-black p-2 rounded-lg"
            />
          </div>

          {isStartUp && (
            <div className="w-full">
              <label
                htmlFor="business_details"
                className="block mb-1 font-medium"
              >
                Business Model
              </label>
              <select
                name="business_details"
                id="business_details"
                className="w-full border-2 border-black p-2 rounded-lg"
              >
                <option value="B2B">B2B (Business to Business)</option>
                <option value="B2C">B2C (Business to Consumer)</option>
                <option value="DTC">DTC (Direct to Consumer)</option>
                <option value="subscription">Subscription</option>
              </select>
            </div>
          )}

          <div className=" w-full flex justify-center ">
            <button className="px-4 py-2 bg-black text-white rounded-lg mt-4" onClick = {() => router.push("/home")}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
