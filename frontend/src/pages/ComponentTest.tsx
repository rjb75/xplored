import React from "react";
import { Accommodation } from "../components/Accommodation";
import { Auth } from "../components/Auth";
import { Dining } from "../components/Dining";
import { PhotoGallery } from "../components/PhotoGallery";
import { POI } from "../components/POI";
import { Ratings } from "../components/Ratings";
import { Recommendations } from "../components/Recommendations";
import { Transportation } from "../components/Transportation";
import { TravelPlanner } from "../components/TravelPlanner";

function ComponentTest() {
    return (
        <div>
            <Accommodation />
            <Auth />
            <Dining />
            <PhotoGallery />
            <POI />
            <Ratings />
            <Recommendations />
            <Transportation />
            <TravelPlanner />
        </div>
    );
}

export default ComponentTest;
