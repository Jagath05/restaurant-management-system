import React from "react";

import {
    motion
} from "framer-motion";

import {
    Crown,
    UtensilsCrossed,
    Sparkles
} from "lucide-react";

export default function About() {
      return (

        <section className="min-h-screen bg-[#181325] px-5 md:px-12 py-24 relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-[-150px] left-[-150px] w-[350px] h-[350px] bg-violet-600/20 blur-[120px] rounded-full" />

            <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] bg-fuchsia-500/20 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Hero */}
                <motion.div
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
                        duration: 0.6
                    }}
                    className="text-center"
                >

                    <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-medium">

                        <Crown size={18} />

                        Luxury Dining Experience

                    </span>

                    <h1 className="text-white text-4xl md:text-7xl font-bold mt-8 leading-tight">

                        About
                        {" "}

                        <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">

                            The Royal Taste

                        </span>

                    </h1>

                    <p className="text-gray-400 text-lg md:text-2xl mt-8 leading-10 max-w-5xl mx-auto">

                        Welcome to
                        {" "}
                        <span className="text-white font-semibold">

                            The Royal Taste

                        </span>
                        , where passion meets flavor and every meal becomes an unforgettable experience.

                        Our chefs craft every dish with premium ingredients, authentic taste, and exceptional care to bring luxury dining to your table.

                    </p>

                </motion.div>

                {/* Story Section */}
                <div className="grid lg:grid-cols-2 gap-12 mt-24 items-center">

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -50
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0
                        }}
                        viewport={{
                            once: true
                        }}
                        transition={{
                            duration: 0.6
                        }}
                        className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 backdrop-blur-xl"
                    >

                        <h2 className="text-white text-3xl md:text-5xl font-bold">

                            Crafted with Passion

                        </h2>

                        <p className="text-gray-400 text-lg mt-6 leading-9">

                            At
                            {" "}
                            <span className="text-violet-400 font-semibold">

                                The Royal Taste

                            </span>
                            , we believe food is not just a meal — it is an experience.

                            From breakfast delights to luxurious desserts, every dish is prepared with care, premium ingredients, and unmatched attention to quality.

                        </p>

                    </motion.div>

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 50
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0
                        }}
                        viewport={{
                            once: true
                        }}
                        transition={{
                            duration: 0.6
                        }}
                        className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-white/10 rounded-[40px] p-10 backdrop-blur-xl"
                    >

                        <h2 className="text-white text-3xl md:text-5xl font-bold">

                            Why Choose Us?

                        </h2>

                        <div className="space-y-6 mt-8 text-lg text-gray-300">

                            <p>

                                ⭐ Premium quality ingredients

                            </p>

                            <p>

                                ⭐ Elegant dining atmosphere

                            </p>

                            <p>

                                ⭐ Fast & customer-first service

                            </p>

                            <p>

                                ⭐ Luxury food experience

                            </p>

                        </div>

                    </motion.div>

                </div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-3 gap-8 mt-24">

                    {[
                        {
                            icon:
                                <UtensilsCrossed size={40} />,
                            title:
                                "Premium Quality",
                            desc:
                                "Fresh ingredients and premium cooking experience."
                        },

                        {
                            icon:
                                <Sparkles size={40} />,
                            title:
                                "Luxury Experience",
                            desc:
                                "Elegant atmosphere for memorable dining."
                        },

                        {
                            icon:
                                <Crown size={40} />,
                            title:
                                "Royal Service",
                            desc:
                                "Fast and customer-first service experience."
                        }

                    ].map(
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
                                        index * 0.1
                                }}
                                className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl hover:border-violet-500/30 duration-300 hover:-translate-y-2"
                            >

                                <div className="w-18 h-18 rounded-3xl bg-violet-600/20 flex items-center justify-center text-violet-400">

                                    {item.icon}

                                </div>

                                <h2 className="text-white text-3xl font-bold mt-8">

                                    {item.title}

                                </h2>

                                <p className="text-gray-400 mt-5 leading-8">

                                    {item.desc}

                                </p>

                            </motion.div>
                        )
                    )}

                </div>

            </div>

        </section>
    );
}