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
    Plus,
    Crown,
    Sparkles
} from "lucide-react";

import {
    CartContext
} from "../context/CartContext";

const FALLBACK_IMAGE =
"https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80";

export default function Cart({
    fixedMode = false
}) {

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
                cart.length === 0
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

                            headers: {
                                "Content-Type":
                                "application/json"
                            },

                            body:
                            JSON.stringify({
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
                            })
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
`🎉 Order Placed Successfully

Order ID:
#${data.order_id}`
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

            } catch(error){

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
                        {
    !fixedMode && (

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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
        />
    )
}

                        {/* Drawer */}
                        <motion.div
    initial={
        fixedMode
        ? false
        : {
            x: "100%"
        }
    }
    animate={
        fixedMode
        ? {}
        : {
            x: 0
        }
    }
    exit={
        fixedMode
        ? {}
        : {
            x: "100%"
        }
    }
    transition={{
        type:
        "spring",
        damping: 24
    }}
    className={`

        ${
            fixedMode

            ? "relative h-full w-full rounded-[40px]"

            : "fixed top-0 right-0 h-[100dvh] w-full sm:w-[650px] xl:w-[720px] z-[9999]"
        }

        bg-[#140f22]/95
        backdrop-blur-3xl
        border-l border-white/10
        shadow-[0_0_80px_rgba(124,58,237,0.15)]
        flex flex-col
        overflow-hidden
    `}
>
                            {/* Glow */}
                            <div className="absolute top-[-100px] right-[-100px] w-[250px] h-[250px] bg-violet-600/20 blur-[120px] rounded-full" />

                            {/* Header */}
                            <div className="relative z-10 p-7 border-b border-white/10 bg-white/[0.02]">

                                <div className="flex justify-between items-center">

                                    <div>

                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 mb-4">

                                            <Crown
                                                size={16}
                                            />

                                            Luxury Order

                                        </div>

                                       <div className="flex items-start justify-between gap-4">

    <div>

        <h2 className="text-white text-3xl md:text-4xl font-bold">

            Your Cart

        </h2>

        <div className="mt-4 inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-violet-300">

            {cart.length} Items
            •
            ₹{total.toFixed(2)}

        </div>

    </div>

    {
        fixedMode && (

            <button
                onClick={() =>
                    setShowCart(
                        false
                    )
                }
                className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 px-5 py-3 rounded-2xl text-red-400 font-semibold duration-300"
            >

                ✕

            </button>
        )
    }

</div>
<div className="mt-4 inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-violet-300">

    {cart.length} Items
    •
    ₹{total.toFixed(2)}

</div>

                                        <p className="text-gray-400 mt-2">

                                            {
                                                cart.length
                                            }
                                            {" "}
                                            items selected

                                        </p>

                                    </div>

                                    {/* Close */}
                                   {
    !fixedMode && (

        <button
            onClick={() =>
                setShowCart(
                    false
                )
            }
            className="w-14 h-14 rounded-[20px] bg-white/5 hover:bg-red-500/20 border border-white/10 flex items-center justify-center duration-300"
        >

            <X
                size={28}
                className="text-white"
            />

        </button>
    )
}

                                </div>

                            </div>

                            {/* Body */}
                            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-7 pr-3 scrollbar-thin scrollbar-thumb-violet-500/70 scrollbar-track-transparent hover:scrollbar-thumb-violet-400 scroll-smooth">
                                                                {
                                    cart.length === 0

                                    ? (

                                        <div className="h-full flex flex-col items-center justify-center text-center px-8">

                                            <div className="w-32 h-32 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-8">

                                                <ShoppingBag
                                                    size={60}
                                                    className="text-violet-400"
                                                />

                                            </div>

                                            <h2 className="text-white text-3xl md:text-4xl font-bold">

                                                Empty Cart

                                            </h2>

                                            <p className="text-gray-400 mt-5 text-lg leading-8 max-w-[320px]">

                                                Add delicious premium meals
                                                to begin your luxury dining
                                                experience.

                                            </p>

                                        </div>

                                    )

                                    : (

                                       <div className="space-y-7 pb-6">

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
                                                                key={
                                                                    item.id
                                                                }
                                                                whileHover={{
                                                                    y: -3
                                                                }}
className="group bg-white/[0.04] border border-white/10 rounded-[35px] p-6 md:p-7 backdrop-blur-2xl hover:border-violet-500/20 duration-500"                                                            >

                                                               <div className="flex flex-col sm:flex-row gap-6 md:gap-7 items-start">

                                                                    {/* Image */}
                                                                    <div className="relative overflow-hidden rounded-[28px]">

                                                                        <img
                                                                            src={
                                                                                image
                                                                            }
                                                                            onError={(e)=>{

                                                                                e.target.src =
                                                                                FALLBACK_IMAGE;
                                                                            }}
                                                                            alt=""
                                                                                       className="w-full sm:w-36 h-[220px] sm:h-36 md:w-40 md:h-40 object-cover group-hover:scale-110 duration-[3000ms]"                                                                       />

                                                                    </div>

                                                                    {/* Content */}
                                                                    <div className="flex-1">

                                                                        <div className="flex justify-between items-start">

                                                                            <div>

                                                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm mb-3">

                                                                                    <Sparkles
                                                                                        size={14}
                                                                                    />

                                                                                    Premium

                                                                                </div>

                                                                                <h3 className="text-white text-2xl font-bold capitalize">

                                                                                    {
                                                                                        item.food_name
                                                                                    }

                                                                                </h3>

                                                                                <p className="text-violet-400 font-semibold mt-2 text-lg">

                                                                                    ₹
                                                                                    {
                                                                                        item.price
                                                                                    }

                                                                                </p>

                                                                            </div>

                                                                            {/* Delete */}
                                                                            <button
                                                                                onClick={() =>
                                                                                    decreaseQty(
                                                                                        item.id
                                                                                    )
                                                                                }
                                                                                className="w-11 h-11 rounded-2xl bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center duration-300"
                                                                            >

                                                                                <Trash2
                                                                                    className="text-red-400"
                                                                                    size={20}
                                                                                />

                                                                            </button>

                                                                        </div>

                                                                        {/* Bottom */}
                                                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mt-7">

                                                                            {/* Qty */}
                                                                            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-[20px] px-3 py-2">

                                                                                <button
                                                                                    onClick={() =>
                                                                                        decreaseQty(
                                                                                            item.id
                                                                                        )
                                                                                    }
                                                                                    className="w-10 h-10 rounded-2xl bg-red-500 hover:scale-105 duration-300 text-white flex items-center justify-center"
                                                                                >

                                                                                    <Minus
                                                                                        size={18}
                                                                                    />

                                                                                </button>

                                                                                <span className="text-white font-bold text-xl w-8 text-center">

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
                                                                                    className="w-10 h-10 rounded-2xl bg-green-500 hover:scale-105 duration-300 text-white flex items-center justify-center"
                                                                                >

                                                                                    <Plus
                                                                                        size={18}
                                                                                    />

                                                                                </button>

                                                                            </div>

                                                                            {/* Total */}
                                                                            <h2 className="text-white text-2xl font-bold">

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

                                    <div className="border-t border-white/10 p-6 bg-[#1b152a]/95 backdrop-blur-3xl sticky bottom-0 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.35)]">

                                        {/* Payment */}
                                        <div className="mb-6">

                                            <label className="text-white font-semibold text-lg">

                                                Payment Method

                                            </label>

                                            <select
                                                value={payment}
                                                onChange={(e)=>
                                                    setPayment(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full mt-4 bg-[#231b38] border border-white/10 rounded-[22px] p-5 text-white outline-none focus:border-violet-500 duration-300"
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

                                        </div>

                                        {/* Summary */}
                                        <div className="bg-white/[0.04] border border-white/10 rounded-[30px] p-5 space-y-4">

                                            <div className="flex justify-between text-gray-400 text-lg">

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

                                            <div className="flex justify-between text-gray-400 text-lg">

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

                                            <div className="flex justify-between text-white text-3xl font-bold pt-4 border-t border-white/10">

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

                                        {/* Buttons */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                                            <button
                                                onClick={
                                                    clearCart
                                                }
                                                className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 py-5 rounded-[22px] text-red-400 font-bold duration-300"
                                            >

                                                Clear Cart

                                            </button>

                                            <motion.button
                                                whileTap={{
                                                    scale: 0.97
                                                }}
                                                whileHover={{
                                                    scale: 1.02
                                                }}
                                                onClick={
                                                    handleOrder
                                                }
                                                disabled={
                                                    loading
                                                }
                                                className="bg-gradient-to-r from-violet-600 via-purple-700 to-fuchsia-700 hover:from-violet-500 hover:to-fuchsia-600 py-5 rounded-[22px] text-white text-lg font-bold shadow-[0_0_35px_rgba(124,58,237,0.35)] duration-300"
                                            >

                                                {
                                                    loading
                                                    ? "Ordering..."
                                                    : "Place Order →"
                                                }

                                            </motion.button>

                                        </div>

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