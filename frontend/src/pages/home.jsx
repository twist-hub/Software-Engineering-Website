import React from "react";
import Navbar from "../components/navbar";
// import Footer from "../components/footer"
// import AddEventForm from "../components/eventCardHolder";
import EventCardHolder from "../components/eventCardHolder";

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <EventCardHolder />
        </div>
    )
}


export default HomePage