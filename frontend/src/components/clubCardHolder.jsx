import React, { useState, useEffect } from "react";
import axios from "axios";
import ClubEvent from "./clubCard";

const ClubsList = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/clubs");
      setClubs(response.data);
    } catch (error) {
      console.error("Failed to fetch clubs:", error);
      // Handle error if necessary
    }
  };

  return (
    <div className="bg-[#061836] h-full pb-96 gap-4 flex "
    style={{backgroundImage: 'url("https://images.unsplash.com/photo-1519705129143-43afdfe43ac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1937&q=80")', backgroundSize: 'cover', overflow: 'hidden'}}>
      {clubs.map((club) => (
        <ClubEvent club={club} key={club._id} />
      ))}
    </div>
  );
};

export default ClubsList;
