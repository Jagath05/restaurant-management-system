import React, {
    useEffect,
    useState
} from "react";

import {
    motion
} from "framer-motion";

const API_URL =
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api/menu/getFoods.php";

const IMAGE_BASE =
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api/uploads/images/";

const FALLBACK_IMAGE =
"https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80";

export default function PopularFoods() {

    const [foods,
        setFoods] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    useEffect(() => {

        fetchFoods();

    }, []);

    const fetchFoods =
        async () => {

            try {

                const response =
                    await fetch(
                        API_URL
                    );

                const data =
                    await response.json();

                const availableFoods =
                    data
                    .filter(
                        (food) =>
                            food.available === "1"
                    )
                    .slice(0, 6);

                setFoods(
                    availableFoods
                );

            } catch (error) {

                console.log(
                    "Food Fetch Error:",
                    error
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <section className="relative py-28 bg-[#181325] overflow-hidden">

            {/* Glow */}
            <div className="absolute top-0 left-[10%] w-[350px] h-[350px] bg-violet-700/10 blur-[150px] rounded-full" />

            <div className="absolute bottom-0 right-[10%] w-[300px] h-[300px] bg-pink-700/10 blur-[150px] rounded-full" />

            <div className="relative z-10 max-w-[1400px] mx-auto px-5">

                {/* Heading */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{
                        once: true
                    }}
                    transition={{
                        duration: 0.6
                    }}
                    className="text-center mb-16"
                >

                    <p className="text-violet-400 uppercase tracking-[5px] text-sm mb-3">

                        Delicious Selection

                    </p>

                    <h2 className="text-white text-4xl md:text-6xl font-bold">

                        Popular Foods 🔥

                    </h2>

                    <p className="text-gray-400 mt-5 max-w-2xl mx-auto">

                        Taste our most loved dishes,
                        freshly prepared with premium ingredients.

                    </p>

                </motion.div>

                {/* Loading */}
                {
                    loading ? (

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                            {
                                [...Array(6)].map(
                                    (_, i) => (

                                        <div
                                            key={i}
                                            className="h-[420px] rounded-[35px] bg-white/5 animate-pulse"
                                        />
                                    )
                                )
                            }

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                            {
                                foods.map(
                                    (
                                        food,
                                        index
                                    ) => {

                                        const image =
                                            food.image
                                                ? `${IMAGE_BASE}${food.image}`
                                                : FALLBACK_IMAGE;

                                        return (

                                            <motion.div
                                                key={
                                                    food.id
                                                }
                                                initial={{
                                                    opacity: 0,
                                                    y: 60
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    y: 0
                                                }}
                                                viewport={{
                                                    once: true
                                                }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay:
                                                        index *
                                                        0.1
                                                }}
                                                whileHover={{
                                                    y: -10
                                                }}
                                                className="group relative overflow-hidden rounded-[35px] bg-white/5 border border-white/10 hover:border-violet-500/30 backdrop-blur-xl duration-500 shadow-[0_0_40px_rgba(124,58,237,0.08)]"
                                            >

                                                {/* Popular Badge */}
                                                <div className="absolute top-5 left-5 z-20 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg">

                                                    Popular

                                                </div>

                                                {/* Food Type */}
                                                <div className={`absolute top-5 right-5 z-20 px-4 py-2 rounded-full text-sm font-medium
                                                ${
                                                    food.food_type ===
                                                    "Veg"
                                                        ? "bg-green-500/20 text-green-400"
                                                        : "bg-red-500/20 text-red-400"
                                                }`}>

                                                    {
                                                        food.food_type
                                                    }

                                                </div>

                                                {/* Image */}
                                                <div className="relative h-[270px] overflow-hidden">

                                                    <img
                                                        src={
                                                            image
                                                        }
                                                        alt={
                                                            food.food_name
                                                        }
                                                        className="w-full h-full object-cover group-hover:scale-110 duration-[3000ms]"
                                                    />

                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                                                </div>

                                                {/* Content */}
                                                <div className="p-7">

                                                    <div className="flex justify-between items-center mb-4">

                                                        <h3 className="text-white text-2xl font-bold capitalize">

                                                            {
                                                                food.food_name
                                                            }

                                                        </h3>

                                                        <span className="text-violet-400 font-bold text-xl">

                                                            ₹
                                                            {
                                                                food.price
                                                            }

                                                        </span>

                                                    </div>

                                                    <div className="flex items-center justify-between">

                                                        <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-gray-300 text-sm">

                                                            {
                                                                food.category
                                                            }

                                                        </span>

                                                        <button className="bg-violet-600 hover:bg-violet-700 px-5 py-3 rounded-2xl text-white font-semibold hover:scale-105 duration-500">

                                                            Order Now

                                                        </button>

                                                    </div>

                                                </div>

                                            </motion.div>
                                        );
                                    }
                                )
                            }

                        </div>
                    )
                }

            </div>

        </section>
    );
}