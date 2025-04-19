// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';

 const suggestions = [
    {
      name: "InnovateX",
      category: "AI & ML",
      contact: "+91 98765 43210",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Juspay",
      category: "Fintech",
      contact: "+91 91234 56789",
      image: "https://juspay.io/juspaylogo.svg",
    },
    {
      name: "GreenEnergy Co.",
      category: "Clean Tech",
      contact: "+91 90000 12345",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    },
  ]

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 font-mono">
      <header className="bg-black text-white flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold">GrowBridge</h1>
        <img
          src="https://randomuser.me/api/portraits/men/11.jpg"
          alt="Profile"
          className="rounded-full w-10 h-10"
        />
      </header>

      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Suggestions</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((s, idx) => (
            <div
              key={idx}
              onClick={() => router.push(`/profile/${encodeURIComponent(s.name)}`)}
              className="cursor-pointer bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-200"
            >
              <img src={s.image} alt={s.name} className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold">{s.name}</h3>
                <p className="text-gray-600 mt-1">Category: {s.category}</p>
                <p className="text-gray-600 mt-1">Contact: {s.contact}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
