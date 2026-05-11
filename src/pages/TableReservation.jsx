import React,
{
    useState,
    useEffect
}
from "react";

import Navbar
from "../components/Navbar";

export default function TableReservation() {

    const [form,
        setForm] =
        useState({

            name: "",
            phone: "",
            people: "2",
            date: "",
            time: "",
            duration: "1"

        });

    const [loading,
        setLoading] =
        useState(false);

    const [reservations,
        setReservations]
        =
        useState([]);

    // Load customer reservations
    useEffect(() => {

        const savedPhone =
            localStorage.getItem(
                "reservationPhone"
            );

        if(savedPhone){

            fetchReservations(
                savedPhone
            );

            setForm(
                prev => ({
                    ...prev,
                    phone:
                    savedPhone
                })
            );
        }

    }, []);

    // Fetch reservations
    const fetchReservations =
        async (phone) => {

        if(!phone)
        return;

        try {

            const response =
                await fetch(
`https://restaurant-jagath.infinityfreeapp.com/restaurant-api/reservations/getCustomerReservations.php?phone=${phone}`
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

    // Form change
    const handleChange =
        (e) => {

        setForm({

            ...form,
            [e.target.name]:
            e.target.value

        });

        // Live fetch by phone
        if(
            e.target.name ===
            "phone"
        ){

            fetchReservations(
                e.target.value
            );
        }
    };

    // Reserve table
    const handleReservation =
        async () => {

        if(
            !form.name ||
            !form.phone ||
            !form.date ||
            !form.time
        ){

            alert(
                "Please fill all fields"
            );

            return;
        }

        setLoading(
            true
        );

        try {

            const response =
                await fetch(
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api/reservations/bookTable.php",
                    {
                        method:
                        "POST",

                        headers: {
                            "Content-Type":
                            "application/json"
                        },

                        body:
                        JSON.stringify(
                            form
                        )
                    }
                );

            const data =
                await response.json();

            if(data.success){

                // Save phone
                localStorage.setItem(
                    "reservationPhone",
                    form.phone
                );

                alert(
`🎉 Reservation Successful

Table Assigned:
Table ${data.table_number}

Status:
Pending`
                );

                // Refresh customer reservations
                fetchReservations(
                    form.phone
                );

                // Reset form
                setForm({

                    name: "",
                    phone:
                    form.phone,
                    people: "2",
                    date: "",
                    time: "",
                    duration: "1"

                });

            } else {

                alert(
                    data.message
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

    // Status color
    const getStatusColor =
        (status) => {

        switch(status){

            case "Approved":
                return "text-green-400";

            case "Rejected":
                return "text-red-400";

            case "Pending":
                return "text-yellow-400";

            case "Completed":
                return "text-violet-400";

            default:
                return "text-white";
        }
    };

    return (

        <>
            <Navbar />

            <section className="min-h-screen bg-[#262235] px-6 md:px-10 py-14">

                {/* Heading */}
                <div className="mb-12">

                    <h1 className="text-white text-5xl md:text-7xl font-bold">

                        Reserve Your Table

                    </h1>

                    <p className="text-gray-400 text-lg mt-3">

                        Book your perfect dining spot before arriving.

                    </p>

                </div>

                {/* Reservation Form */}
                <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 shadow-2xl">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Name */}
                        <div>

                            <label className="text-gray-300 block mb-3">

                                Name

                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter Name"
                                className="w-full bg-[#312B45] border border-white/10 rounded-2xl p-4 text-white outline-none"
                            />

                        </div>

                        {/* Phone */}
                        <div>

                            <label className="text-gray-300 block mb-3">

                                Phone Number

                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Enter Number"
                                className="w-full bg-[#312B45] border border-white/10 rounded-2xl p-4 text-white outline-none"
                            />

                        </div>

                        {/* Guests */}
                        <div>

                            <label className="text-gray-300 block mb-3">

                                Guests

                            </label>

                            <select
                                name="people"
                                value={form.people}
                                onChange={handleChange}
                                className="w-full bg-[#312B45] border border-white/10 rounded-2xl p-4 text-white outline-none"
                            >
                                <option value="2">2 Guests</option>
                                <option value="4">4 Guests</option>
                                <option value="6">6 Guests</option>
                                <option value="8">8 Guests</option>
                                <option value="10">10 Guests</option>
                            </select>

                        </div>

                        {/* Date */}
                        <div>

                            <label className="text-gray-300 block mb-3">

                                Date

                            </label>

                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full bg-[#312B45] border border-white/10 rounded-2xl p-4 text-white outline-none"
                            />

                        </div>

                        {/* Time */}
                        <div>

                            <label className="text-gray-300 block mb-3">

                                Time

                            </label>

                            <input
                                type="time"
                                name="time"
                                value={form.time}
                                onChange={handleChange}
                                className="w-full bg-[#312B45] border border-white/10 rounded-2xl p-4 text-white outline-none"
                            />

                        </div>

                        {/* Duration */}
                        <div>

                            <label className="text-gray-300 block mb-3">

                                Duration

                            </label>

                            <select
                                name="duration"
                                value={form.duration}
                                onChange={handleChange}
                                className="w-full bg-[#312B45] border border-white/10 rounded-2xl p-4 text-white outline-none"
                            >
                                <option value="1">1 Hour</option>
                                <option value="2">2 Hours</option>
                                <option value="3">3 Hours</option>
                            </select>

                        </div>

                    </div>

                    <button
                        onClick={handleReservation}
                        disabled={loading}
                        className="w-full mt-10 bg-violet-600 hover:bg-violet-700 py-5 rounded-2xl text-white text-xl font-bold duration-300"
                    >

                        {
                            loading
                            ? "Booking Table..."
                            : "Reserve Table →"
                        }

                    </button>

                </div>

                {/* Customer Reservation Requests */}
                <div className="mt-16">

                    <h2 className="text-white text-5xl font-bold mb-8">

                        Your Reservation Requests

                    </h2>

                    {
                        reservations.length === 0

                        ? (

                        <p className="text-gray-400 text-xl">

                            No reservations found

                        </p>

                        )

                        : (

                        <div className="space-y-6">

                            {
                                reservations.map(
                                    (item) => (

                                    <div
                                        key={item.id}
                                        className="bg-white/5 border border-white/10 rounded-[35px] p-8 shadow-xl"
                                    >

                                        <div className="flex justify-between items-center">

                                            <div>

                                                <h2 className="text-white text-3xl font-bold">

                                                    Table {
                                                        item.table_number
                                                    }

                                                </h2>

                                                <p className="text-gray-400 mt-3">

                                                    📅 {
                                                        item.reservation_date
                                                    }

                                                </p>

                                                <p className="text-gray-400">

                                                    ⏰ {
                                                        item.reservation_time
                                                    }

                                                </p>

                                                <p className="text-gray-400">

                                                    👥 {
                                                        item.people_count
                                                    }
                                                    {" "}
                                                    Guests

                                                </p>

                                            </div>

                                            <div>

                                                <h2 className={`text-3xl font-bold ${getStatusColor(item.status)}`}>

                                                    {
                                                        item.status
                                                    }

                                                </h2>

                                            </div>

                                        </div>

                                    </div>
                                ))
                            }

                        </div>
                        )
                    }

                </div>

            </section>
        </>
    );
}