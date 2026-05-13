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
    CalendarDays,
    Users,
    Phone,
    UtensilsCrossed
} from "lucide-react";

import AdminLayout
from "../../layout/AdminLayout";

const API_BASE =
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api";

export default function ManageReservations() {

    const [reservations,
        setReservations]
        =
        useState([]);

    const [selectedTables,
        setSelectedTables]
        =
        useState({});

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

        fetchReservations();

        const interval =
            setInterval(
                fetchReservations,
                5000
            );

        return () =>
            clearInterval(
                interval
            );

    }, []);

    const fetchReservations =
        async () => {

            try {

                const response =
                    await fetch(
`${API_BASE}/reservations/getReservations.php`
                    );

                const data =
                    await response.json();

                setReservations(
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

            const tableNumber =
                selectedTables[id]
                || null;

            if(
                status ===
                "Approved"
                &&
                !tableNumber
            ){

                alert(
                    "Please select a table"
                );

                return;
            }

            try {

                const response =
                    await fetch(
`${API_BASE}/reservations/updateReservationStatus.php`,
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
                                status,

                                table_number:
                                tableNumber
                            })
                        }
                    );

                const data =
                    await response.json();

                if(
                    data.success
                ){

                    fetchReservations();

                } else {

                    alert(
                        data.message
                    );
                }

            } catch(error){

                console.log(
                    error
                );
            }
        };

    const getStatusColor =
        (status) => {

            switch(status){

                case "Approved":
                    return
"bg-green-500/20 text-green-400 border-green-500/20";

                case "Rejected":
                    return
"bg-red-500/20 text-red-400 border-red-500/20";

                case "Completed":
                    return
"bg-violet-500/20 text-violet-400 border-violet-500/20";

                default:
                    return
"bg-yellow-500/20 text-yellow-400 border-yellow-500/20";
            }
        };

    const filteredReservations =
        useMemo(() => {

            return reservations.filter(
                item => {

                    const searchMatch =
                        item.customer_name
                        ?.toLowerCase()
                        .includes(
                            search
                            .toLowerCase()
                        )

                        ||

                        item.phone
                        ?.includes(
                            search
                        );

                    const statusMatch =
                        statusFilter ===
                        "All"

                        ||

                        item.status ===
                        statusFilter;

                    return (
                        searchMatch
                        &&
                        statusMatch
                    );
                }
            );

        },[
            reservations,
            search,
            statusFilter
        ]);

            return (

        <AdminLayout>

            <div className="space-y-8">

                {/* Header */}
                <div>

                    <h1 className="text-white text-4xl md:text-6xl font-bold">

                        Manage Reservations

                    </h1>

                    <p className="text-gray-400 mt-3 text-lg">

                        Realtime reservation management

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
                            placeholder="Search customer or phone..."
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
                            "Pending",
                            "Approved",
                            "Rejected",
                            "Completed"
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
                                filteredReservations.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <motion.div
                                            key={item.id}
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
                                            className="bg-white/5 border border-white/10 rounded-[35px] p-6 md:p-8 backdrop-blur-xl hover:border-violet-500/20 duration-300"
                                        >

                                            <div className="flex flex-col xl:flex-row justify-between gap-8">

                                                {/* Left */}
                                                <div>

                                                    <h2 className="text-white text-3xl font-bold">

                                                        {
                                                            item.customer_name
                                                        }

                                                    </h2>

                                                    <div className="grid sm:grid-cols-2 gap-5 mt-6 text-gray-300">

                                                        <div className="flex items-center gap-3">

                                                            <Phone
                                                                size={18}
                                                                className="text-violet-400"
                                                            />

                                                            {
                                                                item.phone
                                                            }

                                                        </div>

                                                        <div className="flex items-center gap-3">

                                                            <Users
                                                                size={18}
                                                                className="text-violet-400"
                                                            />

                                                            {
                                                                item.people_count
                                                            }
                                                            {" "}
                                                            Guests

                                                        </div>

                                                        <div className="flex items-center gap-3">

                                                            <CalendarDays
                                                                size={18}
                                                                className="text-violet-400"
                                                            />

                                                            {
                                                                item.reservation_date
                                                            }

                                                        </div>

                                                        <div className="flex items-center gap-3">

                                                            <Clock
                                                                size={18}
                                                                className="text-violet-400"
                                                            />

                                                            {
                                                                item.reservation_time
                                                            }

                                                        </div>

                                                        <div className="flex items-center gap-3">

                                                            <UtensilsCrossed
                                                                size={18}
                                                                className="text-violet-400"
                                                            />

                                                            Table:
                                                            {" "}

                                                            {
                                                                item.table_number
                                                                || "Not Assigned"
                                                            }

                                                        </div>

                                                        <div className="text-gray-300">

                                                            ⌛
                                                            {" "}
                                                            {
                                                                item.duration_hours
                                                            }
                                                            {" "}
                                                            Hour(s)

                                                        </div>

                                                    </div>

                                                </div>

                                                {/* Right */}
                                                <div className="flex flex-col gap-5 xl:w-[350px]">

                                                    {/* Status */}
                                                    <div
                                                        className={`px-5 py-4 rounded-2xl border text-center font-bold text-lg ${getStatusColor(item.status)}`}
                                                    >

                                                        {
                                                            item.status
                                                        }

                                                    </div>

                                                    {/* Select Table */}
                                                    <select
                                                        value={
                                                            selectedTables[item.id]
                                                            || ""
                                                        }

                                                        onChange={(e)=>

                                                            setSelectedTables({

                                                                ...selectedTables,

                                                                [item.id]:
                                                                e.target.value
                                                            })
                                                        }

                                                        className="bg-[#231b38] border border-white/10 rounded-2xl p-4 text-white outline-none"
                                                    >

                                                        <option value="">

                                                            Select Table

                                                        </option>

                                                        {
                                                            [...Array(10)].map(
                                                                (_, index) => (

                                                                    <option
                                                                        key={index}
                                                                        value={
                                                                            index + 1
                                                                        }
                                                                    >

                                                                        Table {
                                                                            index + 1
                                                                        }

                                                                    </option>
                                                                )
                                                            )
                                                        }

                                                    </select>

                                                    {/* Buttons */}
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                                                        <button
                                                            onClick={() =>
                                                                updateStatus(
                                                                    item.id,
                                                                    "Approved"
                                                                )
                                                            }
                                                            className="bg-green-600 hover:bg-green-700 py-4 rounded-2xl text-white font-semibold duration-300"
                                                        >

                                                            Approve

                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                updateStatus(
                                                                    item.id,
                                                                    "Rejected"
                                                                )
                                                            }
                                                            className="bg-red-600 hover:bg-red-700 py-4 rounded-2xl text-white font-semibold duration-300"
                                                        >

                                                            Reject

                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                updateStatus(
                                                                    item.id,
                                                                    "Completed"
                                                                )
                                                            }
                                                            className="bg-violet-600 hover:bg-violet-700 py-4 rounded-2xl text-white font-semibold duration-300"
                                                        >

                                                            Complete

                                                        </button>

                                                    </div>

                                                </div>

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