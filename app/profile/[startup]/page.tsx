"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  params: {
    startup: string;
  };
};

export default function StartupProfile({ params }: Props) {
  const { startup } = params;

  const startupDetails = {
    name: decodeURIComponent(startup),
    category: "Fintech",
    coverImage:
      "https://images.ctfassets.net/wowgx05xsdrr/5JkM0OGlSSXLZ1MNk9qpkk/78e6f9685c56e2940f5db50868f015fc/4908CD_PaymentGateways-August2022-Header.jpg?fm=webp&w=3840&q=75",
    profileImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1VYXcXkVPwCiq64tvWO9QUMjMxLUw7ovamKmmFd4H9w&s&ec=72940545",
    burnRate: "$25,000 / month",
    runway: "6 months",
    revenue: "$180,000",
  };

  const performanceData = [
    { month: "Jan", revenue: 15000, users: 1000, market: 50 },
    { month: "Feb", revenue: 18000, users: 1300, market: 60 },
    { month: "Mar", revenue: 22000, users: 1600, market: 70 },
    { month: "Apr", revenue: 25000, users: 1900, market: 68 },
    { month: "May", revenue: 28000, users: 2100, market: 75 },
    { month: "Jun", revenue: 30000, users: 2500, market: 80 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-mono">
      {/* Cover Image */}
      <div className="relative">
        <img
          src={startupDetails.coverImage}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-[-40px] left-6">
          <img
            src={startupDetails.profileImage}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Header Info */}
      <div className="pt-16 px-6 pb-4 bg-white shadow-sm">
        <h1 className="text-3xl font-bold">{startupDetails.name}</h1>
        <p className="text-gray-600 text-sm mt-1">{startupDetails.category}</p>
      </div>

      {/* Dashboard Section */}
      <main className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Startup Performance Dashboard
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Burn Rate */}
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-lg font-semibold mb-2">Burn Rate</h3>
            <p className="text-2xl text-red-500">{startupDetails.burnRate}</p>
          </div>

          {/* Runway */}
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-lg font-semibold mb-2">Runway</h3>
            <p className="text-2xl text-yellow-500">{startupDetails.runway}</p>
          </div>

          {/* Revenue */}
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
            <p className="text-2xl text-green-600">{startupDetails.revenue}</p>
          </div>
        </div>

        {/* Line Charts Row */}
        <div className="mt-10 flex flex-col lg:flex-row gap-6">
          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md flex-1">
            <h2 className="text-lg font-semibold mb-4">
              Monthly Revenue Growth
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4f46e5"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Users Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md flex-1">
            <h2 className="text-lg font-semibold mb-4">User Growth</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#10b981"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Share Market Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md flex-1">
            <h2 className="text-lg font-semibold mb-4">Share Market Growth</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="market"
                  stroke="#f59e0b"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
