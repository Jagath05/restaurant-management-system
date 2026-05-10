import React, { useContext } from "react";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../context/CartContext";

export default function FloatingCart() {

    const {
        cart,
        setShowCart
    } = useContext(CartContext);

    const totalItems = cart.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    return (

        <div className="fixed bottom-6 right-6 z-9999">

            <button
                onClick={() => setShowCart(true)}
                className="relative flex items-center gap-3 bg-violet-600 hover:bg-violet-700 px-5 py-4 rounded-full shadow-2xl hover:scale-105 duration-300 border border-violet-400/20"
            >

                <ShoppingCart
                    size={24}
                    className="text-white"
                />

                <span className="text-white font-semibold">
                    Cart
                </span>

                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold min-w-7.5 h-7.5 rounded-full flex items-center justify-center shadow-lg">

                    {totalItems}

                </div>

            </button>

        </div>
    );
}