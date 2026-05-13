import React, {
    useEffect,
    useState
} from "react";

import {
    motion
} from "framer-motion";

import {
    useNavigate
} from "react-router-dom";

const API_BASE =
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api";

export default function TabletSetup() {

    const navigate =
        useNavigate();

    const [tables,
        setTables]
        =
        useState([]);

    const [tableNo,
        setTableNo]
        =
        useState("");

    const [loading,
        setLoading]
        =
        useState(false);

    useEffect(() => {

        const assignedTable =
            localStorage.getItem(
                "tableNumber"
            );

        if(
            assignedTable
        ){

            navigate("/");
        }

        fetchTables();

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
            }
        };

    const getStatusColor =
        (status) => {

            switch(status){

                case "Available":
                    return
"bg-green-500/20 text-green-400";

                case "Reserved":
                    return
"bg-yellow-500/20 text-yellow-400";

                case "Occupied":
                    return
"bg-red-500/20 text-red-400";

                case "Maintenance":
                    return
"bg-gray-500/20 text-gray-400";

                default:
                    return
"bg-white/10 text-white";
            }
        };

    const handleSave =
        () => {

            if(
                !tableNo
            ){

                alert(
                    "Select table number"
                );

                return;
            }

            const selectedTable =
                tables.find(
                    table =>
                    table.table_number
                    === tableNo
                );

            if(
                selectedTable
                &&
                (
                    selectedTable.status
                    === "Occupied"

                    ||

                    selectedTable.status
                    === "Maintenance"
                )
            ){

                alert(
                    "Cannot assign this table"
                );

                return;
            }

            localStorage.setItem(
                "tableNumber",
                tableNo
            );

            alert(
`Tablet Assigned To Table ${tableNo}`
            );

            navigate("/");
        };
            return (

        <section className="min-h-screen bg-[#181325] flex items-center justify-center px-5 relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-[-150px] left-[-150px] w-[350px] h-[350px] bg-violet-600/20 blur-[120px] rounded-full" />

            <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] bg-fuchsia-500/20 blur-[120px] rounded-full" />

            <motion.div
                initial={{
                    opacity: 0,
                    y: 50
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.5
                }}
                className="relative w-full max-w-2xl bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl backdrop-blur-2xl"
            >

                {/* Header */}
                <div className="text-center">

                    <h1 className="text-white text-4xl md:text-6xl font-bold">

                        Tablet Setup

                    </h1>

                    <p className="text-gray-400 mt-4 text-lg">

                        Assign this tablet to a restaurant table

                    </p>

                </div>

                {/* Table Select */}
                <div className="mt-10">

                    <label className="text-white text-lg font-medium">

                        Select Table

                    </label>

                    <select
                        value={tableNo}
                        onChange={(e) =>
                            setTableNo(
                                e.target.value
                            )
                        }
                        className="w-full bg-[#231b38] border border-white/10 rounded-2xl p-5 text-white outline-none mt-4"
                    >

                        <option value="">
                            Choose Table
                        </option>

                        {
                            tables.map(
                                table => (

                                    <option
                                        key={table.id}
                                        value={
                                            table.table_number
                                        }
                                    >

                                        Table {
                                            table.table_number
                                        }
                                        {" - "}
                                        {
                                            table.status
                                        }

                                    </option>
                                )
                            )
                        }

                    </select>

                </div>

                {/* Live Table Status */}
                <div className="grid sm:grid-cols-2 gap-4 mt-8">

                    {
                        tables.map(
                            table => (

                                <div
                                    key={table.id}
                                    className={`border rounded-3xl p-5 duration-300
                                    ${
                                        tableNo ===
                                        table.table_number

                                        ? "border-violet-500 bg-violet-500/10"

                                        : "border-white/10 bg-white/5"
                                    }`}
                                >

                                    <div className="flex justify-between items-center">

                                        <div>

                                            <h3 className="text-white text-xl font-bold">

                                                Table {
                                                    table.table_number
                                                }

                                            </h3>

                                            <p className="text-gray-400 mt-2">

                                                Capacity:
                                                {" "}
                                                {
                                                    table.capacity
                                                }

                                            </p>

                                        </div>

                                        <span
                                            className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(table.status)}`}
                                        >

                                            {
                                                table.status
                                            }

                                        </span>

                                    </div>

                                </div>
                            )
                        )
                    }

                </div>

                {/* Buttons */}
                <div className="grid md:grid-cols-2 gap-4 mt-10">

                    <button
                        onClick={
                            handleSave
                        }
                        disabled={
                            loading
                        }
                        className="bg-gradient-to-r from-violet-600 to-purple-700 hover:scale-[1.02] py-5 rounded-2xl text-white text-xl font-bold duration-300"
                    >

                        {
                            loading
                            ? "Saving..."
                            : "Save Table"
                        }

                    </button>

                    <button
                        onClick={() => {

                            localStorage.removeItem(
                                "tableNumber"
                            );

                            alert(
                                "Table Reset"
                            );
                        }}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 py-5 rounded-2xl text-white text-xl font-semibold duration-300"
                    >

                        Reassign Table

                    </button>

                </div>

            </motion.div>

        </section>
    );
}