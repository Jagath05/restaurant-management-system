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
    Users
} from "lucide-react";

import AdminLayout
from "../../layout/AdminLayout";

const API_BASE =
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api";

export default function TableManagement() {

    const [tables,
        setTables]
        =
        useState([]);

    const [search,
        setSearch]
        =
        useState("");

    const [statusFilter,
        setStatusFilter]
        =
        useState("All");

    const [loading,
        setLoading]
        =
        useState(true);

    useEffect(() => {

        fetchTables();

        const interval =
            setInterval(
                fetchTables,
                5000
            );

        return () =>
            clearInterval(
                interval
            );

    }, []);

    const fetchTables =
        async () => {

            try {

                const response =
                    await fetch(
`${API_BASE}/tables/getTables.php`
                    );

                const data =
                    await response.json();

                setTables(
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

    const updateStatus =
        async (
            id,
            status
        ) => {

            try {

                await fetch(
`${API_BASE}/tables/updateTableStatus.php`,
                    {
                        method:
                            "POST",

                        headers:{
                            "Content-Type":
                            "application/json"
                        },

                        body:
                        JSON.stringify({
                            id,
                            status
                        })
                    }
                );

                fetchTables();

            } catch(error){

                console.log(
                    error
                );
            }
        };

    const getColor =
        (status) => {

            switch(status){

                case "Available":
                    return
"bg-green-500/20 text-green-400 border-green-500/20";

                case "Reserved":
                    return
"bg-yellow-500/20 text-yellow-400 border-yellow-500/20";

                case "Occupied":
                    return
"bg-red-500/20 text-red-400 border-red-500/20";

                case "Maintenance":
                    return
"bg-gray-500/20 text-gray-400 border-gray-500/20";

                default:
                    return
"bg-white/10 text-white";
            }
        };

    const filteredTables =
        useMemo(() => {

            return tables.filter(
                table => {

                    const searchMatch =
                        table.table_number
                        ?.toString()
                        .includes(
                            search
                        );

                    const statusMatch =
                        statusFilter ===
                        "All"

                        ||

                        table.status ===
                        statusFilter;

                    return (
                        searchMatch
                        &&
                        statusMatch
                    );
                }
            );

        },[
            tables,
            search,
            statusFilter
        ]);
            return (

        <AdminLayout>

            <div className="space-y-8">

                {/* Header */}
                <div>

                    <h1 className="text-white text-4xl md:text-6xl font-bold">

                        Table Management

                    </h1>

                    <p className="text-gray-400 mt-3 text-lg">

                        Realtime table monitoring

                    </p>

                </div>

                {/* Search + Filter */}
                <div className="bg-white/5 border border-white/10 rounded-[35px] p-6 backdrop-blur-xl">

                    {/* Search */}
                    <div className="flex items-center bg-[#231b38] rounded-2xl px-5 py-4">

                        <Search
                            className="text-violet-400"
                            size={20}
                        />

                        <input
                            type="text"
                            placeholder="Search table..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            className="bg-transparent outline-none text-white ml-4 w-full"
                        />

                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3 mt-6">

                        {[
                            "All",
                            "Available",
                            "Reserved",
                            "Occupied",
                            "Maintenance"
                        ].map(item => (

                            <button
                                type="button"
                                key={item}
                                onClick={() =>
                                    setStatusFilter(
                                        item
                                    )
                                }
                                className={`px-5 py-3 rounded-2xl border duration-300
                                ${
                                    statusFilter === item
                                    ? "bg-violet-600 border-violet-500 text-white"
                                    : "bg-white/5 border-white/10 text-gray-300"
                                }`}
                            >

                                {item}

                            </button>
                        ))}

                    </div>

                </div>

                {/* Cards */}
                {
                    loading

                    ? (

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                            {
                                [...Array(6)].map(
                                    (_, i) => (

                                        <div
                                            key={i}
                                            className="h-[300px] rounded-[35px] bg-white/5 animate-pulse"
                                        />
                                    )
                                )
                            }

                        </div>

                    )

                    : (

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                            {
                                filteredTables.map(
                                    (
                                        table,
                                        index
                                    ) => (

                                        <motion.div
                                            key={table.id}
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
                                            className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl hover:border-violet-500/20 duration-300"
                                        >

                                            {/* Top */}
                                            <div className="flex justify-between items-start">

                                                <div>

                                                    <h2 className="text-white text-4xl font-bold">

                                                        Table {
                                                            table.table_number
                                                        }

                                                    </h2>

                                                    <div className="flex items-center gap-2 mt-4 text-gray-400">

                                                        <Users
                                                            size={18}
                                                            className="text-violet-400"
                                                        />

                                                        Capacity:
                                                        {" "}
                                                        {
                                                            table.capacity
                                                        }

                                                    </div>

                                                </div>

                                                <div
                                                    className={`px-5 py-3 rounded-2xl border font-semibold text-center ${getColor(table.status)}`}
                                                >

                                                    {
                                                        table.status
                                                    }

                                                </div>

                                            </div>

                                            {/* Buttons */}
                                            <div className="grid grid-cols-2 gap-3 mt-8">

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            table.id,
                                                            "Available"
                                                        )
                                                    }
                                                    className="bg-green-600 hover:bg-green-700 py-4 rounded-2xl text-white font-medium duration-300"
                                                >

                                                    Available

                                                </button>

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            table.id,
                                                            "Reserved"
                                                        )
                                                    }
                                                    className="bg-yellow-500 hover:bg-yellow-600 py-4 rounded-2xl text-white font-medium duration-300"
                                                >

                                                    Reserved

                                                </button>

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            table.id,
                                                            "Occupied"
                                                        )
                                                    }
                                                    className="bg-red-600 hover:bg-red-700 py-4 rounded-2xl text-white font-medium duration-300"
                                                >

                                                    Occupied

                                                </button>

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            table.id,
                                                            "Maintenance"
                                                        )
                                                    }
                                                    className="bg-gray-600 hover:bg-gray-700 py-4 rounded-2xl text-white font-medium duration-300"
                                                >

                                                    Maintenance

                                                </button>

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