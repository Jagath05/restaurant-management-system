import React, {
    useContext
} from "react";

import {
    CartContext
} from "../context/CartContext";

export default function FoodCard({
    item
}) {

    const cartContext =
        useContext(
            CartContext
        );

    const {
        addToCart,
        setShowCart
    } = cartContext;

    const handleAdd =
        () => {

        // Add food first
        addToCart(item);

    };

    return (

        <div className="bg-white/5 border border-white/10 rounded-[30px] overflow-hidden hover:scale-[1.03] duration-500 shadow-2xl">

            {/* Image */}
            <div className="overflow-hidden">

                <img
                    src={`/api/uploads/images/${item.image}`}
                    alt=""
                    className="w-full h-65 object-cover hover:scale-110 duration-700"
                />

            </div>

            {/* Content */}
            <div className="p-6">

                {/* Veg / Non Veg */}
                <div className="mb-4">

                    <span
                        className={`px-4 py-2 rounded-full text-sm font-bold ${
                            item.food_type ===
                            "Veg"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                        }`}
                    >

                        {
                            item.food_type
                        }

                    </span>

                </div>

                {/* Food Name */}
                <h2 className="text-white text-[30px] font-bold">

                    {
                        item.food_name
                    }

                </h2>

                {/* Section */}
                <p className="text-gray-400 mt-2">

                    {
                        item.section
                    }

                </p>

                {/* Bottom */}
                <div className="flex items-center justify-between mt-6">

                    <h3 className="text-violet-400 text-[28px] font-bold">

                        ₹{
                            item.price
                        }

                    </h3>

                    <button
                        onClick={
                            handleAdd
                        }
                        className="bg-violet-600 hover:bg-violet-700 active:scale-95 duration-300 text-white px-6 py-3 rounded-xl shadow-lg"
                    >

                        Add +

                    </button>

                </div>

            </div>

        </div>
    );
}