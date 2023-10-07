import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "./eventCard";

const EventCardHolder = () => {
  const loggedIn = localStorage.getItem('token');
  const [eventData, setEventData] = useState({
    date: "",
    time: "",
    title: "",
    description: "",
    club: "",
    venue: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error(error.response.data);
      setErrorMessage("Failed to fetch events");
    }
  };

  const handleInputChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/events",
        eventData
      );
      console.log(response.data); // Optionally, log the response data
      // Clear the form after successful submission
      setEventData({
        date: "",
        time: "",
        title: "",
        description: "",
        club: "",
        venue: "",
      });
      fetchEvents(); // Update the event list after adding a new event
    } catch (error) {
      console.error(error.response.data);
      setErrorMessage("Failed to add event");
    }
  };

  return (
    <div className="">
      <div
        className="bg-[#061836]  h-full pb-96 "
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1519705129143-43afdfe43ac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1937&q=80")',
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <EventCard events={events} />
      </div>

      {/* <h2>Add Event</h2> */}
      {errorMessage && <div className="error">{errorMessage}</div>}
      { loggedIn ? (
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 pb-1 bg-[#1E293B] text-slate-100">
          <div>
            <label className="">Date:</label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleInputChange}
              className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="">Time:</label>
            <input
              type="time"
              name="time"
              value={eventData.time}
              onChange={handleInputChange}
              className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="">Title:</label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
              className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="">Description:</label>
            <input
              type="text"
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
              className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="">Club:</label>
            <input
              type="text"
              name="club"
              value={eventData.club}
              onChange={handleInputChange}
              className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="">Venue:</label>
            <input
              type="text"
              name="venue"
              value={eventData.venue}
              onChange={handleInputChange}
              className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className=" bg-rose-800 text-white  px-4 rounded-md hover:bg-rose-600"
          >
            Add Event
          </button>
        </div>
      </form>
      ) : (<div></div>)}
    </div>
  );
};

export default EventCardHolder;
