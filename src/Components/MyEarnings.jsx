import React, { useState, useEffect } from "react";

const MyEarnings = () => {
  const [earnings, setEarnings] = useState({});
  const [activeTab, setActiveTab] = useState("Referral"); // Default tab
  const [expanded, setExpanded] = useState({}); // Manage expand/collapse state

  // Fetch data from JSON
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setEarnings(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Handle tab switching
  const renderTransactions = () => {
    let transactions = [];
    if (activeTab === "Self") {
      transactions = earnings.selfTransactions;
    } else if (activeTab === "Referral") {
      transactions = earnings.referrals;
    } else if (activeTab === "Reward") {
      transactions = earnings.rewardTransactions;
    }

    return transactions?.map((transaction) => (
      <div key={transaction.id} className="bg-white mt-4 p-4 rounded-md shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
             {transaction.username?.charAt(0).toUpperCase() || "N"}
            </div>
            <div>
              <p className="text-sm font-semibold">
                {transaction.username || "N/A"}
              </p>
              <p className="text-xs text-gray-500">{transaction.timeAgo || "N/A"}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-green-500">{transaction.amount}</p>
            <p className="text-xs text-gray-500">{transaction.earnType}</p>
            <p className="text-xs text-gray-500">{transaction.date}</p>
          </div>
          <button className="ml-4" onClick={() => toggleExpand(transaction.id)}>
            {expanded[transaction.id] ? "▲" : "▼"}
          </button>
        </div>

        {expanded[transaction.id] && (
          <div className="border-t mt-4 pt-2">
            <p className="text-center text-lg font-bold text-green-500">
              {transaction.amount}
            </p>
            <p className="text-center text-xs text-gray-500">{transaction.earnType}</p>

            <table className="w-full mt-4 text-sm text-gray-600">
              <tbody>
                {transaction.username && (
                  <tr className="border-b">
                    <td className="py-2">Full Name</td>
                    <td className="py-2 text-right">{transaction.fullName}</td>
                  </tr>
                )}
                <tr className="border-b">
                  <td className="py-2">Details</td>
                  <td className="py-2 text-right">{transaction.details}</td>
                </tr>
                <tr>
                  <td className="py-2">Amount</td>
                  <td className="py-2 text-right font-bold">{transaction.amount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    ));
  };

  const toggleExpand = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      {/* Earnings Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
        <div className="text-center">
          <p className="text-sm font-semibold">Earnings Statistics</p>
          <p className="text-lg font-bold text-green-500">{earnings.totalEarnings}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-xs text-gray-500">Self Earnings</p>
            <p className="font-bold text-sm">{earnings.selfEarnings}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Referral Earnings</p>
            <p className="font-bold text-sm">{earnings.referralEarnings}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Reward Earnings</p>
            <p className="font-bold text-sm">{earnings.rewardEarnings}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-between bg-white p-2 mt-4 rounded-md shadow-sm">
        <button
          className={`flex-1 py-2 font-bold text-center ${
            activeTab === "Self"
              ? "text-orange-400 border-b-4 border-orange-400"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("Self")}
        >
          Self
        </button>
        <button
          className={`flex-1 py-2 font-bold text-center ${
            activeTab === "Referral"
              ? "text-orange-400 border-b-4 border-orange-400"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("Referral")}
        >
          Referral
        </button>
        <button
          className={`flex-1 py-2 font-bold text-center ${
            activeTab === "Reward"
              ? "text-orange-400 border-b-4 border-orange-400"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("Reward")}
        >
          Reward
        </button>
      </div>

      {/* Transactions */}
      {renderTransactions()}
    </div>
  );
};

export default MyEarnings;
