import React, {
    useState
} from "react";

import {
    motion
} from "framer-motion";

import {
    Star
} from "lucide-react";

const API_BASE =
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api";

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

            if(
                !feedback
            ){

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

        <section className="min-h-screen bg-[#181325] px-5 py-24 relative overflow-hidden">

            {/* Glow Background */}
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
                className="relative max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 backdrop-blur-2xl shadow-2xl"
            >

                {/* Header */}
                <div className="text-center">

                    <h1 className="text-white text-4xl md:text-6xl font-bold">

                        Customer Feedback

                    </h1>

                    <p className="text-gray-400 mt-4 text-lg">

                        Share your dining experience with us

                    </p>

                    <p className="text-violet-400 mt-3 font-semibold">

                        Table {
                            localStorage.getItem(
                                "tableNumber"
                            )
                        }

                    </p>

                </div>

                {/* Star Rating */}
                <div className="flex justify-center gap-3 mt-10">

                    {
                        [...Array(5)].map(
                            (_, index) => {

                                const ratingValue =
                                    index + 1;

                                return (

                                    <button
                                        key={index}
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
                                    >

                                        <Star
                                            size={42}
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

                                    </button>
                                );
                            }
                        )
                    }

                </div>

                {/* Mood */}
                <div className="mt-10">

                    <h3 className="text-white text-xl font-semibold text-center">

                        How was your experience?

                    </h3>

                    <div className="flex justify-center gap-4 mt-5 flex-wrap">

                        {
                            moods.map(
                                item => (

                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() =>
                                            setMood(
                                                item
                                            )
                                        }

                                        className={`text-4xl rounded-full p-4 duration-300 ${
                                            mood === item

                                            ? "bg-violet-600 scale-110"

                                            : "bg-white/5 hover:bg-white/10"
                                        }`}
                                    >

                                        {item}

                                    </button>
                                )
                            )
                        }

                    </div>

                </div>

                {/* Feedback */}
                <textarea
                    value={feedback}
                    onChange={(e)=>
                        setFeedback(
                            e.target.value
                        )
                    }
                    rows="8"
                    placeholder="Write your feedback..."
                    className="w-full mt-10 bg-[#231b38] rounded-[30px] p-6 text-white outline-none border border-white/10 resize-none"
                />

                {/* Button */}
                <button
                    onClick={
                        submitFeedback
                    }

                    disabled={
                        loading
                    }

                    className="mt-8 w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-[1.02] text-white font-bold py-5 rounded-2xl duration-300 text-lg"
                >

                    {
                        loading
                        ? "Submitting..."
                        : "Submit Feedback"
                    }

                </button>

            </motion.div>

        </section>
    );
}