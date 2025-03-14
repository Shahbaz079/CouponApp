"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string>("");

  const claimCoupon = async () => {
    setMessage("Processing...");

    try {
      const response = await fetch("/api/claim", { method: "POST" });
      const data = await response.json();

      if (data.success) {
        setMessage(`🎉 Coupon Claimed: ${data.coupon}`);
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      setMessage("⚠️ An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-sm w-full text-center transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-extrabold text-gray-800">🎟️ Claim Your Coupon</h1>
        <p className="text-gray-600 mt-2">Click below to get a special discount!</p>

        <button
          onClick={claimCoupon}
          className="mt-5 w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
        >
          Claim Now 🚀
        </button>

        {message && (
          <p className="mt-4 text-lg font-medium text-gray-700 bg-gray-100 p-3 rounded-lg border">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
