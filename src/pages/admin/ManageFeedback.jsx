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
    Star,
    Trash2
} from "lucide-react";

import AdminLayout
from "../../layout/AdminLayout";

const API_BASE =
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api";

export default function ManageFeedback() {

    const [feedbacks,
        setFeedbacks]
        =
        useState([]);

    const [search,
        setSearch]
        =
        useState("");

    const [ratingFilter,
        setRatingFilter]
        =
        useState("All");

    const [loading,
        setLoading]
        =
        useState(true);

    useEffect(() => {

        fetchFeedbacks();

        const interval =
            setInterval(
                fetchFeedbacks,
                5000
            );

        return () =>
            clearInterval(
                interval
            );

    }, []);

    const fetchFeedbacks =
        async () => {

            try {

                const response =
                    await fetch(
`${API_BASE}/feedback/getFeedbacks.php`
                    );

                const data =
                    await response.json();

                setFeedbacks(
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

    const deleteFeedback =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "Delete feedback?"
                );

            if(
                !confirmDelete
            ) return;

            try {

                await fetch(
`${API_BASE}/feedback/deleteFeedback.php?id=${id}`
                );

                fetchFeedbacks();

            } catch(error){

                console.log(
                    error
                );
            }
        };

    const filteredFeedbacks =
        useMemo(() => {

            return feedbacks.filter(
                item => {

                    const searchMatch =
                        item.feedback
                        ?.toLowerCase()
                        .includes(
                            search
                            .toLowerCase()
                        )

                        ||

                        item.table_number
                        ?.includes(
                            search
                        );

                    const ratingMatch =
                        ratingFilter ===
                        "All"

                        ||

                        Number(
                            item.rating
                        )
                        ===
                        Number(
                            ratingFilter
                        );

                    return (
                        searchMatch
                        &&
                        ratingMatch
                    );
                }
            );

        },[
            feedbacks,
            search,
            ratingFilter
        ]);
            return (

        <AdminLayout>

            <div className="space-y-8">

                {/* Header */}
                <div>

                    <h1 className="text-white text-4xl md:text-6xl font-bold">

                        Customer Feedback

                    </h1>

                    <p className="text-gray-400 mt-3 text-lg">

                        View customer reviews & dining experience

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
                            placeholder="Search feedback or table..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            className="bg-transparent outline-none text-white ml-4 w-full"
                        />

                    </div>

                    {/* Rating Filter */}
                    <div className="flex flex-wrap gap-3 mt-6">

                        {[
                            "All",
                            5,
                            4,
                            3,
                            2,
                            1
                        ].map(item => (

                            <button
                                type="button"
                                key={item}
                                onClick={() =>
                                    setRatingFilter(
                                        item
                                    )
                                }
                                className={`px-5 py-3 rounded-2xl border duration-300
                                ${
                                    ratingFilter === item
                                    ? "bg-violet-600 border-violet-500 text-white"
                                    : "bg-white/5 border-white/10 text-gray-300"
                                }`}
                            >

                                {item}
                                {
                                    item !== "All"
                                    &&
                                    " ⭐"
                                }

                            </button>
                        ))}

                    </div>

                </div>

                {/* Feedback Cards */}
                {
                    loading

                    ? (

                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                            {
                                [...Array(6)].map(
                                    (_, i) => (

                                        <div
                                            key={i}
                                            className="h-[300px] rounded-[35px] bg-white/5 animate-pulse"
                                        />
                                    )
                                )
                            }

                        </div>

                    )

                    : (

                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                            {
                                filteredFeedbacks.map(
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
                                            className="bg-white/5 border border-white/10 rounded-[35px] p-6 backdrop-blur-xl hover:border-violet-500/20 duration-300"
                                        >

                                            {/* Top */}
                                            <div className="flex justify-between items-start">

                                                <div>

                                                    <h2 className="text-white text-2xl font-bold">

                                                        Table {
                                                            item.table_number
                                                        }

                                                    </h2>

                                                    <p className="text-gray-400 mt-2 text-sm">

                                                        {
                                                            item.created_at
                                                        }

                                                    </p>

                                                </div>

                                                <button
                                                    onClick={() =>
                                                        deleteFeedback(
                                                            item.id
                                                        )
                                                    }
                                                    className="text-red-400 hover:text-red-500 duration-300"
                                                >

                                                    <Trash2
                                                        size={22}
                                                    />

                                                </button>

                                            </div>

                                            {/* Mood */}
                                            <div className="text-5xl mt-6">

                                                {
                                                    item.mood
                                                }

                                            </div>

                                            {/* Rating */}
                                            <div className="flex gap-1 mt-5">

                                                {
                                                    [...Array(
                                                        Number(
                                                            item.rating
                                                        )
                                                    )].map(
                                                        (
                                                            _,
                                                            i
                                                        ) => (

                                                            <Star
                                                                key={i}
                                                                size={20}
                                                                className="fill-yellow-400 text-yellow-400"
                                                            />
                                                        )
                                                    )
                                                }

                                            </div>

                                            {/* Feedback */}
                                            <p className="text-gray-300 leading-8 mt-5 min-h-[120px]">

                                                "
                                                {
                                                    item.feedback
                                                }
                                                "

                                            </p>

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