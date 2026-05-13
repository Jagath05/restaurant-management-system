// Home.jsx

import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import About from "./About";
import Feedback from "./Feedback";
import PopularFoods
from "../components/PopularFoods";
import TrendingFoods
from "../components/TrendingFoods";
import SpecialOffers
from "../components/SpecialOffers";
import Footer from "../components/Footer";

export default function Home() {

    return (
        <>
            <Navbar />
            <Hero />
            <PopularFoods />
            <TrendingFoods />
            <Categories />
            <SpecialOffers />
            <About/>
            <Feedback/>
            <Footer />
        </>
    )
}