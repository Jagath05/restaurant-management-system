import React, {
    useContext
} from "react";

import {
    motion
} from "framer-motion";

import {
    ShoppingCart,
    Star,
    Flame
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
    } =
    cartContext;

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
                duration: 0.45
            }}
            whileHover={{
                y: -12
            }}
            className="group relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl hover:border-violet-500/30 duration-700 shadow-[0_0_60px_rgba(124,58,237,0.08)]"
        >

            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 duration-700" />

            {/* Premium Badge */}
            <div className="absolute top-5 left-5 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2">

                <Flame
                    size={16}
                    className="text-orange-400"
                />

                <span className="text-white text-sm font-medium">

                    Popular

                </span>

            </div>

            {/* Veg / Non Veg */}
            <div className={`absolute top-5 right-5 z-20 px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-xl border
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
            <div className="relative overflow-hidden h-[340px]">

                <img
                    src={
                        imageUrl
                    }
                    alt={
                        item.food_name
                    }
                    onError={(e)=>{

                        e.target.src =
                        FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 duration-[3500ms]"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Floating Price */}
                <div className="absolute bottom-5 right-5 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[20px] px-5 py-3">

                    <p className="text-gray-400 text-xs">

                        Starting at

                    </p>

                    <h3 className="text-violet-300 text-2xl font-bold">

                        ₹{
                            item.price
                        }

                    </h3>

                </div>

            </div>
                        {/* Content */}
            <div className="relative z-10 p-8">

                {/* Section Badge */}
                <div className="flex items-center justify-between">

                    <div className="inline-flex bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-violet-300">

                        {
                            item.section
                        }

                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-3 py-2 rounded-full">

                        <Star
                            size={16}
                            className="text-yellow-400 fill-yellow-400"
                        />

                        <span className="text-yellow-300 text-sm font-semibold">

                            4.9

                        </span>

                    </div>

                </div>

                {/* Food Name */}
                <h2 className="text-white text-[34px] font-bold capitalize mt-6 leading-tight">

                    {
                        item.food_name
                    }

                </h2>

                {/* Description */}
                <p className="text-gray-400 mt-4 text-[16px] leading-8">

                    Freshly prepared with premium ingredients
                    and crafted by expert chefs to deliver
                    unforgettable taste and luxury dining.

                </p>

                {/* Bottom */}
                <div className="flex items-center justify-between mt-10">

                    {/* Info */}
                    <div>

                        <p className="text-gray-500 text-sm">

                            Premium Quality

                        </p>

                        <h3 className="text-white text-xl font-semibold mt-2">

                            Chef Recommended

                        </h3>

                    </div>

                    {/* Add Button */}
                    <motion.button
                        whileTap={{
                            scale: 0.94
                        }}
                        whileHover={{
                            scale: 1.05
                        }}
                        onClick={
                            handleAdd
                        }
                        className="group/add relative overflow-hidden flex items-center gap-3 bg-gradient-to-r from-violet-600 via-purple-700 to-fuchsia-700 hover:from-violet-500 hover:to-fuchsia-600 px-7 py-5 rounded-[24px] text-white font-semibold shadow-[0_0_35px_rgba(124,58,237,0.35)] duration-500"
                    >

                        {/* Hover Glow */}
                        <div className="absolute inset-0 opacity-0 group-hover/add:opacity-100 bg-white/10 duration-500" />

                        <ShoppingCart
                            size={22}
                            className="relative z-10"
                        />

                        <span className="relative z-10">

                            Add To Cart

                        </span>

                    </motion.button>

                </div>

            </div>
                    </motion.div>
    );
}