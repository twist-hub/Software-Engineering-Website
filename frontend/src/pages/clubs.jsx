import React from "react";
// import axios from 'axios';
import Navbar from "../components/navbar";
import ClubsList from "../components/clubCardHolder";

const ClubPage = (props) => {
    return (
        <div>
            <Navbar />
            {/* <ClubElement club={club} isClubHead={true}/> */}
            <ClubsList />
            {/* <Footer /> */}
        </div>
    )
}


export default ClubPage;