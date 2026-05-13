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
}
from "lucide-react";

export default function Footer() {

    return (

        <footer className="bg-[#120d1f] border-t border-white/10 relative overflow-hidden">

            {/* Glow */}
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-violet-600/10 blur-[120px] rounded-full" />

            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-fuchsia-600/10 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto px-5 md:px-10 py-20 relative z-10">

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

                        <div className="flex items-center gap-3">

                            <div className="w-14 h-14 rounded-2xl bg-violet-600/20 flex items-center justify-center text-violet-400">

                                <Crown size={28} />

                            </div>

                            <div>

                                <h2 className="text-white text-2xl font-bold">

                                    The Royal Taste

                                </h2>

                                <p className="text-violet-400 text-sm">

                                    Luxury Dining

                                </p>

                            </div>

                        </div>

                        <p className="text-gray-400 mt-6 leading-8">

                            Experience luxury dining with premium taste,
                            elegant atmosphere, and royal hospitality.

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

                        <div className="flex flex-col gap-4 mt-6 text-gray-400">

                            <a href="/" className="hover:text-violet-400 duration-300">
                                Home
                            </a>

                            <a href="/menu" className="hover:text-violet-400 duration-300">
                                Menu
                            </a>

                            <a href="/about" className="hover:text-violet-400 duration-300">
                                About
                            </a>

                            <a href="/feedback" className="hover:text-violet-400 duration-300">
                                Feedback
                            </a>

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

                        <div className="space-y-5 mt-6 text-gray-400">

                            <div className="flex gap-3">

                                <MapPin className="text-violet-400" />

                                <span>
                                    Pondicherry, India
                                </span>

                            </div>

                            <div className="flex gap-3">

                                <Phone className="text-violet-400" />

                                <span>
                                    +91 98765 43210
                                </span>

                            </div>

                            <div className="flex gap-3">

                                <Clock3 className="text-violet-400" />

                                <span>
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

                        <div className="flex gap-4 mt-6">

                            <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:text-violet-400 hover:border-violet-500/30 duration-300 flex items-center justify-center">

                                <FaFacebookF size={22} />

                            </button>

                            <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:text-violet-400 hover:border-violet-500/30 duration-300 flex items-center justify-center">

                                <FaInstagram size={22} />

                            </button>

                            <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:text-violet-400 hover:border-violet-500/30 duration-300 flex items-center justify-center">

                                <FaYoutube size={22} />

                            </button>

                        </div>

                    </motion.div>

                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-500">

                    © 2026 The Royal Taste — Luxury Dining.
                    All Rights Reserved.

                </div>

            </div>

        </footer>
    );
}