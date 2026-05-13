import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    motion
} from "framer-motion";

import {
    Search,
    Clock,
    Receipt
} from "lucide-react";

import AdminLayout
from "../../layout/AdminLayout";

const API_URL =
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api/orders";

export default function ManageOrders() {

    const [orders,
        setOrders] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    const [search,
        setSearch] =
        useState("");

    const [statusFilter,
        setStatusFilter] =
        useState("All");

    useEffect(() => {

        fetchOrders();

        const interval =
            setInterval(
                fetchOrders,
                5000
            );

        return () =>
            clearInterval(
                interval
            );

    }, []);

    const fetchOrders =
        async () => {

            try {

                const response =
                    await fetch(
`${API_URL}/getOrders.php`
                    );

                const data =
                    await response.json();

                setOrders(
                    data
                );

            } catch (
                error
            ) {

                console.log(
                    error
                );

            } finally {

                setLoading(
                    false
                );
            }
        };

    const updateFoodStatus =
        async (
            orderId,
            itemIndex,
            status
        ) => {

            try {

                await fetch(
`${API_URL}/updateOrderStatus.php`,
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
                                    orderId,
                                    itemIndex,
                                    status
                                }
                            )
                    }
                );

                fetchOrders();

            } catch (
                error
            ) {

                console.log(
                    error
                );
            }
        };

    const getStatusColor =
        (status) => {

            switch (
                status
            ) {

                case "Pending":

                    return
"bg-yellow-500/20 text-yellow-400 border-yellow-500/20";

                case "Preparing":

                    return
"bg-blue-500/20 text-blue-400 border-blue-500/20";

                case "Completed":

                    return
"bg-green-500/20 text-green-400 border-green-500/20";

                case "Cancelled":

                    return
"bg-red-500/20 text-red-400 border-red-500/20";

                default:

                    return
"bg-gray-500/20 text-gray-400 border-gray-500/20";
            }
        };

    const filteredOrders =
        useMemo(() => {

            return orders.filter(
                order => {

                    const searchMatch =
                        order.order_number
                            ?.toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )

                        ||

                        order.table_number
                            ?.toString()
                            .includes(
                                search
                            );

                    const statusMatch =
                        statusFilter ===
                        "All"

                        ||

                        order.status ===
                        statusFilter;

                    return (
                        searchMatch &&
                        statusMatch
                    );
                }
            );

        }, [
            orders,
            search,
            statusFilter
        ]);

    const filters = [
        "All",
        "Pending",
        "Preparing",
        "Completed",
        "Cancelled"
    ];

    return (

        <AdminLayout>

            <div className="space-y-8">

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

                        Manage Orders

                    </h1>

                    <p className="text-gray-400 mt-3 text-lg">

                        Live kitchen order tracking

                    </p>

                </motion.div>

                {/* Filters */}
                <div className="bg-white/5 border border-white/10 rounded-[35px] p-6 backdrop-blur-xl">

                    {/* Search */}
                    <div className="flex items-center bg-[#231b38] rounded-2xl px-5 py-4 border border-white/10">

                        <Search
                            size={20}
                            className="text-violet-400"
                        />

                        <input
                            type="text"
                            placeholder="Search order or table..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            className="bg-transparent outline-none text-white ml-4 w-full placeholder:text-gray-500"
                        />

                    </div>

                    {/* Status Filters */}
                    <div className="flex flex-wrap gap-3 mt-6">

                        {
                            filters.map(
                                item => (

                                    <button
                                        key={item}
                                        onClick={() =>
                                            setStatusFilter(
                                                item
                                            )
                                        }
                                        className={`px-5 py-3 rounded-2xl border duration-300
                                        ${
                                            statusFilter ===
                                            item

                                            ? "bg-violet-600 border-violet-500 text-white"

                                            : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                                        }`}
                                    >

                                        {item}

                                    </button>
                                )
                            )
                        }

                    </div>

                </div>

                {/* Orders */}
                {
                    loading

                    ? (

                        <div className="grid gap-6">

                            {
                                [...Array(5)].map(
                                    (_, i) => (

                                        <div
                                            key={i}
                                            className="h-[280px] rounded-[35px] bg-white/5 animate-pulse"
                                        />
                                    )
                                )
                            }

                        </div>

                    )

                    : (

                        <div className="space-y-6">

                            {
                                filteredOrders.map(
                                    (
                                        order,
                                        index
                                    ) => (

                                        <motion.div
                                            key={order.id}
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
                                                    0.05
                                            }}
                                            className="bg-white/5 border border-white/10 rounded-[35px] p-6 md:p-8 backdrop-blur-xl"
                                        >

                                            {/* Top */}
                                            <div className="flex flex-col lg:flex-row justify-between gap-5">

                                                <div>

                                                    <div className="flex items-center gap-3 flex-wrap">

                                                        <Receipt
                                                            className="text-violet-400"
                                                        />

                                                        <h2 className="text-white text-2xl md:text-3xl font-bold">

                                                            {
                                                                order.order_number
                                                            }

                                                        </h2>

                                                    </div>

                                                    <p className="text-gray-400 mt-3">

                                                        Table {
                                                            order.table_number
                                                        }

                                                    </p>

                                                    <div className="flex items-center gap-2 mt-3 text-gray-500 text-sm">

                                                        <Clock
                                                            size={16}
                                                        />

                                                        {
                                                            order.created_at
                                                        }

                                                    </div>

                                                </div>

                                                <div className="flex flex-wrap gap-3 h-fit">

                                                    <span className={`px-5 py-3 rounded-2xl border font-medium ${getStatusColor(order.status)}`}>

                                                        {
                                                            order.status
                                                        }

                                                    </span>

                                                    <span className="px-5 py-3 rounded-2xl bg-green-500/20 text-green-400 border border-green-500/20">

                                                        {
                                                            order.payment_method
                                                        }

                                                    </span>

                                                </div>

                                            </div>

                                            {/* Items */}
                                            <div className="mt-8 grid gap-5">

                                                {
                                                    order.items?.map(
                                                        (
                                                            item,
                                                            itemIndex
                                                        ) => (

                                                            <div
                                                                key={itemIndex}
                                                                className="bg-[#231b38] rounded-[30px] p-5 border border-white/5"
                                                            >

                                                                <div className="flex flex-col lg:flex-row justify-between gap-5">

                                                                    <div>

                                                                        <h3 className="text-white text-xl font-bold">

                                                                            {
                                                                                item.food_name
                                                                            }

                                                                            {" "}x
                                                                            {
                                                                                item.quantity
                                                                            }

                                                                        </h3>

                                                                        <p className="text-violet-400 mt-2 font-semibold">

                                                                            ₹
                                                                            {
                                                                                item.price *
                                                                                item.quantity
                                                                            }

                                                                        </p>

                                                                    </div>

                                                                    <div className="flex flex-wrap gap-3">

                                                                        {
                                                                            [
                                                                                "Preparing",
                                                                                "Completed",
                                                                                "Cancelled"
                                                                            ].map(
                                                                                status => (

                                                                                    <button
                                                                                        key={status}
                                                                                        onClick={() =>
                                                                                            updateFoodStatus(
                                                                                                order.id,
                                                                                                itemIndex,
                                                                                                status
                                                                                            )
                                                                                        }
                                                                                        className={`px-5 py-3 rounded-2xl text-white font-medium duration-300
                                                                                        ${
                                                                                            status === "Preparing"
                                                                                            ? "bg-yellow-500 hover:bg-yellow-600"

                                                                                            : status === "Completed"
                                                                                            ? "bg-green-600 hover:bg-green-700"

                                                                                            : "bg-red-600 hover:bg-red-700"
                                                                                        }`}
                                                                                    >

                                                                                        {
                                                                                            status
                                                                                        }

                                                                                    </button>
                                                                                )
                                                                            )
                                                                        }

                                                                    </div>

                                                                </div>

                                                            </div>
                                                        )
                                                    )
                                                }

                                            </div>

                                            {/* Total */}
                                            <div className="border-t border-white/10 mt-8 pt-6 flex justify-between items-center">

                                                <span className="text-gray-400 text-lg">

                                                    Total

                                                </span>

                                                <h2 className="text-violet-400 text-3xl font-bold">

                                                    ₹{
                                                        order.total
                                                    }

                                                </h2>

                                            </div>

                                        </motion.div>
                                    )
                                )
                            }

                        </div>
                    )
                }

            </div>

        </AdminLayout>
    );
}