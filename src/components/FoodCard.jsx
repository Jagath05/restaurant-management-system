import React, {
    useContext
} from "react";

import {
    motion
} from "framer-motion";

import {
    ShoppingCart
} from "lucide-react";

import {
    CartContext
} from "../context/CartContext";

const FALLBACK_IMAGE =
"https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80";

export default function FoodCard({
    item
}) {

    const cartContext =
        useContext(
            CartContext
        );

    const {
        addToCart
    } = cartContext;

    const handleAdd =
        () => {

            addToCart(
                item
            );
        };

    const imageUrl =
        item.image

            ? `https://restaurant-jagath.infinityfreeapp.com/restaurant-api/uploads/images/${item.image}`

            : FALLBACK_IMAGE;

    return (

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
                duration: 0.4
            }}
            whileHover={{
                y: -10
            }}
            className="group relative overflow-hidden rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-xl hover:border-violet-500/30 duration-500 shadow-[0_0_40px_rgba(124,58,237,0.08)]"
        >

            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-violet-500/10 to-pink-500/10 duration-500" />

            {/* Food Type */}
            <div className={`absolute top-5 right-5 z-20 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-xl border
            ${
                item.food_type ===
                "Veg"

                    ? "bg-green-500/15 text-green-400 border-green-500/20"

                    : "bg-red-500/15 text-red-400 border-red-500/20"
            }`}>

                {
                    item.food_type
                }

            </div>

            {/* Image */}
            <div className="relative overflow-hidden h-[270px]">

                <img
                    src={
                        imageUrl
                    }
                    alt={
                        item.food_name
                    }
                    onError={
                        (
                            e
                        ) => {

                            e.target.src =
                                FALLBACK_IMAGE;
                        }
                    }
                    className="w-full h-full object-cover group-hover:scale-110 duration-[3000ms]"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            </div>

            {/* Content */}
            <div className="relative z-10 p-7">

                {/* Category */}
                <div className="inline-flex bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-violet-300 mb-5">

                    {
                        item.section
                    }

                </div>

                {/* Food Name */}
                <h2 className="text-white text-[28px] font-bold capitalize leading-tight">

                    {
                        item.food_name
                    }

                </h2>

                <p className="text-gray-400 mt-2">

                    Delicious premium
                    quality dish freshly
                    prepared for you.

                </p>

                {/* Bottom */}
                <div className="flex items-center justify-between mt-8">

                    {/* Price */}
                    <div>

                        <p className="text-gray-500 text-sm">

                            Price

                        </p>

                        <h3 className="text-violet-400 text-[30px] font-bold">

                            ₹
                            {
                                item.price
                            }

                        </h3>

                    </div>

                    {/* Button */}
                    <motion.button
                        whileTap={{
                            scale: 0.95
                        }}
                        whileHover={{
                            scale: 1.05
                        }}
                        onClick={
                            handleAdd
                        }
                        className="flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 px-6 py-4 rounded-2xl text-white font-semibold shadow-[0_0_30px_rgba(124,58,237,0.35)] duration-500"
                    >

                        <ShoppingCart
                            size={20}
                        />

                        Add

                    </motion.button>

                </div>

            </div>

        </motion.div>
    );
}