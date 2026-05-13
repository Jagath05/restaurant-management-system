import React, {
    useState,
    useEffect
} from "react";

import {
    motion
} from "framer-motion";

import {
    Clock3,
    CalendarDays,
    CircleCheckBig
} from "lucide-react";

import Navbar
from "../components/Navbar";

const API_BASE =
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api";

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

    const fetchReservations =
        async (phone) => {

            if(!phone)
            return;

            try {

                const response =
                    await fetch(
`${API_BASE}/reservations/getCustomerReservations.php?phone=${phone}`
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
            }
        };

    const handleChange =
        (e) => {

            setForm({
                ...form,
                [e.target.name]:
                e.target.value
            });

            if(
                e.target.name ===
                "phone"
            ){

                fetchReservations(
                    e.target.value
                );
            }
        };

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
`${API_BASE}/reservations/bookTable.php`,
                        {
                            method:
                            "POST",

                            headers:{
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

                if(
                    data.success
                ){

                    localStorage.setItem(
                        "reservationPhone",
                        form.phone
                    );

                    alert(
`🎉 Reservation Successful

Table:
${data.table_number}

Status:
Pending`
                    );

                    fetchReservations(
                        form.phone
                    );

                    setForm({
                        name: "",
                        phone:
                        form.phone,
                        people:"2",
                        date:"",
                        time:"",
                        duration:"1"
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

            } finally {

                setLoading(
                    false
                );
            }
        };

    const getStatusColor =
        (status)=>{

            switch(status){

                case "Approved":
                    return
"text-green-400";

                case "Rejected":
                    return
"text-red-400";

                case "Pending":
                    return
"text-yellow-400";

                case "Completed":
                    return
"text-violet-400";

                default:
                    return
"text-white";
            }
        };

    const getProgress =
        (status)=>{

            switch(status){

                case "Pending":
                    return 33;

                case "Approved":
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

            <section className="min-h-screen bg-[#181325] px-5 md:px-10 py-24 relative overflow-hidden">

                {/* Glow */}
                <div className="absolute top-[-150px] left-[-150px] w-[350px] h-[350px] bg-violet-600/20 blur-[120px] rounded-full" />

                <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] bg-fuchsia-500/20 blur-[120px] rounded-full" />

                <div className="max-w-7xl mx-auto relative z-10">

                    {/* Header */}
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

                        <h1 className="text-white text-4xl md:text-7xl font-bold">

                            Reserve Your Table

                        </h1>

                        <p className="text-gray-400 text-lg md:text-xl mt-5">

                            Book your perfect luxury dining experience

                        </p>

                    </motion.div>

                    {/* Form */}
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
                            delay: 0.1
                        }}
                        className="mt-14 bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-10 backdrop-blur-2xl shadow-2xl"
                    >

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="bg-[#231b38] rounded-2xl p-5 text-white outline-none border border-white/10"
                            />

                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="bg-[#231b38] rounded-2xl p-5 text-white outline-none border border-white/10"
                            />

                            <select
                                name="people"
                                value={form.people}
                                onChange={handleChange}
                                className="bg-[#231b38] rounded-2xl p-5 text-white border border-white/10"
                            >
                                <option value="2">2 Guests</option>
                                <option value="4">4 Guests</option>
                                <option value="6">6 Guests</option>
                                <option value="8">8 Guests</option>
                                <option value="10">10 Guests</option>
                            </select>

                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="bg-[#231b38] rounded-2xl p-5 text-white border border-white/10"
                            />

                            <input
                                type="time"
                                name="time"
                                value={form.time}
                                onChange={handleChange}
                                className="bg-[#231b38] rounded-2xl p-5 text-white border border-white/10"
                            />

                            <select
                                name="duration"
                                value={form.duration}
                                onChange={handleChange}
                                className="bg-[#231b38] rounded-2xl p-5 text-white border border-white/10"
                            >
                                <option value="1">1 Hour</option>
                                <option value="2">2 Hours</option>
                                <option value="3">3 Hours</option>
                            </select>

                        </div>

                        <button
                            onClick={
                                handleReservation
                            }
                            disabled={
                                loading
                            }
                            className="w-full mt-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-[1.01] py-5 rounded-2xl text-white text-xl font-bold duration-300"
                        >

                            {
                                loading
                                ? "Booking Table..."
                                : "Reserve Table →"
                            }

                        </button>

                    </motion.div>

                    {/* Reservation History */}
                    <div className="mt-20">

                        <h2 className="text-white text-3xl md:text-5xl font-bold mb-8">

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
                                                            index * 0.05
                                                    }}
                                                    className="bg-white/5 border border-white/10 rounded-[35px] p-6 md:p-8 backdrop-blur-2xl"
                                                >

                                                    <div className="flex flex-col lg:flex-row justify-between gap-8">

                                                        {/* Left */}
                                                        <div>

                                                            <h2 className="text-white text-3xl font-bold">

                                                                Table {
                                                                    item.table_number
                                                                }

                                                            </h2>

                                                            <div className="space-y-3 mt-5 text-gray-400">

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
                                                                    👥 {
                                                                        item.people_count
                                                                    } Guests
                                                                </p>

                                                            </div>

                                                        </div>

                                                        {/* Right */}
                                                        <div className="lg:w-[350px]">

                                                            <h3 className={`text-2xl font-bold ${getStatusColor(item.status)}`}>

                                                                {
                                                                    item.status
                                                                }

                                                            </h3>

                                                            {/* Timeline */}
                                                            <div className="mt-6">

                                                                <div className="flex justify-between text-sm text-gray-400 mb-3">

                                                                    <div className="flex items-center gap-2">

                                                                        <Clock3
                                                                            size={16}
                                                                        />

                                                                        Pending

                                                                    </div>

                                                                    <div className="flex items-center gap-2">

                                                                        <CalendarDays
                                                                            size={16}
                                                                        />

                                                                        Approved

                                                                    </div>

                                                                    <div className="flex items-center gap-2">

                                                                        <CircleCheckBig
                                                                            size={16}
                                                                        />

                                                                        Completed

                                                                    </div>

                                                                </div>

                                                                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">

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

                                                    </div>

                                                </motion.div>
                                            )
                                        )
                                    }

                                </div>
                            )
                        }

                    </div>

                </div>

            </section>
        </>
    );
}