import React, {
    useEffect,
    useState
} from "react";

import {
    motion
} from "framer-motion";

import {
    Clock3,
    ChefHat,
    CircleCheckBig,
    Sparkles,
    ShoppingBag
} from "lucide-react";

import Navbar
from "../components/Navbar";

const API_BASE =
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api";

const FALLBACK_IMAGE =
"https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80";

export default function OrderStatus() {

    const [orders,
        setOrders]
        =
        useState([]);

    const [loading,
        setLoading]
        =
        useState(true);

    const tableNumber =
        localStorage.getItem(
            "tableNumber"
        );

    useEffect(() => {

        fetchOrders();

        const interval =
            setInterval(
                fetchOrders,
                2000
            );

        return () =>
            clearInterval(
                interval
            );

    }, []);

    const fetchOrders =
        async () => {

            if(!tableNumber){

                setLoading(
                    false
                );

                return;
            }

            try {

                const response =
                    await fetch(
`${API_BASE}/orders/getCustomerOrderStatus.php?tableNumber=${tableNumber}`
                    );

                const data =
                    await response.json();

                setOrders(
                    Array.isArray(data)
                    ? data
                    : []
                );

            } catch(error){

                console.log(
                    error
                );

            } finally {

                setLoading(
                    false
                );
            }
        };

    /* FIXED STATUS COLORS */
    const getStatusColor =
        (status)=>{

            switch(status){

                case "Pending":
                    return "text-yellow-300";

                case "Preparing":
                    return "text-orange-400";

                case "Completed":
                    return "text-green-400";

                case "Cancelled":
                    return "text-red-400";

                default:
                    return "text-white";
            }
        };

    const getStatusBg =
        (status)=>{

            switch(status){

                case "Pending":
                    return
"bg-yellow-500/10 border-yellow-500/20";

                case "Preparing":
                    return
"bg-orange-500/10 border-orange-500/20";

                case "Completed":
                    return
"bg-green-500/10 border-green-500/20";

                case "Cancelled":
                    return
"bg-red-500/10 border-red-500/20";

                default:
                    return
"bg-white/5 border-white/10";
            }
        };

    const getProgress =
        (status) => {

            switch(status){

                case "Pending":
                    return 33;

                case "Preparing":
                    return 66;

                case "Completed":
                    return 100;

                default:
                    return 0;
            }
        };

    return (

        <>

            <Navbar />

            <section className="min-h-screen bg-[#181325] px-5 py-28 relative overflow-hidden">

                {/* Glow */}
                <div className="absolute top-[-150px] left-[-150px] w-[350px] h-[350px] bg-violet-600/20 blur-[120px] rounded-full" />

                <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] bg-fuchsia-500/20 blur-[120px] rounded-full" />

                <div className="max-w-7xl mx-auto relative z-10">

                    {/* Hero */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 40
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 0.5
                        }}
                        className="text-center"
                    >

                        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 mb-8">

                            <Sparkles
                                size={18}
                            />

                            Live Order Tracking

                        </div>

                        <h1 className="text-white text-5xl md:text-7xl font-bold">

                            Track Your

                            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">

                                {" "}
                                Order

                            </span>

                        </h1>

                        <p className="text-gray-400 text-lg md:text-2xl mt-6">

                            Table
                            {" "}
                            <span className="text-violet-400 font-bold">

                                {
                                    tableNumber
                                }

                            </span>

                        </p>

                    </motion.div>

                    {/* Loading */}
                    {
                        loading && (

                            <div className="grid gap-8 mt-16">

                                {
                                    [...Array(3)].map(
                                        (_, i) => (

                                            <div
                                                key={i}
                                                className="h-[350px] rounded-[40px] bg-white/5 animate-pulse"
                                            />
                                        )
                                    )
                                }

                            </div>
                        )
                    }
                                        {
                        !loading &&
                        orders.length === 0 ? (

                            <motion.div
                                initial={{
                                    opacity: 0
                                }}
                                animate={{
                                    opacity: 1
                                }}
                                className="text-center mt-24 bg-white/5 border border-white/10 rounded-[45px] p-12 backdrop-blur-2xl"
                            >

                                <div className="w-32 h-32 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-8">

                                    <ShoppingBag
                                        size={60}
                                        className="text-violet-400"
                                    />

                                </div>

                                <h2 className="text-white text-5xl font-bold">

                                    No Active Orders

                                </h2>

                                <p className="text-gray-400 mt-5 text-lg">

                                    Order delicious meals to track
                                    your food in real-time.

                                </p>

                            </motion.div>

                        ) : (

                            <div className="space-y-10 mt-20">

                                {
                                    orders.map(
                                        (
                                            order,
                                            orderIndex
                                        ) => (

                                            <motion.div
                                                key={
                                                    order.id
                                                }
                                                initial={{
                                                    opacity: 0,
                                                    y: 50
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0
                                                }}
                                                transition={{
                                                    delay:
                                                    orderIndex *
                                                    0.08
                                                }}
                                                className="bg-white/[0.04] border border-white/10 rounded-[40px] p-7 md:p-9 backdrop-blur-3xl shadow-[0_0_50px_rgba(124,58,237,0.08)]"
                                            >

                                                {/* Top */}
                                                <div className="flex flex-col lg:flex-row justify-between gap-8">

                                                    <div>

                                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 mb-5">

                                                            <Sparkles
                                                                size={16}
                                                            />

                                                            Live Tracking

                                                        </div>

                                                        <h2 className="text-white text-3xl md:text-4xl font-bold">

                                                            Order #
                                                            {
                                                                order.order_number
                                                                || order.id
                                                            }

                                                        </h2>

                                                        <p className="text-gray-400 mt-3">

                                                            {
                                                                order.created_at
                                                            }

                                                        </p>

                                                        <p className="text-violet-400 mt-4 font-semibold text-lg">

                                                            Payment:
                                                            {" "}
                                                            {
                                                                order.payment_method
                                                            }

                                                        </p>

                                                    </div>

                                                    <div className="text-left lg:text-right">

                                                        <h2 className="text-violet-400 text-4xl md:text-5xl font-bold">

                                                            ₹
                                                            {
                                                                order.total
                                                            }

                                                        </h2>

                                                        <p className="text-gray-400 mt-3 text-lg">

                                                            {
                                                                order.payment_status
                                                                || "Pending"
                                                            }

                                                        </p>

                                                    </div>

                                                </div>

                                                {/* Items */}
                                                <div className="space-y-5 mt-10">

                                                    {
                                                        order.items.map(
                                                            (
                                                                item,
                                                                index
                                                            ) => {

                                                                const image =
item.image
? `https://restaurant-jagath.infinityfreeapp.com/restaurant-api/uploads/images/${item.image}`
: FALLBACK_IMAGE;

                                                                return (

                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="bg-[#231b38] border border-white/10 rounded-[35px] p-5"
                                                                    >

                                                                        <div className="flex flex-col md:flex-row justify-between gap-6">

                                                                            {/* Left */}
                                                                            <div className="flex gap-5">

                                                                                {/* Small Food Image */}
                                                                                <img
                                                                                    src={
                                                                                        image
                                                                                    }
                                                                                    onError={(e)=>{

                                                                                        e.target.src =
                                                                                        FALLBACK_IMAGE;
                                                                                    }}
                                                                                    alt=""
                                                                                    className="w-24 h-24 rounded-[25px] object-cover"
                                                                                />

                                                                                <div>

                                                                                    <h3 className="text-white text-2xl font-bold">

                                                                                        {
                                                                                            item.food_name
                                                                                        }

                                                                                    </h3>

                                                                                    <p className="text-gray-400 mt-2">

                                                                                        Qty:
                                                                                        {" "}
                                                                                        {
                                                                                            item.quantity
                                                                                        }

                                                                                    </p>

                                                                                    {/* FIXED STATUS */}
                                                                                    <div className={`inline-flex mt-4 px-4 py-2 rounded-full border font-semibold ${getStatusColor(item.status)} ${getStatusBg(item.status)}`}>

                                                                                        {
                                                                                            item.status
                                                                                        }

                                                                                    </div>

                                                                                </div>

                                                                            </div>

                                                                            {/* Right */}
                                                                            <div className="text-left md:text-right">

                                                                                <h3 className="text-violet-400 text-3xl font-bold">

                                                                                    ₹
                                                                                    {
                                                                                        item.price *
                                                                                        item.quantity
                                                                                    }

                                                                                </h3>

                                                                            </div>

                                                                        </div>
                                                                                                                                                {/* Timeline */}
                                                                        <div className="mt-7">

                                                                            <div className="flex justify-between text-sm md:text-base text-gray-300 mb-4">

                                                                                <div className="flex items-center gap-2">

                                                                                    <Clock3
                                                                                        size={18}
                                                                                        className="text-yellow-400"
                                                                                    />

                                                                                    Pending

                                                                                </div>

                                                                                <div className="flex items-center gap-2">

                                                                                    <ChefHat
                                                                                        size={18}
                                                                                        className="text-orange-400"
                                                                                    />

                                                                                    Preparing

                                                                                </div>

                                                                                <div className="flex items-center gap-2">

                                                                                    <CircleCheckBig
                                                                                        size={18}
                                                                                        className="text-green-400"
                                                                                    />

                                                                                    Completed

                                                                                </div>

                                                                            </div>

                                                                            {/* Progress */}
                                                                            <div className="relative w-full bg-white/10 rounded-full h-4 overflow-hidden">

                                                                                <motion.div
                                                                                    initial={{
                                                                                        width: 0
                                                                                    }}
                                                                                    animate={{
                                                                                        width:
`${getProgress(item.status)}%`
                                                                                    }}
                                                                                    transition={{
                                                                                        duration: 0.8
                                                                                    }}
                                                                                    className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full"
                                                                                />

                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                );
                                                            }
                                                        )
                                                    }

                                                </div>

                                            </motion.div>
                                        )
                                    )
                                }

                            </div>
                        )
                    }

                </div>

            </section>

        </>
    );
}