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
    CircleCheckBig,
    Crown,
    Users,
    Sparkles,
    ChefHat
} from "lucide-react";

import Navbar
from "../components/Navbar";

const heroImage =
"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80";

const luxuryDining =
"https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80";

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

                    {/* Premium Hero */}
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
                            duration: 0.6
                        }}
                        className="relative rounded-[45px] overflow-hidden h-[420px] md:h-[560px]"
                    >

                        <img
                            src={heroImage}
                            alt="Luxury Restaurant"
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

                            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl text-violet-300 mb-8">

                                <Crown size={18} />

                                Premium Reservation Experience

                            </div>

                            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl">

                                Reserve Your Perfect

                                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">

                                    {" "}
                                    Dining Experience

                                </span>

                            </h1>

                            <p className="text-gray-300 text-lg md:text-2xl mt-8 max-w-3xl leading-9">

                                Enjoy luxury dining,
                                premium ambience,
                                and unforgettable moments.

                            </p>

                        </div>

                    </motion.div>

                    {/* Why Reserve */}
                    <div className="grid lg:grid-cols-2 gap-10 mt-16 items-center">

                        <div className="space-y-8">

                            <div>

                                <p className="text-violet-400 uppercase tracking-[4px] text-sm">

                                    Why Reserve With Us?

                                </p>

                                <h2 className="text-white text-4xl md:text-5xl font-bold mt-4">

                                    Luxury Dining Awaits

                                </h2>

                            </div>

                            <p className="text-gray-400 text-lg leading-9">

                                Experience premium hospitality,
                                chef-crafted meals,
                                elegant ambience,
                                and unforgettable moments.

                            </p>

                            <div className="space-y-5">

                                <div className="flex items-center gap-4 text-white">

                                    <ChefHat className="text-violet-400" />

                                    Chef-crafted meals

                                </div>

                                <div className="flex items-center gap-4 text-white">

                                    <Users className="text-violet-400" />

                                    Perfect for families

                                </div>

                                <div className="flex items-center gap-4 text-white">

                                    <Sparkles className="text-violet-400" />

                                    Luxury ambience

                                </div>

                            </div>

                        </div>

                        <div className="overflow-hidden rounded-[40px]">

                            <img
                                src={luxuryDining}
                                alt="Luxury Dining"
                                className="w-full h-[420px] object-cover"
                            />

                        </div>

                    </div>
                                        {/* Reservation Form */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 50
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0
                        }}
                        viewport={{
                            once: true
                        }}
                        transition={{
                            duration: 0.5
                        }}
                        className="mt-24 bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(124,58,237,0.15)]"
                    >

                        <div className="text-center mb-10">

                            <span className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">

                                <CalendarDays size={18} />

                                Reserve Your Table

                            </span>

                            <h2 className="text-white text-4xl md:text-5xl font-bold mt-6">

                                Book Your Reservation

                            </h2>

                            <p className="text-gray-400 text-lg mt-4">

                                Reserve your dining experience in just a few steps.

                            </p>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Name */}
                            <div>
                                <label className="text-gray-300 text-sm mb-3 block">

                                    Full Name

                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full bg-[#231b38] rounded-2xl p-5 text-white placeholder:text-gray-500 outline-none border border-white/10 focus:border-violet-500"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="text-gray-300 text-sm mb-3 block">

                                    Phone Number

                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    className="w-full bg-[#231b38] rounded-2xl p-5 text-white placeholder:text-gray-500 outline-none border border-white/10 focus:border-violet-500"
                                />
                            </div>

                            {/* Guests */}
                            <div>
                                <label className="text-gray-300 text-sm mb-3 block">

                                    Number Of Guests

                                </label>

                                <select
                                    name="people"
                                    value={form.people}
                                    onChange={handleChange}
                                    className="w-full bg-[#231b38] rounded-2xl p-5 text-white border border-white/10 outline-none focus:border-violet-500"
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
                                <label className="text-gray-300 text-sm mb-3 block">

                                    Reservation Date

                                </label>

                                <input
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    className="w-full bg-[#231b38] rounded-2xl p-5 text-white border border-white/10 outline-none focus:border-violet-500"
                                />
                            </div>

                            {/* Time */}
                            <div>
                                <label className="text-gray-300 text-sm mb-3 block">

                                    Reservation Time

                                </label>

                                <input
                                    type="time"
                                    name="time"
                                    value={form.time}
                                    onChange={handleChange}
                                    className="w-full bg-[#231b38] rounded-2xl p-5 text-white border border-white/10 outline-none focus:border-violet-500"
                                />
                            </div>

                            {/* Duration */}
                            <div>
                                <label className="text-gray-300 text-sm mb-3 block">

                                    Reservation Duration

                                </label>

                                <select
                                    name="duration"
                                    value={form.duration}
                                    onChange={handleChange}
                                    className="w-full bg-[#231b38] rounded-2xl p-5 text-white border border-white/10 outline-none focus:border-violet-500"
                                >
                                    <option value="1">1 Hour</option>
                                    <option value="2">2 Hours</option>
                                    <option value="3">3 Hours</option>
                                </select>
                            </div>

                        </div>

                        <motion.button
                            whileHover={{
                                scale: 1.02
                            }}
                            whileTap={{
                                scale: 0.98
                            }}
                            onClick={
                                handleReservation
                            }
                            disabled={
                                loading
                            }
                            className="w-full mt-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 py-5 rounded-2xl text-white text-xl font-bold duration-300 shadow-[0_0_35px_rgba(124,58,237,0.35)]"
                        >

                            {
                                loading
                                ? "Booking Table..."
                                : "Reserve Table →"
                            }

                        </motion.button>

                    </motion.div>
                                        {/* Reservation History */}
                    <div className="mt-24">

                        <div className="text-center mb-12">

                            <span className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">

                                <Clock3 size={18} />

                                Reservation Tracking

                            </span>

                            <h2 className="text-white text-4xl md:text-5xl font-bold mt-6">

                                Your Reservation Requests

                            </h2>

                            <p className="text-gray-400 text-lg mt-4">

                                Track your reservation approval in real-time.

                            </p>

                        </div>

                        {
                            reservations.length === 0

                            ? (

                                <motion.div
                                    initial={{
                                        opacity: 0
                                    }}
                                    animate={{
                                        opacity: 1
                                    }}
                                    className="bg-white/5 border border-white/10 rounded-[40px] p-10 text-center backdrop-blur-xl"
                                >

                                    <h2 className="text-white text-3xl font-bold">

                                        No Reservations Found

                                    </h2>

                                    <p className="text-gray-400 mt-4 text-lg">

                                        Reserve a table to see your reservation history.

                                    </p>

                                </motion.div>

                            )

                            : (

                                <div className="space-y-8">

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
                                                            index * 0.08
                                                    }}
                                                    className="bg-white/5 border border-white/10 rounded-[40px] p-6 md:p-8 backdrop-blur-2xl hover:border-violet-500/30 duration-300"
                                                >

                                                    <div className="flex flex-col lg:flex-row justify-between gap-10">

                                                        {/* Left */}
                                                        <div>

                                                            <h2 className="text-white text-3xl md:text-4xl font-bold">

                                                                Table {
                                                                    item.table_number
                                                                }

                                                            </h2>

                                                            <div className="space-y-4 mt-6 text-gray-300 text-lg">

                                                                <p>

                                                                    📅
                                                                    {" "}
                                                                    {
                                                                        item.reservation_date
                                                                    }

                                                                </p>

                                                                <p>

                                                                    ⏰
                                                                    {" "}
                                                                    {
                                                                        item.reservation_time
                                                                    }

                                                                </p>

                                                                <p>

                                                                    👥
                                                                    {" "}
                                                                    {
                                                                        item.people_count
                                                                    }
                                                                    {" "}
                                                                    Guests

                                                                </p>

                                                            </div>

                                                        </div>

                                                        {/* Right */}
                                                        <div className="lg:w-[360px]">

                                                            <h3 className={`text-2xl md:text-3xl font-bold ${getStatusColor(item.status)}`}>

                                                                {
                                                                    item.status
                                                                }

                                                            </h3>

                                                            {/* Timeline */}
                                                            <div className="mt-8">

                                                                <div className="flex justify-between text-sm text-gray-400 mb-4">

                                                                    <div className="flex flex-col items-center gap-2">

                                                                        <Clock3
                                                                            size={18}
                                                                        />

                                                                        Pending

                                                                    </div>

                                                                    <div className="flex flex-col items-center gap-2">

                                                                        <CalendarDays
                                                                            size={18}
                                                                        />

                                                                        Approved

                                                                    </div>

                                                                    <div className="flex flex-col items-center gap-2">

                                                                        <CircleCheckBig
                                                                            size={18}
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
                                                                            duration: 0.7
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