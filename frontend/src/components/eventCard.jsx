import React from "react";

const EventCard = ({ events }) => {
  return (
    <div className="dark:text-slate-100 pt-4">
      <div className="flex flex-wrap gap-8">
        {events.map((event) => (
          <div
            key={event._id}
            className="rounded-xl bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md max-sm:px-8"
          >
            <div className="flex-none p-3 shadow bg-gradient-to-r from-rose-800 to-pink-800  text-indigo-50 uppercase place-items-center rounded-t-lg">
              <h3>{event.title}</h3>
            </div>
            <div className="flex p-4 md:p-6 lg:p-8 gap-4 md:gap-6">
              <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
                <p className="text-slate text-sm">Date: {event.date}</p>
                <p className="text-slate text-sm">Time: {event.time}</p>
                <p className="text-slate text-sm">Club: {event.club}</p>
                <p className="text-slate text-sm">Venue: {event.venue}</p>
                <p>Description: {event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;