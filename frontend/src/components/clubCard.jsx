import React, { useState } from "react";
import axios from "axios";

const ClubEvent = ({ club }) => {
  const [subtractAmount, setSubtractAmount] = useState("");

  const handleSubtract = async () => {
    const amount = parseInt(subtractAmount);
    if (amount > 0 && amount <= club.budget) {
      try {
        const updatedBudget = club.budget - amount;
        console.log(club.id);
        const response = await axios.put(
          `http://localhost:5000/api/clubs/updateBudget/${club.id}`, // Update the URL to use club._id
          { budget: updatedBudget }
        );
        console.log(response.data.message);
        setSubtractAmount(""); // Clear the subtract amount input field
        club.budget = updatedBudget; // Update the budget in the current component state
      } catch (error) {
        console.error("Failed to update budget:", error);
        // Handle error if necessary
      }
    } else {
      console.error("Invalid subtract amount");
      // Handle error if necessary (e.g., show an error message to the user)
    }
  };

  return (
    <>
      <div className="text-slate-100 pt-4">
        <div className="flex flex-wrap gap-4">
          <div
            key={club._id}
            className="rounded-xl bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md max-sm:px-8"
          >
            <div className="flex-none p-3 shadow bg-gradient-to-r from-rose-800 to-pink-800  text-indigo-50 uppercase place-items-center rounded-t-lg">
              <h3>{club.name}</h3>
            </div>
            <div className="flex p-4 md:p-6 lg:p-8 gap-4 md:gap-6">
              <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
                <p className="text-slate text-sm">Head: {club.head}</p>
                <p className="text-slate text-sm">
                  Contact Number: {club.contactNumber}
                </p>
                <p className="text-slate text-sm">
                  Email Address: {club.emailAddress}
                </p>
                <p className="text-slate text-sm">
                  Description: {club.description}
                </p>
                <p>Budget: {club.budget}</p>
                <div className="flex items-center mt-2  ">
                  <label htmlFor="subtractAmount" className="mr-2">
                    Subtract Amount:
                  </label>
                  <input
                    type="number"
                    id="subtractAmount"
                    value={subtractAmount}
                    onChange={(e) => setSubtractAmount(e.target.value)}
                    className="w-24 h-8 px-2 rounded text-slate-900"
                  />
                  <button
                    onClick={handleSubtract}
                    className="ml-2 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded"
                  >
                    Subtract
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubEvent;
