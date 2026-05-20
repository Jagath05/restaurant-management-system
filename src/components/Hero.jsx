import React, {
    useEffect,
    useState
} from "react";

import {
    motion
} from "framer-motion";

import {
    Sparkles,
    Clock3,
    Star
} from "lucide-react";

import IM1 from "../assets/img_1.jpg";
import IM2 from "../assets/img_2.jpg";
import IM3 from "../assets/img_3.jpg";
import IM4 from "../assets/img_4.jpg";

export default function Hero() {

    const imgs = [
        IM1,
        IM2,
        IM3,
        IM4
    ];

    const [img,
        setImg]
        =
        useState(0);

    useEffect(() => {

        const slide =
            setInterval(() => {

                setImg(
                    prev =>
                        (
                            prev + 1
                        ) %
                        imgs.length
                );

            }, 4000);

        return () =>
            clearInterval(
                slide
            );

    }, []);

    return (

        <section className="relative min-h-screen overflow-hidden bg-[#181325]">

            {/* Premium Glow */}
            <div className="absolute inset-0 overflow-hidden">

                <motion.div
                    animate={{
                        x: [0, 60, 0],
                        y: [0, -40, 0]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity
                    }}
                    className="absolute top-[10%] left-[5%] w-[420px] h-[420px] bg-violet-700/20 rounded-full blur-[150px]"
                />

                <motion.div
                    animate={{
                        x: [0, -50, 0],
                        y: [0, 40, 0]
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity
                    }}
                    className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-fuchsia-600/20 rounded-full blur-[150px]"
                />

            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-5 pt-32 text-center">

                {/* Badge */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: -30
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.7
                    }}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl"
                >

                    <Sparkles
                        size={18}
                        className="text-violet-400"
                    />

                    <p className="text-gray-300 text-sm md:text-lg">

                        Luxury Dining Experience Since 2016

                    </p>

                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 50
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.7
                    }}
                    className="mt-10 text-white font-bold leading-[1.1] max-w-6xl text-[46px] sm:text-[60px] md:text-[82px]"
                >

                    Taste The

                    <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">

                        {" "}
                        Luxury

                    </span>

                    <br />

                    In Every Bite

                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    transition={{
                        delay: 0.3
                    }}
                    className="text-gray-300 text-base md:text-xl mt-8 max-w-4xl leading-9"
                >

                    Indulge in a premium dining experience
                    crafted with fresh ingredients,
                    exceptional flavors, and unforgettable hospitality.

                </motion.p>
                                {/* CTA */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        delay: 0.5
                    }}
                    className="flex flex-col sm:flex-row gap-5 mt-12"
                >

                    {/* Primary CTA */}
                    <a
                        href="#menu"
                        className="group relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-700 to-fuchsia-700 hover:from-violet-500 hover:to-fuchsia-600 px-10 md:px-12 py-5 rounded-[26px] text-white text-lg md:text-xl font-semibold shadow-[0_0_40px_rgba(124,58,237,0.35)] hover:scale-105 duration-500"
                    >

                        <span className="relative z-10">

                            Explore Menu →

                        </span>

                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 duration-500" />

                    </a>

                    {/* Secondary CTA */}
                    <a
                        href="/reservation"
                        className="group bg-white/5 hover:bg-white/10 border border-white/10 px-10 md:px-12 py-5 rounded-[26px] text-white text-lg md:text-xl font-semibold backdrop-blur-xl duration-500 hover:scale-105"
                    >

                        Reserve Table

                    </a>

                </motion.div>

                {/* Floating Stats */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 50
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        delay: 0.7
                    }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-16 w-full max-w-5xl"
                >

                    {/* Card 1 */}
                    <motion.div
                        whileHover={{
                            y: -5
                        }}
                        className="bg-white/[0.04] border border-white/10 rounded-[35px] p-6 backdrop-blur-2xl"
                    >

                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-violet-500/10 mx-auto">

                            <Clock3
                                size={28}
                                className="text-violet-400"
                            />

                        </div>

                        <h3 className="text-white text-3xl font-bold mt-5">

                            24/7

                        </h3>

                        <p className="text-gray-400 mt-2">

                            Premium Service

                        </p>

                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        whileHover={{
                            y: -5
                        }}
                        className="bg-white/[0.04] border border-white/10 rounded-[35px] p-6 backdrop-blur-2xl"
                    >

                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/10 mx-auto">

                            <Star
                                size={28}
                                className="text-yellow-400"
                            />

                        </div>

                        <h3 className="text-white text-3xl font-bold mt-5">

                            4.9★

                        </h3>

                        <p className="text-gray-400 mt-2">

                            Customer Rating

                        </p>

                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        whileHover={{
                            y: -5
                        }}
                        className="bg-white/[0.04] border border-white/10 rounded-[35px] p-6 backdrop-blur-2xl"
                    >

                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-fuchsia-500/10 mx-auto">

                            <Sparkles
                                size={28}
                                className="text-fuchsia-400"
                            />

                        </div>

                        <h3 className="text-white text-3xl font-bold mt-5">

                            100%

                        </h3>

                        <p className="text-gray-400 mt-2">

                            Fresh Ingredients

                        </p>

                    </motion.div>

                </motion.div>
                                {/* Hero Image */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 60
                    }}
                    animate={{
                        opacity: 1,
                        y: [0, -12, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity
                    }}
                    className="relative mt-20 md:mt-24 w-full max-w-6xl"
                >

                    {/* Glow */}
                    <div className="absolute inset-0 bg-violet-600/20 blur-[90px] rounded-[45px]" />

                    {/* Floating Cards */}
                    <motion.div
                        animate={{
                            y: [0, -8, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity
                        }}
                        className="hidden md:flex absolute top-10 left-8 z-20 bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[30px] px-6 py-5"
                    >

                        <div>

                            <p className="text-gray-300 text-sm">

                                Chef Special

                            </p>

                            <h3 className="text-white text-xl font-bold mt-1">

                                Premium Meals

                            </h3>

                        </div>

                    </motion.div>

                    <motion.div
                        animate={{
                            y: [0, 8, 0]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity
                        }}
                        className="hidden md:flex absolute bottom-10 right-8 z-20 bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[30px] px-6 py-5"
                    >

                        <div>

                            <p className="text-gray-300 text-sm">

                                Customer Love

                            </p>

                            <h3 className="text-yellow-400 text-xl font-bold mt-1">

                                ★ 4.9 Rating

                            </h3>

                        </div>

                    </motion.div>

                    {/* Image */}
                    <div className="relative overflow-hidden rounded-[45px] border border-white/10 shadow-[0_0_50px_rgba(124,58,237,0.25)]">

                        <motion.img
                            key={img}
                            initial={{
                                opacity: 0,
                                scale: 1.1
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1
                            }}
                            transition={{
                                duration: 0.8
                            }}
                            src={imgs[img]}
                            alt="Food"
                            className="w-full h-[300px] sm:h-[450px] md:h-[700px] object-cover hover:scale-105 duration-[4000ms]"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    </div>

                </motion.div>

            </div>

        </section>
    );
}