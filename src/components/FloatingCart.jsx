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

export default function
FloatingCart() {

    const {
    cart,
    showCart,
    setShowCart
} =
useContext(
    CartContext
);

    const totalItems =
        cart.reduce(
            (
                acc,
                item
            ) =>

                acc +
                item.quantity,

            0
        );

    if(showCart){

    return null;
}

return (

    <motion.div
            initial={{
                opacity: 0,
                scale: 0.8
            }}
            animate={{
                opacity: 1,
                scale: 1
            }}
            transition={{
                duration: 0.4
            }}
            className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[9999]"
        >

            {/* Glow */}
            <div className="absolute inset-0 bg-violet-600/30 blur-[35px] rounded-full animate-pulse" />

            <motion.button
                whileHover={{
                    scale: 1.06,
                    y: -3
                }}
                whileTap={{
                    scale: 0.95
                }}
                onClick={() => setShowCart(
                    prev => !prev
                )
                }
                className="relative flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 px-5 md:px-6 py-4 rounded-full border border-white/10 backdrop-blur-xl shadow-[0_0_35px_rgba(124,58,237,0.35)] duration-300"
            >

                {/* Cart Icon */}
                <motion.div
                    animate={{
                        rotate: [0, -8, 8, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat:
                            Infinity
                    }}
                >

                    <ShoppingCart
                        size={24}
                        className="text-white"
                    />

                </motion.div>

                {/* Text */}
                <span className="text-white font-semibold text-sm md:text-base">

                    Cart

                </span>

                {/* Badge */}
                <motion.div
                    key={totalItems}
                    initial={{
                        scale: 0.6
                    }}
                    animate={{
                        scale: 1
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300
                    }}
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-bold min-w-[30px] h-[30px] rounded-full flex items-center justify-center shadow-lg border border-white/20"
                >

                    {
                        totalItems
                    }

                </motion.div>

            </motion.button>

        </motion.div>
    );
}