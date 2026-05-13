import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    motion
} from "framer-motion";

import {
    Clock3,
    ChefHat,
    CircleCheckBig
} from "lucide-react";

import Navbar
from "../components/Navbar";

const API_BASE =
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api";

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
                3000
            );

        return () =>
            clearInterval(
                interval
            );

    }, []);

    const fetchOrders =
        async () => {

            if(
                !tableNumber
            ){

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

    const getStatusColor =
        (status)=>{

            switch(status){

                case "Pending":
                    return
"text-yellow-400";

                case "Preparing":
                    return
"text-orange-400";

                case "Completed":
                    return
"text-green-400";

                case "Cancelled":
                    return
"text-red-400";

                default:
                    return
"text-white";
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

                {/* Glow Background */}
                <div className="absolute top-[-150px] left-[-150px] w-[350px] h-[350px] bg-violet-600/20 blur-[120px] rounded-full" />

                <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] bg-fuchsia-500/20 blur-[120px] rounded-full" />

                <div className="max-w-6xl mx-auto relative z-10">

                    {/* Header */}
                    <div className="text-center">

                        <h1 className="text-white text-4xl md:text-6xl font-bold">

                            🍽️ Order Tracking

                        </h1>

                        <p className="text-violet-400 text-xl md:text-2xl mt-4">

                            Table {
                                tableNumber
                            }

                        </p>

                    </div>

                    {
                        loading ? (

                            <div className="grid md:grid-cols-2 gap-8 mt-16">

                                {
                                    [...Array(3)].map(
                                        (_, i) => (

                                            <div
                                                key={i}
                                                className="h-[350px] rounded-[35px] bg-white/5 animate-pulse"
                                            />
                                        )
                                    )
                                }

                            </div>

                        )

                        : orders.length === 0 ? (

                            <div className="text-center mt-24">

                                <h2 className="text-white text-4xl font-bold">

                                    No Active Orders

                                </h2>

                                <p className="text-gray-400 mt-4 text-lg">

                                    Order food to track status

                                </p>

                            </div>

                        )

                        : (

                            <div className="space-y-8 mt-16">

                                {
                                    orders.map(
                                        (
                                            order,
                                            orderIndex
                                        ) => (

                                            <motion.div
                                                key={order.id}
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
                                                        0.05
                                                }}
                                                className="bg-white/5 border border-white/10 rounded-[35px] p-6 md:p-8 shadow-2xl backdrop-blur-2xl"
                                            >

                                                {/* Top */}
                                                <div className="flex flex-col lg:flex-row justify-between gap-6">

                                                    <div>

                                                        <h2 className="text-white text-3xl font-bold">

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

                                                        <p className="text-violet-400 mt-3 font-semibold">

                                                            Payment:
                                                            {" "}
                                                            {
                                                                order.payment_method
                                                            }

                                                        </p>

                                                    </div>

                                                    <div className="text-right">

                                                        <h2 className="text-violet-400 text-4xl font-bold">

                                                            ₹{
                                                                order.total
                                                            }

                                                        </h2>

                                                        <p className="text-gray-400 mt-2">

                                                            {
                                                                order.payment_status
                                                                || "Pending"
                                                            }

                                                        </p>

                                                    </div>

                                                </div>

                                                {/* Food List */}
                                                <div className="space-y-5 mt-8">

                                                    {
                                                        order.items.map(
                                                            (
                                                                item,
                                                                index
                                                            ) => (

                                                                <div
                                                                    key={index}
                                                                    className="bg-[#231b38] rounded-[30px] border border-white/10 p-5"
                                                                >

                                                                    <div className="flex flex-col md:flex-row justify-between gap-5">

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

                                                                        </div>

                                                                        <div className="text-right">

                                                                            <h3 className="text-violet-400 text-2xl font-bold">

                                                                                ₹{
                                                                                    item.price *
                                                                                    item.quantity
                                                                                }

                                                                            </h3>

                                                                            <p
                                                                                className={`font-bold text-lg mt-3 ${getStatusColor(item.status)}`}
                                                                            >

                                                                                {
                                                                                    item.status
                                                                                }

                                                                            </p>

                                                                        </div>

                                                                    </div>

                                                                    {/* Progress */}
                                                                    <div className="mt-5">

                                                                        <div className="flex justify-between text-sm text-gray-400 mb-3">

                                                                            <div className="flex items-center gap-2">

                                                                                <Clock3
                                                                                    size={16}
                                                                                />

                                                                                Pending

                                                                            </div>

                                                                            <div className="flex items-center gap-2">

                                                                                <ChefHat
                                                                                    size={16}
                                                                                />

                                                                                Preparing

                                                                            </div>

                                                                            <div className="flex items-center gap-2">

                                                                                <CircleCheckBig
                                                                                    size={16}
                                                                                />

                                                                                Completed

                                                                            </div>

                                                                        </div>

                                                                        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">

                                                                            <motion.div
                                                                                initial={{
                                                                                    width: 0
                                                                                }}
                                                                                animate={{
                                                                                    width:
`${getProgress(item.status)}%`
                                                                                }}
                                                                                transition={{
                                                                                    duration: 0.5
                                                                                }}
                                                                                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                                                                            />

                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            )
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