import React, {
    useEffect,
    useState
} from "react";

import { motion } from "framer-motion";

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
        setImg] =
        useState(0);

    useEffect(() => {

        const slide =
            setInterval(() => {

                setImg(
                    (prev) =>
                        (prev + 1)
                        % imgs.length
                );

            }, 4000);

        return () =>
            clearInterval(slide);

    }, []);

    return (

        <section className="relative min-h-screen overflow-hidden bg-[#181325]">

            {/* Premium Background Glow */}
            <div className="absolute inset-0 overflow-hidden">

                <motion.div
                    animate={{
                        x: [0, 40, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity
                    }}
                    className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-violet-700/20 rounded-full blur-[150px]"
                />

                <motion.div
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity
                    }}
                    className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] bg-pink-600/20 rounded-full blur-[150px]"
                />

            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-5 pt-28 text-center">

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
                    className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-full px-6 md:px-8 py-3 shadow-2xl hover:scale-105 duration-500"
                >

                    <p className="text-sm md:text-lg text-gray-300">

                        Serving Food Lovers Since 2016 ❤️

                    </p>

                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 60
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.8
                    }}
                    className="mt-8 text-white font-bold leading-tight max-w-6xl text-[42px] sm:text-[55px] md:text-[75px]"
                >

                    Savor Every Bite.
                    <br />

                    <span className="text-violet-400">

                        Savor Every Moment.

                    </span>

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
                        delay: 0.4
                    }}
                    className="text-gray-300 text-base sm:text-lg md:text-xl mt-8 max-w-3xl leading-8"
                >

                    Welcome to a dining experience
                    where flavor, freshness,
                    and hospitality come together.
                    Every dish is crafted to
                    delight your taste buds.

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
                >

                    <a
                        href="#menu"
                        className="group relative inline-flex items-center gap-3 mt-10 bg-violet-600 hover:bg-violet-700 px-8 md:px-12 py-4 md:py-5 rounded-2xl text-white text-lg md:text-xl font-semibold overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:scale-105 duration-500"
                    >

                        <span className="relative z-10">

                            Experience The Flavor

                        </span>

                        <span className="group-hover:translate-x-2 duration-500 text-2xl">

                            →

                        </span>

                        <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-150 duration-700 rounded-full" />

                    </a>

                </motion.div>

                {/* Food Image */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 50
                    }}
                    animate={{
                        opacity: 1,
                        y: [0, -10, 0]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity
                    }}
                    className="relative mt-16 md:mt-24 w-full max-w-6xl"
                >

                    {/* Glow */}
                    <div className="absolute inset-0 bg-violet-600/20 blur-[90px] rounded-[40px]" />

                    {/* Image Card */}
                    <div className="relative overflow-hidden rounded-[35px] border border-white/10 shadow-[0_0_50px_rgba(124,58,237,0.25)]">

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
                            className="w-full h-[280px] sm:h-[420px] md:h-[650px] object-cover hover:scale-105 duration-[3000ms]"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    </div>

                </motion.div>

            </div>

        </section>
    );
}