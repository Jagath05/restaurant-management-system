import React, {
    useEffect,
    useState
} from "react";

import {
    motion
} from "framer-motion";

import {
    ShoppingBag,
    CalendarDays,
    UtensilsCrossed,
    Armchair,
    Clock,
    ClipboardList,
    TableProperties
} from "lucide-react";

import AdminLayout
from "../../layout/AdminLayout";

export default function Dashboard() {

    const [orders,
        setOrders] =
        useState([]);

    const [foods,
        setFoods] =
        useState([]);

    const [tables,
        setTables] =
        useState([]);

    const [reservations,
        setReservations] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    const API_BASE =
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api";

    useEffect(() => {

        fetchDashboard();

        const interval =
            setInterval(
                fetchDashboard,
                5000
            );

        return () =>
            clearInterval(
                interval
            );

    }, []);

    const fetchDashboard =
        async () => {

            try {

                const [
                    ordersRes,
                    reservationsRes,
                    foodsRes,
                    tablesRes
                ] = await Promise.all([
                    fetch(
`${API_BASE}/orders/getOrders.php`
                    ),
                    fetch(
`${API_BASE}/reservations/getReservations.php`
                    ),
                    fetch(
`${API_BASE}/menu/getFoods.php`
                    ),
                    fetch(
`${API_BASE}/tables/getTables.php`
                    )
                ]);

                const ordersData =
                    await ordersRes.json();

                const reservationsData =
                    await reservationsRes.json();

                const foodsData =
                    await foodsRes.json();

                const tablesData =
                    await tablesRes.json();

                setOrders(
                    ordersData
                );

                setReservations(
                    reservationsData
                );

                setFoods(
                    foodsData
                );

                setTables(
                    tablesData
                );

            } catch (error) {

                console.log(
                    "Dashboard Error:",
                    error
                );

            } finally {

                setLoading(
                    false
                );
            }
        };

    const stats = [
        {
            title:
                "Orders",

            count:
                orders.length,

            icon:
                ShoppingBag
        },

        {
            title:
                "Reservations",

            count:
                reservations.length,

            icon:
                CalendarDays
        },

        {
            title:
                "Foods",

            count:
                foods.length,

            icon:
                UtensilsCrossed
        },

        {
            title:
                "Tables",

            count:
                tables.length,

            icon:
                Armchair
        }
    ];

    const getStatusColor =
        (status) => {

            switch(
                status
            ){

                case "Pending":

                    return
"bg-yellow-500/20 text-yellow-400";

                case "Preparing":

                    return
"bg-blue-500/20 text-blue-400";

                case "Completed":

                    return
"bg-green-500/20 text-green-400";

                case "Cancelled":

                    return
"bg-red-500/20 text-red-400";

                default:

                    return
"bg-gray-500/20 text-gray-400";
            }
        };

    return (

        <AdminLayout>

            <div className="space-y-10">

                {/* Header */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                >

                    <h1 className="text-white text-4xl md:text-6xl font-bold">

                        Dashboard

                    </h1>

                    <p className="text-gray-400 mt-3 text-lg">

                        Welcome back Admin 👋

                    </p>

                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                    {
                        stats.map(
                            (
                                item,
                                index
                            ) => {

                                const Icon =
                                    item.icon;

                                return (

                                    <motion.div
                                        key={
                                            item.title
                                        }
                                        initial={{
                                            opacity: 0,
                                            y: 40
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0
                                        }}
                                        transition={{
                                            delay:
                                                index *
                                                0.1
                                        }}
                                        className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl hover:border-violet-500/30 duration-300"
                                    >

                                        <div className="flex justify-between items-center">

                                            <div>

                                                <p className="text-gray-400 text-lg">

                                                    {
                                                        item.title
                                                    }

                                                </p>

                                                <h1 className="text-white text-5xl font-bold mt-3">

                                                    {
                                                        item.count
                                                    }

                                                </h1>

                                            </div>

                                            <div className="w-16 h-16 rounded-3xl bg-violet-500/20 flex items-center justify-center">

                                                <Icon
                                                    className="text-violet-400"
                                                    size={30}
                                                />

                                            </div>

                                        </div>

                                    </motion.div>
                                );
                            }
                        )
                    }

                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-5">

                    <button className="bg-violet-600 hover:bg-violet-700 rounded-3xl p-5 text-white font-semibold duration-300">

                        Manage Orders

                    </button>

                    <button className="bg-[#252035] hover:bg-[#2d2740] rounded-3xl p-5 text-white font-semibold duration-300">

                        Manage Menu

                    </button>

                    <button className="bg-[#252035] hover:bg-[#2d2740] rounded-3xl p-5 text-white font-semibold duration-300">

                        Manage Tables

                    </button>

                </div>

                {/* Orders Table */}
                <div className="bg-white/5 border border-white/10 rounded-[35px] backdrop-blur-xl overflow-hidden">

                    <div className="p-8 border-b border-white/10 flex items-center gap-4">

                        <ClipboardList
                            className="text-violet-400"
                        />

                        <h2 className="text-white text-3xl font-bold">

                            All Orders

                        </h2>

                    </div>

                    <div className="overflow-auto max-h-[700px]">

                        <table className="w-full min-w-[900px]">

                            <thead>

                                <tr className="text-left text-gray-400 border-b border-white/10">

                                    <th className="p-6">

                                        Order ID

                                    </th>

                                    <th className="p-6">

                                        Table

                                    </th>

                                    <th className="p-6">

                                        Payment

                                    </th>

                                    <th className="p-6">

                                        Total

                                    </th>

                                    <th className="p-6">

                                        Status

                                    </th>

                                    <th className="p-6">

                                        Date

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    orders.map(
                                        order => (

                                            <tr
                                                key={
                                                    order.id
                                                }
                                                className="border-b border-white/5 hover:bg-white/5 duration-300"
                                            >

                                                <td className="p-6 text-white font-medium">

                                                    {
                                                        order.order_number
                                                    }

                                                </td>

                                                <td className="p-6 text-gray-300">

                                                    Table {
                                                        order.table_number
                                                    }

                                                </td>

                                                <td className="p-6">

                                                    <span className={`px-4 py-2 rounded-full text-sm
                                                    ${
                                                        order.payment_status ===
                                                        "Pending"
                                                        ? "bg-red-500/20 text-red-400"
                                                        : "bg-green-500/20 text-green-400"
                                                    }`}>

                                                        {
                                                            order.payment_method
                                                        }

                                                    </span>

                                                </td>

                                                <td className="p-6 text-violet-400 font-bold">

                                                    ₹{
                                                        order.total
                                                    }

                                                </td>

                                                <td className="p-6">

                                                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>

                                                        {
                                                            order.status
                                                        }

                                                    </span>

                                                </td>

                                                <td className="p-6 text-gray-400">

                                                    {
                                                        order.created_at
                                                    }

                                                </td>

                                            </tr>
                                        )
                                    )
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}