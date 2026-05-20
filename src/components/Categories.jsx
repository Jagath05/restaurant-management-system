import React from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    motion
} from "framer-motion";

import {
    ArrowUpRight
} from "lucide-react";

import breakfast
from "../assets/breakfast.png";

import lunch
from "../assets/lunch.png";

import dinner
from "../assets/dinner.png";

import drinks
from "../assets/juice.png";

import desserts
from "../assets/ice.png";

export default function Categories() {

    const navigate =
        useNavigate();

    const categories = [

        {
            title:
                "Breakfast",

            subtitle:
                "Fresh morning delights",

            image:
                breakfast,

            path:
                "/breakfast"
        },

        {
            title:
                "Lunch",

            subtitle:
                "Delicious midday meals",

            image:
                lunch,

            path:
                "/lunch"
        },

        {
            title:
                "Dinner",

            subtitle:
                "Luxury evening dining",

            image:
                dinner,

            path:
                "/dinner"
        },

        {
            title:
                "Drinks",

            subtitle:
                "Refreshing premium beverages",

            image:
                drinks,

            path:
                "/drinks"
        },

        {
            title:
                "Desserts",

            subtitle:
                "Sweet luxury experience",

            image:
                desserts,

            path:
                "/desserts"
        }
    ];
        return (

        <section
            id="menu"
            className="bg-[#181325] px-5 md:px-10 lg:px-16 py-24 relative overflow-hidden"
        >

            {/* Glow Effects */}
            <div className="absolute top-[-150px] left-[-150px] w-[350px] h-[350px] bg-violet-600/20 blur-[120px] rounded-full" />

            <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] bg-fuchsia-500/20 blur-[120px] rounded-full" />

            <div className="relative z-10">

                {/* Heading */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{
                        once: true
                    }}
                    transition={{
                        duration: 0.5
                    }}
                    className="text-center"
                >

                    <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">

                        Explore Food

                        <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">

                            {" "}
                            Categories

                        </span>

                    </h1>

                    <p className="text-gray-400 text-lg md:text-2xl mt-5 max-w-3xl mx-auto">

                        Discover handcrafted dishes made fresh daily for every foodie.

                    </p>

                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">

                    {
                        categories.map(
                            (
                                item,
                                index
                            ) => (

                                <motion.div
                                    key={index}
                                    initial={{
                                        opacity: 0,
                                        y: 50
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    viewport={{
                                        once: true
                                    }}
                                    transition={{
                                        delay:
                                            index *
                                            0.08
                                    }}
                                    whileHover={{
                                        y: -10
                                    }}
                                    onClick={() =>
                                        navigate(
                                            item.path
                                        )
                                    }
                                    className="group relative h-[420px] rounded-[40px] overflow-hidden cursor-pointer border border-white/10 bg-white/5 backdrop-blur-xl"
                                >

                                    {/* Background Image */}
                                    <img
                                        src={
                                            item.image
                                        }
                                        alt={
                                            item.title
                                        }
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 duration-[3000ms]"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                                    {/* Glow */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 duration-500" />

                                    {/* Content */}
                                    <div className="relative z-10 h-full flex flex-col justify-end p-8">

                                        <p className="text-violet-300 text-sm uppercase tracking-[3px] font-semibold">

                                            Premium Dining

                                        </p>

                                        <h2 className="text-white text-4xl md:text-5xl font-bold mt-3">

                                            {
                                                item.title
                                            }

                                        </h2>

                                        <p className="text-gray-300 text-lg mt-4 max-w-[280px]">

                                            {
                                                item.subtitle
                                            }

                                        </p>

                                        {/* Button */}
                                        <motion.div
                                            whileHover={{
                                                x: 5
                                            }}
                                            className="mt-8 inline-flex items-center gap-3 text-white font-semibold bg-white/10 border border-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl w-fit"
                                        >

                                            Explore Menu

                                            <ArrowUpRight
                                                size={20}
                                            />

                                        </motion.div>

                                    </div>

                                </motion.div>
                            )
                        )
                    }

                </div>

            </div>

        </section>
    );
}