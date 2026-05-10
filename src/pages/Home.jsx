// Home.jsx

import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import About from "./About";
import Feedback from "./Feedback";

export default function Home() {

    return (
        <>
            <Navbar />
            <Hero />
            <Categories />
            <About/>
            <Feedback/>
        </>
    )
}