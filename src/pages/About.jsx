import React
from "react";

import {
    motion
}
from "framer-motion";

import Navbar
from "../components/Navbar";

import {
    Crown,
    ChefHat,
    Sparkles,
    Users
}
from "lucide-react";

const chefImage =
"https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80";

const team = [

    {
        name:
            "Chef Antonio",

        role:
            "Head Chef",

        image:
"https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=600&q=80"
    },

    {
        name:
            "Chef Sophia",

        role:
            "Sous Chef",

        image:
"https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&q=80"
    },

    {
        name:
            "Chef Ethan",

        role:
            "Pastry Chef",

        image:
"https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=600&q=80"
    },

    {
        name:
            "Emma Wilson",

        role:
            "Restaurant Manager",

        image:
"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80"
    }
];

export default function About() {
        return (

        <>
            <Navbar />

            <section className="min-h-screen bg-[#181325] px-5 md:px-10 lg:px-16 pt-36 pb-24 relative overflow-hidden">

                {/* Glow Effects */}
                <div className="absolute top-[-150px] left-[-150px] w-[350px] h-[350px] bg-violet-600/20 blur-[120px] rounded-full" />

                <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] bg-fuchsia-500/20 blur-[120px] rounded-full" />

                <div className="max-w-7xl mx-auto relative z-10">

                    {/* Hero */}
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
                            duration: 0.6
                        }}
                        className="text-center"
                    >

                        <span className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">

                            <Crown size={18} />

                            Luxury Dining Experience

                        </span>

                        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mt-8 leading-tight">

                            About

                            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">

                                {" "}
                                The Royal Taste

                            </span>

                        </h1>

                        <p className="text-gray-400 text-lg md:text-2xl mt-8 max-w-4xl mx-auto leading-10">

                            At
                            {" "}
                            <span className="text-white font-semibold">

                                The Royal Taste

                            </span>

                            , every dish is crafted with passion, premium ingredients, and unforgettable flavors to create a luxury dining experience.

                        </p>

                    </motion.div>

                    {/* Story + Image */}
                    <div className="grid lg:grid-cols-2 gap-10 mt-24 items-center">

                        {/* Image */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: -40
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0
                            }}
                            viewport={{
                                once: true
                            }}
                            className="relative overflow-hidden rounded-[40px]"
                        >

                            <img
                                src={chefImage}
                                alt="Chef"
                                className="w-full h-[550px] object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        </motion.div>

                        {/* Story */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 40
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0
                            }}
                            viewport={{
                                once: true
                            }}
                            className="space-y-8"
                        >

                            <div>

                                <p className="text-violet-400 uppercase tracking-[4px] text-sm">

                                    Our Story

                                </p>

                                <h2 className="text-white text-4xl md:text-6xl font-bold mt-4">

                                    Crafted With Passion

                                </h2>

                            </div>

                            <p className="text-gray-400 text-lg leading-9">

                                We believe food is more than just a meal — it is an experience.

                                From delicious breakfasts to luxury desserts, our chefs prepare every dish with love, premium ingredients, and unmatched quality.

                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-5">

                                <div className="bg-white/5 border border-white/10 rounded-[30px] p-6 backdrop-blur-xl">

                                    <ChefHat className="text-violet-400" />

                                    <h3 className="text-white text-4xl font-bold mt-4">

                                        25+

                                    </h3>

                                    <p className="text-gray-400 mt-2">

                                        Expert Chefs

                                    </p>

                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-[30px] p-6 backdrop-blur-xl">

                                    <Users className="text-violet-400" />

                                    <h3 className="text-white text-4xl font-bold mt-4">

                                        10K+

                                    </h3>

                                    <p className="text-gray-400 mt-2">

                                        Happy Customers

                                    </p>

                                </div>

                            </div>

                        </motion.div>

                    </div>

                    {/* Team */}
                    <div className="mt-28">

                        <div className="text-center">

                            <p className="text-violet-400 uppercase tracking-[4px]">

                                Our Team

                            </p>

                            <h2 className="text-white text-4xl md:text-6xl font-bold mt-4">

                                Meet Our Experts

                            </h2>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-14">

                            {
                                team.map(
                                    (
                                        member,
                                        index
                                    ) => (

                                        <motion.div
                                            key={index}
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
                                                delay:
                                                    index *
                                                    0.08
                                            }}
                                            whileHover={{
                                                y: -8
                                            }}
                                            className="bg-white/5 border border-white/10 rounded-[35px] overflow-hidden backdrop-blur-xl"
                                        >

                                            <img
                                                src={
                                                    member.image
                                                }
                                                alt={
                                                    member.name
                                                }
                                                className="w-full h-[320px] object-cover"
                                            />

                                            <div className="p-6">

                                                <h3 className="text-white text-2xl font-bold">

                                                    {
                                                        member.name
                                                    }

                                                </h3>

                                                <p className="text-violet-400 mt-2">

                                                    {
                                                        member.role
                                                    }

                                                </p>

                                            </div>

                                        </motion.div>
                                    )
                                )
                            }

                        </div>

                    </div>

                </div>

            </section>
        </>
    );
}