// MenuLayout.jsx

import React, {
    useEffect,
    useState
} from "react";

import FoodCard
from "../components/FoodCard";

import Cart
from "../components/Cart";

import Navbar
from "../components/Navbar";

import {
    useNavigate
} from "react-router-dom";

export default function MenuLayout({
    meal
}) {

    const navigate =
        useNavigate();

    const [foods, setFoods] =
        useState([]);

    // Fetch Foods
    useEffect(() => {

        fetchFoods();

    }, [meal]);

    const fetchFoods =
        async () => {

        try {

            const response =
                await fetch(
                    `http://localhost/restaurant-api/menu/getCustomerFoods.php?category=${meal}`
                );

            const data =
                await response.json();

            console.log(data);

            setFoods(data);

        } catch (error) {

            console.log(
                "Fetch Error:",
                error
            );
        }
    };

    // Sections
    const starters =
        foods.filter(
            item =>
                item.section ===
                "Starter"
        );

    const mainCourse =
        foods.filter(
            item =>
                item.section ===
                "Main Course"
        );

    const sideDish =
        foods.filter(
            item =>
                item.section ===
                "Side Dish"
        );

    return (

        <>

            <Navbar />

            <section className="min-h-screen bg-[#262235] px-5 md:px-10 py-20">

                {/* Heading */}
                <div className="mb-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

                    <div>

                        <h1 className="text-white text-[45px] md:text-[70px] font-bold">

                            {meal} Menu

                        </h1>

                        <p className="text-gray-400 text-[18px] md:text-[24px] mt-3">

                            Enjoy our delicious{" "}
                            {meal.toLowerCase()} dishes.

                        </p>

                    </div>

                    {/* Back */}
                    <button
                        onClick={() =>
                            navigate("/")
                        }
                        className="bg-white/5 border border-white/10 backdrop-blur-md px-7 py-4 rounded-2xl text-white text-lg hover:bg-violet-600/20 hover:scale-105 duration-300 shadow-2xl"
                    >

                        ← Back Home

                    </button>

                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

                    {/* LEFT SIDE */}
                    <div className="xl:col-span-8">

                        {
                            meal === "Breakfast" ||
                            meal === "Lunch" ||
                            meal === "Dinner"

                                ? (

                                    <>

                                        {/* Starter */}
                                        {
                                            starters.length > 0 && (

                                                <>
                                                    <h2 className="text-white text-[35px] md:text-[45px] font-bold mb-8">

                                                        Starters

                                                    </h2>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

                                                        {
                                                            starters.map(
                                                                item => (

                                                                    <FoodCard
                                                                        key={item.id}
                                                                        item={item}
                                                                    />
                                                                )
                                                            )
                                                        }

                                                    </div>
                                                </>
                                            )
                                        }

                                        {/* Main Course */}
                                        {
                                            mainCourse.length > 0 && (

                                                <>
                                                    <h2 className="text-white text-[35px] md:text-[45px] font-bold mb-8">

                                                        Main Course

                                                    </h2>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

                                                        {
                                                            mainCourse.map(
                                                                item => (

                                                                    <FoodCard
                                                                        key={item.id}
                                                                        item={item}
                                                                    />
                                                                )
                                                            )
                                                        }

                                                    </div>
                                                </>
                                            )
                                        }

                                        {/* Side Dish */}
                                        {
                                            sideDish.length > 0 && (

                                                <>
                                                    <h2 className="text-white text-[35px] md:text-[45px] font-bold mb-8">

                                                        Side Dish

                                                    </h2>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                                        {
                                                            sideDish.map(
                                                                item => (

                                                                    <FoodCard
                                                                        key={item.id}
                                                                        item={item}
                                                                    />
                                                                )
                                                            )
                                                        }

                                                    </div>
                                                </>
                                            )
                                        }

                                        {
                                            foods.length === 0 && (

                                                <h2 className="text-gray-400 text-3xl">

                                                    No Foods Added Yet

                                                </h2>
                                            )
                                        }

                                    </>

                                )

                                : (

                                    /* Drinks + Desserts */
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                        {
                                            foods.length > 0

                                                ? foods.map(
                                                    item => (

                                                        <FoodCard
                                                            key={item.id}
                                                            item={item}
                                                        />
                                                    )
                                                )

                                                : (

                                                    <h2 className="text-gray-400 text-3xl">

                                                        No Items Available

                                                    </h2>
                                                )
                                        }

                                    </div>
                                )
                        }

                    </div>


                </div>

            </section>
            {/* Global Cart */}
            <Cart />

        </>
    );
}