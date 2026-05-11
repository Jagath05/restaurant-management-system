import React,
{
    useEffect,
    useState
}
from "react";

import AdminLayout
from "../../layout/AdminLayout";

export default function ManageReservations() {

    const [reservations,
        setReservations]
        =
        useState([]);

    const [selectedTables,
        setSelectedTables]
        =
        useState({});

    useEffect(() => {

        fetchReservations();

    }, []);

    // Get reservations
    const fetchReservations =
        async () => {

        try {

            const response =
                await fetch(
"/api/reservations/getReservations.php"
                );

            const data =
                await response.json();

            setReservations(
                data
            );

        } catch(error){

            console.log(
                error
            );
        }
    };

    // Update reservation
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
"/api/reservations/updateReservationStatus.php",
                    {
                        method:
                        "POST",

                        headers: {
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

            if(data.success){

                alert(
                    data.message
                );

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
                return "bg-green-500";

            case "Rejected":
                return "bg-red-500";

            case "Completed":
                return "bg-violet-500";

            default:
                return "bg-yellow-500";
        }
    };

    return (

        <AdminLayout>

            <section>

                <h1 className="text-white text-6xl font-bold mb-10">

                    Manage Reservations

                </h1>

                <div className="space-y-8">

                    {
                        reservations.map(
                            (item) => (

                            <div
                                key={item.id}
                                className="bg-white/5 border border-white/10 rounded-[35px] p-8 shadow-xl"
                            >

                                {/* Top */}
                                <div className="flex flex-col lg:flex-row lg:justify-between gap-8">

                                    {/* Details */}
                                    <div>

                                        <h2 className="text-white text-3xl font-bold">

                                            {
                                                item.customer_name
                                            }

                                        </h2>

                                        <div className="space-y-2 mt-4 text-gray-300 text-lg">

                                            <p>

                                                📞 {
                                                    item.phone
                                                }

                                            </p>

                                            <p>

                                                👥 {
                                                    item.people_count
                                                }
                                                {" "}
                                                Guests

                                            </p>

                                            <p>

                                                📅 {
                                                    item.reservation_date
                                                }

                                            </p>

                                            <p>

                                                ⏰ {
                                                    item.reservation_time
                                                }

                                            </p>

                                            <p>

                                                ⌛ {
                                                    item.duration_hours
                                                }
                                                {" "}
                                                Hour(s)

                                            </p>

                                            <p>

                                                🍽️ Table:
                                                {" "}

                                                {
                                                    item.table_number
                                                    || "Not Assigned"
                                                }

                                            </p>

                                        </div>

                                    </div>

                                    {/* Status */}
                                    <div className="flex flex-col gap-5">

                                        <div className={`${getStatusColor(item.status)} text-white px-6 py-3 rounded-2xl text-center text-lg font-bold`}>

                                            {
                                                item.status
                                            }

                                        </div>

                                        {/* Table Select */}
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

                                            className="bg-[#312B45] border border-white/10 rounded-2xl p-4 text-white"
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
                                                ))
                                            }

                                        </select>

                                        {/* Buttons */}
                                        <div className="flex flex-wrap gap-3">

                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        item.id,
                                                        "Approved"
                                                    )
                                                }

                                                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-2xl text-white font-semibold"
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

                                                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl text-white font-semibold"
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

                                                className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-2xl text-white font-semibold"
                                            >

                                                Completed

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        ))
                    }

                </div>

            </section>

        </AdminLayout>
    );
}