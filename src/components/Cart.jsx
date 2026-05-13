import React, {
    useContext,
    useState
} from "react";

import {
    motion,
    AnimatePresence
} from "framer-motion";

import {
    Trash2,
    X,
    ShoppingBag,
    Minus,
    Plus
} from "lucide-react";

import {
    CartContext
} from "../context/CartContext";

const FALLBACK_IMAGE =
"https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80";

export default function Cart() {

    const {
        cart,
        increaseQty,
        decreaseQty,
        subtotal,
        tax,
        total,
        clearCart,
        showCart,
        setShowCart
    } =
    useContext(
        CartContext
    );

    const [payment,
        setPayment] =
        useState("UPI");

    const [loading,
        setLoading] =
        useState(false);

    const handleOrder =
        async () => {

            if (
                cart.length ===
                0
            ) {

                alert(
                    "Cart is empty"
                );

                return;
            }

            const tableNumber =
                localStorage.getItem(
                    "tableNumber"
                );

            if (
                !tableNumber
            ) {

                alert(
                    "Tablet not assigned to table"
                );

                return;
            }

            try {

                setLoading(
                    true
                );

                const response =
                    await fetch(
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api/orders/placeOrder.php",
                        {
                            method:
                                "POST",

                            headers:
                            {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    {
                                        customer_name:
                                            "Guest",

                                        table_number:
                                            tableNumber,

                                        items:
                                            cart,

                                        subtotal,

                                        tax,

                                        total,

                                        payment_method:
                                            payment
                                    }
                                )
                        }
                    );

                const data =
                    await response.json();

                if (
                    data.success
                ) {

                    localStorage.setItem(
                        "latestOrderId",
                        data.order_id
                    );

                    alert(
`Order Placed Successfully 🎉

Order ID: #${data.order_id}`
                    );

                    clearCart();

                    setShowCart(
                        false
                    );

                } else {

                    alert(
                        "Order Failed"
                    );
                }

            } catch (
                error
            ) {

                console.log(
                    error
                );

                alert(
                    "Something went wrong"
                );

            } finally {

                setLoading(
                    false
                );
            }
        };

    return (

        <AnimatePresence>

            {
                showCart && (

                    <>

                        {/* Overlay */}
                        <motion.div
                            initial={{
                                opacity: 0
                            }}
                            animate={{
                                opacity: 1
                            }}
                            exit={{
                                opacity: 0
                            }}
                            onClick={() =>
                                setShowCart(
                                    false
                                )
                            }
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
                        />

                        {/* Cart Drawer */}
                        <motion.div
                            initial={{
                                x: "100%"
                            }}
                            animate={{
                                x: 0
                            }}
                            exit={{
                                x: "100%"
                            }}
                            transition={{
                                type: "spring",
                                damping: 22
                            }}
                            className="fixed top-0 right-0 h-screen w-full sm:w-[450px] bg-[#181325]/95 backdrop-blur-2xl border-l border-white/10 z-[9999] shadow-[0_0_60px_rgba(124,58,237,0.15)] flex flex-col"
                        >

                            {/* Header */}
                            <div className="p-6 border-b border-white/10">

                                <div className="flex justify-between items-center">

                                    <div>

                                        <h2 className="text-white text-3xl font-bold">

                                            Your Order

                                        </h2>

                                        <p className="text-gray-400 mt-1">

                                            {
                                                cart.length
                                            } items
                                        </p>

                                    </div>

                                    <button
                                        onClick={() =>
                                            setShowCart(
                                                false
                                            )
                                        }
                                        className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-red-500/20 flex items-center justify-center duration-300"
                                    >

                                        <X
                                            size={28}
                                            className="text-white"
                                        />

                                    </button>

                                </div>

                            </div>

                            {/* Body */}
                            <div className="flex-1 overflow-y-auto px-5 py-5">

                                {
                                    cart.length ===
                                    0

                                    ? (

                                        <div className="h-full flex flex-col items-center justify-center text-center">

                                            <ShoppingBag
                                                size={70}
                                                className="text-violet-400 mb-5"
                                            />

                                            <h2 className="text-white text-3xl font-bold">

                                                Empty Cart 🍽️

                                            </h2>

                                            <p className="text-gray-400 mt-3">

                                                Add delicious food
                                                to continue
                                            </p>

                                        </div>

                                    )

                                    : (

                                        <div className="space-y-5">

                                            {
                                                cart.map(
                                                    item => {

                                                        const image =
item.image
? `https://restaurant-jagath.infinityfreeapp.com/restaurant-api/uploads/images/${item.image}`
: FALLBACK_IMAGE;

                                                        return (

                                                            <motion.div
                                                                layout
                                                                key={item.id}
                                                                className="bg-white/5 border border-white/10 rounded-[30px] p-4 backdrop-blur-xl"
                                                            >

                                                                <div className="flex gap-4">

                                                                    {/* Image */}
                                                                    <img
                                                                        src={image}
                                                                        onError={(e) => {
                                                                            e.target.src =
                                                                                FALLBACK_IMAGE;
                                                                        }}
                                                                        alt=""
                                                                        className="w-28 h-28 rounded-3xl object-cover"
                                                                    />

                                                                    {/* Content */}
                                                                    <div className="flex-1">

                                                                        <div className="flex justify-between">

                                                                            <div>

                                                                                <h3 className="text-white text-lg font-bold capitalize">

                                                                                    {
                                                                                        item.food_name
                                                                                    }

                                                                                </h3>

                                                                                <p className="text-violet-400 mt-1 font-semibold">

                                                                                    ₹
                                                                                    {
                                                                                        item.price
                                                                                    }

                                                                                </p>

                                                                            </div>

                                                                            <button
                                                                                onClick={() =>
                                                                                    decreaseQty(
                                                                                        item.id
                                                                                    )
                                                                                }
                                                                            >

                                                                                <Trash2
                                                                                    className="text-red-400 hover:text-red-300 duration-300"
                                                                                    size={20}
                                                                                />

                                                                            </button>

                                                                        </div>

                                                                        {/* Qty */}
                                                                        <div className="flex justify-between items-center mt-5">

                                                                            <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-3 py-2">

                                                                                <button
                                                                                    onClick={() =>
                                                                                        decreaseQty(
                                                                                            item.id
                                                                                        )
                                                                                    }
                                                                                    className="w-9 h-9 rounded-xl bg-red-500 hover:scale-105 duration-300 text-white flex items-center justify-center"
                                                                                >

                                                                                    <Minus
                                                                                        size={18}
                                                                                    />

                                                                                </button>

                                                                                <span className="text-white font-bold text-lg w-8 text-center">

                                                                                    {
                                                                                        item.quantity
                                                                                    }

                                                                                </span>

                                                                                <button
                                                                                    onClick={() =>
                                                                                        increaseQty(
                                                                                            item.id
                                                                                        )
                                                                                    }
                                                                                    className="w-9 h-9 rounded-xl bg-green-500 hover:scale-105 duration-300 text-white flex items-center justify-center"
                                                                                >

                                                                                    <Plus
                                                                                        size={18}
                                                                                    />

                                                                                </button>

                                                                            </div>

                                                                            <h2 className="text-white text-xl font-bold">

                                                                                ₹
                                                                                {
                                                                                    (
                                                                                        item.price *
                                                                                        item.quantity
                                                                                    ).toFixed(
                                                                                        2
                                                                                    )
                                                                                }

                                                                            </h2>

                                                                        </div>

                                                                    </div>

                                                                </div>

                                                            </motion.div>
                                                        );
                                                    }
                                                )
                                            }

                                        </div>
                                    )
                                }

                            </div>

                            {/* Footer */}
                            {
                                cart.length > 0 && (

                                    <div className="border-t border-white/10 p-6 bg-[#1f1830]">

                                        {/* Payment */}
                                        <label className="text-white font-medium">

                                            Payment Method

                                        </label>

                                        <select
                                            value={payment}
                                            onChange={(e) =>
                                                setPayment(
                                                    e.target.value
                                                )
                                            }
                                            className="w-full mt-3 bg-[#312B45] border border-white/10 rounded-2xl p-4 text-white outline-none"
                                        >

                                            <option>
                                                UPI
                                            </option>

                                            <option>
                                                Card
                                            </option>

                                            <option>
                                                Cash
                                            </option>

                                            <option>
                                                Net Banking
                                            </option>

                                        </select>

                                        {/* Summary */}
                                        <div className="mt-6 space-y-3">

                                            <div className="flex justify-between text-gray-400">

                                                <span>
                                                    Subtotal
                                                </span>

                                                <span>
                                                    ₹
                                                    {
                                                        subtotal.toFixed(
                                                            2
                                                        )
                                                    }
                                                </span>

                                            </div>

                                            <div className="flex justify-between text-gray-400">

                                                <span>
                                                    GST (5%)
                                                </span>

                                                <span>
                                                    ₹
                                                    {
                                                        tax.toFixed(
                                                            2
                                                        )
                                                    }
                                                </span>

                                            </div>

                                            <div className="flex justify-between text-white text-2xl font-bold pt-3 border-t border-white/10">

                                                <span>
                                                    Total
                                                </span>

                                                <span className="text-violet-400">

                                                    ₹
                                                    {
                                                        total.toFixed(
                                                            2
                                                        )
                                                    }
                                                </span>

                                            </div>

                                        </div>

                                        {/* Order */}
                                        <button
                                            onClick={
                                                handleOrder
                                            }
                                            disabled={
                                                loading
                                            }
                                            className="w-full mt-6 bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 py-5 rounded-2xl text-white text-lg font-bold shadow-[0_0_30px_rgba(124,58,237,0.35)] hover:scale-[1.02] duration-300"
                                        >

                                            {
                                                loading
                                                ? "Placing Order..."
                                                : "Proceed Order →"
                                            }

                                        </button>

                                    </div>
                                )
                            }

                        </motion.div>

                    </>
                )
            }

        </AnimatePresence>
    );
}