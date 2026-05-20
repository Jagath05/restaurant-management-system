import React from "react";

import {
    motion
} from "framer-motion";

import {
    useNavigate
} from "react-router-dom";

const offers = [

    {
        title:
            "20% OFF Dinner",

        description:
            "Enjoy premium dinner with exclusive discounts.",

        emoji:
            "🍽️",

        path:
            "/dinner"
    },

    {
        title:
            "Free Drink Combo",

        description:
            "Order above ₹499 and get a free refreshing drink.",

        emoji:
            "🥤",

        path:
            "/drinks"
    },

    {
        title:
            "Weekend Special",

        description:
            "Exclusive dishes available only on weekends.",

        emoji:
            "🔥",

        path:
            "/lunch"
    }
];

export default function
SpecialOffers() {
    const navigate =
    useNavigate();

    return (

        <section className="relative py-28 bg-[#181325] overflow-hidden">

            {/* Glow */}
            <div className="absolute top-[20%] left-[5%] w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[120px]" />

            <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-[120px]" />

            <div className="relative z-10 max-w-[1400px] mx-auto px-5">

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
                    className="text-center mb-16"
                >

                    <p className="text-violet-400 uppercase tracking-[5px] text-sm mb-3">

                        Premium Deals

                    </p>

                    <h2 className="text-white text-4xl md:text-6xl font-bold">

                        Special Offers 🎁

                    </h2>

                    <p className="text-gray-400 mt-5 max-w-2xl mx-auto">

                        Delicious offers crafted
                        to make your dining
                        experience unforgettable.

                    </p>

                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {
                        offers.map(
                            (
                                offer,
                                index
                            ) => (

                                <motion.div
                                    key={index}
                                    initial={{
                                        opacity: 0,
                                        y: 60
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    viewport={{
                                        once: true
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay:
                                            index *
                                            0.2
                                    }}
                                    whileHover={{
                                        y: -10,
                                        scale: 1.02
                                    }}
                                    className="group relative overflow-hidden rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-violet-500/30 duration-500 shadow-[0_0_40px_rgba(124,58,237,0.08)]"
                                >

                                    {/* Glow */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-violet-500/10 to-pink-500/10 duration-500" />

                                    <div className="relative z-10">

                                        <div className="text-6xl mb-6">

                                            {
                                                offer.emoji
                                            }

                                        </div>

                                        <h3 className="text-white text-2xl font-bold mb-4">

                                            {
                                                offer.title
                                            }

                                        </h3>

                                        <p className="text-gray-400 leading-8">

                                            {
                                                offer.description
                                            }

                                        </p>

                                       <button
    onClick={() => {

        navigate(
            offer.path
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }}
    className="mt-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 px-6 py-3 rounded-2xl text-white font-semibold hover:scale-105 duration-500 shadow-[0_0_25px_rgba(124,58,237,0.25)]"
>

    Grab Offer →

</button>

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