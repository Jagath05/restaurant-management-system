import React from "react";
import { useNavigate } from "react-router-dom";

import breakfast from "../assets/breakfast.png";
import lunch from "../assets/lunch.png";
import dinner from "../assets/dinner.png";
import drinks from "../assets/juice.png";
import desserts from "../assets/ice.png";

export default function Categories() {

    const navigate = useNavigate()

    const categories = [

        {
            title: "Breakfast",
            image: breakfast,
            path: "/breakfast"
        },

        {
            title: "Lunch",
            image: lunch,
            path: "/lunch"
        },

        {
            title: "Dinner",
            image: dinner,
            path: "/dinner"
        },


        {
            title: "Drinks",
            image: drinks,
            path: "/drinks"
        },

        {
            title: "Desserts",
            image: desserts,
            path: "/desserts"
        }

    ]

    return (

        <section    id="menu" className="bg-[#262235] px-10 -mt-52 pb-20">

            {/* Heading */}
            <h1 className="text-white text-[65px] font-bold">
                Explore Food Categories
            </h1>

            <p className="text-gray-400 text-[22px] mt-2">
                Fresh meals prepared daily for every foodie.
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">

                {
                    categories.map((item, index) => (

                        <div
                            key={index}
                            onClick={() => navigate(item.path)}
                            className="bg-white/5 border border-white/10 rounded-[35px] p-8 flex items-center gap-8 cursor-pointer hover:scale-105 hover:bg-violet-600/20 duration-500 shadow-2xl group"
                        >

                            {/* Image */}
                            <div className="bg-yellow-100 p-4 rounded-3xl overflow-hidden">

                                <img
                                    src={item.image}
                                    alt=""
                                    className="w-27.5 h-27.5 object-cover group-hover:scale-110 duration-500"
                                />

                            </div>

                            {/* Text */}
                            <div>

                                <h2 className="text-white text-[40px] font-bold">
                                    {item.title}
                                </h2>

                                <p className="text-gray-400 text-[24px] mt-1">
                                    View Menu
                                </p>

                            </div>

                        </div>

                    ))
                }

            </div>

        </section>
    )
}