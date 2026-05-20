import React, {
    useState
} from "react";

import {
    motion
} from "framer-motion";

import {
    Star,
    Sparkles,
    MessageCircleHeart
} from "lucide-react";

import Navbar
from "../components/Navbar";

const API_BASE =
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api";

const heroImage =
"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80";

export default function Feedback() {

    const [feedback,
        setFeedback]
        =
        useState("");

    const [rating,
        setRating]
        =
        useState(0);

    const [hover,
        setHover]
        =
        useState(0);

    const [mood,
        setMood]
        =
        useState("");

    const [loading,
        setLoading]
        =
        useState(false);

    const moods = [
        "😍",
        "😊",
        "🙂",
        "😐",
        "😞"
    ];

    const submitFeedback =
        async () => {

            if(!feedback){

                alert(
                    "Please enter feedback"
                );

                return;
            }

            try {

                setLoading(
                    true
                );

                const response =
                    await fetch(
`${API_BASE}/feedback/addFeedback.php`,
                        {
                            method:
                            "POST",

                            headers:{
                                "Content-Type":
                                "application/json"
                            },

                            body:
                            JSON.stringify({

                                table_number:
                                localStorage.getItem(
                                    "tableNumber"
                                ),

                                rating,

                                mood,

                                feedback
                            })
                        }
                    );

                const data =
                    await response.json();

                if(
                    data.success
                ){

                    alert(
"Thank you for your feedback ❤️"
                    );

                    setFeedback("");
                    setRating(0);
                    setMood("");
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

    return (

        <>

            <Navbar />

            <section className="min-h-screen bg-[#181325] px-5 py-28 relative overflow-hidden">

                {/* Glow */}
                <div className="absolute top-[-150px] left-[-150px] w-[350px] h-[350px] bg-violet-600/20 blur-[120px] rounded-full" />

                <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] bg-fuchsia-500/20 blur-[120px] rounded-full" />

                <div className="max-w-6xl mx-auto relative z-10">

                    {/* Hero */}
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
                        className="relative rounded-[45px] overflow-hidden h-[380px] md:h-[500px]"
                    >

                        <img
                            src={heroImage}
                            alt="Restaurant"
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

                        {/* Hero Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

                            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl text-violet-300 mb-8">

                                <Sparkles
                                    size={18}
                                />

                                Customer Experience

                            </div>

                            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">

                                Share Your

                                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">

                                    {" "}
                                    Feedback

                                </span>

                            </h1>

                            <p className="text-gray-300 text-lg md:text-2xl mt-6 max-w-3xl">

                                Tell us about your dining experience
                                and help us improve our service.

                            </p>

                        </div>

                    </motion.div>
                                        {/* Feedback Form */}
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
                        className="mt-16 bg-white/[0.04] border border-white/10 rounded-[45px] p-8 md:p-12 backdrop-blur-3xl shadow-[0_0_60px_rgba(124,58,237,0.12)]"
                    >

                        {/* Header */}
                        <div className="text-center">

                            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 mb-6">

                                <MessageCircleHeart
                                    size={18}
                                />

                                We Value Your Opinion

                            </div>

                            <h2 className="text-white text-4xl md:text-5xl font-bold">

                                Rate Your Experience

                            </h2>

                            <p className="text-gray-400 mt-5 text-lg">

                                Your feedback helps us improve
                                our premium dining experience.

                            </p>

                            <p className="text-violet-400 mt-5 font-semibold text-lg">

                                Table {
                                    localStorage.getItem(
                                        "tableNumber"
                                    )
                                }

                            </p>

                        </div>

                        {/* Stars */}
                        <div className="flex justify-center gap-4 mt-12 flex-wrap">

                            {
                                [...Array(5)].map(
                                    (_, index) => {

                                        const ratingValue =
                                            index + 1;

                                        return (

                                            <motion.button
                                                key={index}
                                                whileHover={{
                                                    scale: 1.15
                                                }}
                                                whileTap={{
                                                    scale: 0.9
                                                }}
                                                type="button"
                                                onClick={() =>
                                                    setRating(
                                                        ratingValue
                                                    )
                                                }
                                                onMouseEnter={() =>
                                                    setHover(
                                                        ratingValue
                                                    )
                                                }
                                                onMouseLeave={() =>
                                                    setHover(
                                                        0
                                                    )
                                                }
                                                className="group"
                                            >

                                                <div className={`w-18 h-18 md:w-20 md:h-20 rounded-full flex items-center justify-center border duration-300
                                                ${
                                                    ratingValue <=
                                                    (
                                                        hover
                                                        ||
                                                        rating
                                                    )

                                                    ? "bg-yellow-500/10 border-yellow-500/20 shadow-[0_0_30px_rgba(250,204,21,0.25)]"

                                                    : "bg-white/5 border-white/10"
                                                }`}>

                                                    <Star
                                                        size={38}
                                                        className={`duration-300 ${
                                                            ratingValue <=
                                                            (
                                                                hover
                                                                ||
                                                                rating
                                                            )

                                                            ? "fill-yellow-400 text-yellow-400"

                                                            : "text-gray-500"
                                                        }`}
                                                    />

                                                </div>

                                            </motion.button>
                                        );
                                    }
                                )
                            }

                        </div>

                        {/* Mood */}
                        <div className="mt-14">

                            <h3 className="text-white text-2xl font-semibold text-center">

                                How was your experience?

                            </h3>

                            <div className="flex justify-center gap-5 mt-8 flex-wrap">

                                {
                                    moods.map(
                                        item => (

                                            <motion.button
                                                key={item}
                                                whileHover={{
                                                    scale: 1.1
                                                }}
                                                whileTap={{
                                                    scale: 0.92
                                                }}
                                                type="button"
                                                onClick={() =>
                                                    setMood(
                                                        item
                                                    )
                                                }
                                                className={`text-4xl rounded-full w-20 h-20 flex items-center justify-center duration-300 border
                                                ${
                                                    mood === item

                                                    ? "bg-violet-600 border-violet-500 shadow-[0_0_35px_rgba(124,58,237,0.35)] scale-110"

                                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                                                }`}
                                            >

                                                {
                                                    item
                                                }

                                            </motion.button>
                                        )
                                    )
                                }

                            </div>

                        </div>

                        {/* Feedback Input */}
                        <div className="mt-14">

                            <label className="text-gray-300 text-lg mb-4 block">

                                Your Feedback

                            </label>

                            <textarea
                                value={feedback}
                                onChange={(e)=>
                                    setFeedback(
                                        e.target.value
                                    )
                                }
                                rows="8"
                                placeholder="Tell us about your dining experience..."
                                className="w-full bg-[#231b38] rounded-[35px] p-6 text-white placeholder:text-gray-500 outline-none border border-white/10 focus:border-violet-500 resize-none duration-300"
                            />

                        </div>
                                                {/* Submit */}
                        <motion.button
                            whileHover={{
                                scale: 1.02
                            }}
                            whileTap={{
                                scale: 0.98
                            }}
                            onClick={
                                submitFeedback
                            }
                            disabled={
                                loading
                            }
                            className="w-full mt-10 bg-gradient-to-r from-violet-600 via-purple-700 to-fuchsia-700 hover:from-violet-500 hover:to-fuchsia-600 py-5 rounded-[28px] text-white text-xl font-bold shadow-[0_0_35px_rgba(124,58,237,0.35)] duration-300"
                        >

                            {
                                loading
                                ? "Submitting Feedback..."
                                : "Submit Feedback →"
                            }

                        </motion.button>

                    </motion.div>

                </div>

            </section>

        </>
    );
}