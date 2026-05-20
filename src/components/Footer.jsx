import React from "react";

import {
    motion
} from "framer-motion";

import {
    FaFacebookF,
    FaInstagram,
    FaYoutube
}
from "react-icons/fa";

import {
    Crown,
    MapPin,
    Phone,
    Clock3,
    Sparkles
}
from "lucide-react";

export default function Footer() {

    return (

        <footer className="relative bg-[#120d1f] border-t border-white/10 overflow-hidden">

            {/* Premium Glow */}
            <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-violet-600/15 blur-[140px] rounded-full" />

            <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-fuchsia-600/15 blur-[140px] rounded-full" />

            <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 py-20">

                {/* Top Premium Banner */}
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
                    className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-violet-600/15 to-fuchsia-600/15 border border-white/10 backdrop-blur-3xl p-8 md:p-12 mb-20"
                >

                    <div className="absolute inset-0 bg-white/[0.02]" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">

                        <div>

                            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-violet-300 mb-6">

                                <Sparkles
                                    size={18}
                                />

                                Premium Dining Experience

                            </div>

                            <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">

                                Taste Luxury <br />

                                In Every Bite

                            </h2>

                            <p className="text-gray-300 mt-5 text-lg max-w-2xl">

                                Fresh ingredients, premium taste,
                                and unforgettable dining moments.

                            </p>

                        </div>

                        <a
                            href="/reservation"
                            className="group bg-gradient-to-r from-violet-600 via-purple-700 to-fuchsia-700 hover:from-violet-500 hover:to-fuchsia-600 px-10 py-5 rounded-[25px] text-white text-lg font-semibold shadow-[0_0_35px_rgba(124,58,237,0.35)] duration-500 hover:scale-105"
                        >

                            Reserve Table →

                        </a>

                    </div>

                </motion.div>

                {/* Footer Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                                        {/* Brand */}
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
                    >

                        <div className="flex items-center gap-4">

                            <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-white/10 flex items-center justify-center text-violet-400">

                                <Crown
                                    size={30}
                                />

                            </div>

                            <div>

                                <h2 className="text-white text-3xl font-bold">

                                    The Royal Taste

                                </h2>

                                <p className="text-violet-400 text-sm tracking-[4px] uppercase">

                                    Luxury Dining

                                </p>

                            </div>

                        </div>

                        <p className="text-gray-400 mt-7 leading-8 text-lg">

                            Experience luxury dining with premium taste,
                            elegant atmosphere, and unforgettable
                            hospitality.

                        </p>

                    </motion.div>

                    {/* Quick Links */}
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
                            delay: 0.1
                        }}
                    >

                        <h3 className="text-white text-2xl font-bold">

                            Quick Links

                        </h3>

                        <div className="flex flex-col gap-5 mt-7">

                            {
                                [
                                    "Home",
                                    "About",
                                    "Feedback",
                                    "Reservation"
                                ].map(
                                    item => (

                                        <a
                                            key={item}
                                            href={
item === "Home"
? "/"
: `/${item.toLowerCase()}`
                                            }
                                            className="text-gray-400 hover:text-violet-400 duration-300 text-lg"
                                        >

                                            {item}

                                        </a>
                                    )
                                )
                            }

                        </div>

                    </motion.div>

                    {/* Contact */}
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
                            delay: 0.2
                        }}
                    >

                        <h3 className="text-white text-2xl font-bold">

                            Contact

                        </h3>

                        <div className="space-y-5 mt-7">

                            <div className="flex gap-4 bg-white/[0.04] border border-white/10 rounded-[25px] p-4">

                                <MapPin className="text-violet-400 shrink-0" />

                                <span className="text-gray-400">

                                    Pondicherry, India

                                </span>

                            </div>

                            <div className="flex gap-4 bg-white/[0.04] border border-white/10 rounded-[25px] p-4">

                                <Phone className="text-violet-400 shrink-0" />

                                <span className="text-gray-400">

                                    +91 98765 43210

                                </span>

                            </div>

                            <div className="flex gap-4 bg-white/[0.04] border border-white/10 rounded-[25px] p-4">

                                <Clock3 className="text-violet-400 shrink-0" />

                                <span className="text-gray-400">

                                    9:00 AM - 11:00 PM

                                </span>

                            </div>

                        </div>

                    </motion.div>

                    {/* Social */}
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
                            delay: 0.3
                        }}
                    >

                        <h3 className="text-white text-2xl font-bold">

                            Follow Us

                        </h3>

                        <p className="text-gray-400 mt-5 leading-7">

                            Stay connected with us
                            for delicious updates.

                        </p>

                        <div className="flex gap-4 mt-8">

                            {
                                [
                                    <FaFacebookF />,
                                    <FaInstagram />,
                                    <FaYoutube />
                                ].map(
                                    (
                                        icon,
                                        index
                                    ) => (

                                        <motion.button
                                            whileHover={{
                                                y: -5,
                                                scale: 1.08
                                            }}
                                            key={index}
                                            className="w-16 h-16 rounded-[24px] bg-white/[0.04] border border-white/10 hover:border-violet-500/30 text-gray-300 hover:text-violet-400 duration-300 flex items-center justify-center text-xl"
                                        >

                                            {icon}

                                        </motion.button>
                                    )
                                )
                            }

                        </div>

                    </motion.div>
                                    </div>

                {/* Bottom */}
                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1
                    }}
                    viewport={{
                        once: true
                    }}
                    className="border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-5"
                >

                    <p className="text-gray-500 text-center md:text-left">

                        © 2026
                        {" "}
                        <span className="text-violet-400 font-semibold">

                            The Royal Taste

                        </span>

                        {" "}
                        — Luxury Dining.
                        All Rights Reserved.

                    </p>

                    <div className="flex items-center gap-6 text-gray-500 text-sm">

                        <a
                            href="/about"
                            className="hover:text-violet-400 duration-300"
                        >

                            About

                        </a>

                        <a
                            href="/feedback"
                            className="hover:text-violet-400 duration-300"
                        >

                            Feedback

                        </a>

                        <a
                            href="/reservation"
                            className="hover:text-violet-400 duration-300"
                        >

                            Reservation

                        </a>

                    </div>

                </motion.div>

            </div>

        </footer>
    );
}