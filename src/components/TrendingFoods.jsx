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
"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80";

export default function TrendingFoods() {

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

                const trending =
                    data
                    .filter(
                        (food) =>
                            food.available === "1"
                    )
                    .sort(
                        () =>
                            Math.random() - 0.5
                    )
                    .slice(0, 4);

                setFoods(
                    trending
                );

            } catch (error) {

                console.log(
                    error
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <section className="relative py-28 bg-[#120d1d] overflow-hidden">

            {/* Glow */}
            <div className="absolute top-0 right-[10%] w-[300px] h-[300px] bg-orange-600/10 rounded-full blur-[120px]" />

            <div className="absolute bottom-0 left-[10%] w-[300px] h-[300px] bg-violet-700/10 rounded-full blur-[120px]" />

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
                        duration: 0.5
                    }}
                    className="text-center mb-16"
                >

                    <p className="text-orange-400 uppercase tracking-[5px] text-sm mb-3">

                        Customer Favorites

                    </p>

                    <h2 className="text-white text-4xl md:text-6xl font-bold">

                        Trending Foods 📈

                    </h2>

                    <p className="text-gray-400 mt-5 max-w-2xl mx-auto">

                        Freshly prepared dishes
                        loved by food lovers.

                    </p>

                </motion.div>

                {/* Loading */}
                {
                    loading ? (

                        <div className="space-y-6">

                            {
                                [...Array(4)].map(
                                    (_, i) => (

                                        <div
                                            key={i}
                                            className="h-[180px] bg-white/5 rounded-[35px] animate-pulse"
                                        />
                                    )
                                )
                            }

                        </div>

                    ) : (

                        <div className="space-y-8">

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
                                                    x: -50
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    x: 0
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
                                                    scale: 1.02
                                                }}
                                                className="group overflow-hidden rounded-[35px] bg-white/5 border border-white/10 hover:border-orange-500/30 backdrop-blur-xl duration-500"
                                            >

                                                <div className="flex flex-col md:flex-row">

                                                    {/* Image */}
                                                    <div className="relative md:w-[320px] h-[250px] overflow-hidden">

                                                        <img
                                                            src={
                                                                image
                                                            }
                                                            alt={
                                                                food.food_name
                                                            }
                                                            className="w-full h-full object-cover group-hover:scale-110 duration-[3000ms]"
                                                        />

                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 p-8 flex flex-col justify-center">

                                                        <div className="flex items-center justify-between mb-5">

                                                            <div>

                                                                <span className="bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm">

                                                                    Trending 🔥

                                                                </span>

                                                                <h3 className="text-white text-3xl font-bold mt-4 capitalize">

                                                                    {
                                                                        food.food_name
                                                                    }

                                                                </h3>

                                                            </div>

                                                            <h2 className="text-orange-400 text-3xl font-bold">

                                                                ₹
                                                                {
                                                                    food.price
                                                                }

                                                            </h2>

                                                        </div>

                                                        <div className="flex flex-wrap gap-4">

                                                            <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-gray-300">

                                                                {
                                                                    food.category
                                                                }

                                                            </span>

                                                            <span className={`px-4 py-2 rounded-full
                                                            ${
                                                                food.food_type ===
                                                                "Veg"
                                                                    ? "bg-green-500/20 text-green-400"
                                                                    : "bg-red-500/20 text-red-400"
                                                            }`}>

                                                                {
                                                                    food.food_type
                                                                }

                                                            </span>

                                                        </div>

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