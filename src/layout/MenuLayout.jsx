import React, {
    useEffect,
    useMemo,
    useState,
    useContext
} from "react";

import {
    motion
} from "framer-motion";
import {
    Search
} from "lucide-react";
import {
    CartContext
} from "../context/CartContext";

import FoodCard from "../components/FoodCard";
import Cart from "../components/Cart";
import Navbar from "../components/Navbar";

import {
    useNavigate
} from "react-router-dom";


export default function MenuLayout({
    meal
}) {

    const navigate =
        useNavigate();
        
    const {
    showCart
            } = useContext(
    CartContext
            );

    const [foods,
        setFoods] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    const [search,
        setSearch] =
        useState("");

    const [foodType,
        setFoodType] =
        useState("All");

    const [section,
        setSection] =
        useState("All");

    const API_URL =
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api/menu/getFoods.php";

    useEffect(() => {

        fetchFoods();

    }, [meal]);

    const fetchFoods =
        async () => {

            try {

                setLoading(true);

                const response =
                    await fetch(
                        API_URL
                    );

                const data =
                    await response.json();

                const filtered =
                    Array.isArray(
                        data
                    )

                    ? data.filter(
                        (
                            item
                        ) =>

                            item.category ===
                            meal &&

                            item.available ===
                            "1"
                    )

                    : [];

                setFoods(
                    filtered
                );

            } catch (error) {

                console.log(
                    "Fetch Error:",
                    error
                );

            } finally {

                setLoading(false);
            }
        };

    // Dynamic Filtering
    const filteredFoods =
        useMemo(() => {

            return foods.filter(
                (food) => {

                    const searchMatch =
                        food.food_name
                        .toLowerCase()
                        .includes(
                            search
                            .toLowerCase()
                        );

                    const typeMatch =
                        foodType ===
                        "All"

                        ? true

                        : food.food_type ===
                        foodType;

                    const sectionMatch =
                        section ===
                        "All"

                        ? true

                        : food.section ===
                        section;

                    return (
                        searchMatch &&
                        typeMatch &&
                        sectionMatch
                    );
                }
            );

        }, [
            foods,
            search,
            foodType,
            section
        ]);

    const starters =
        filteredFoods.filter(
            item =>
                item.section ===
                "Starter"
        );

    const mainCourse =
        filteredFoods.filter(
            item =>
                item.section ===
                "Main Course"
        );

    const sideDish =
        filteredFoods.filter(
            item =>
                item.section ===
                "Side Dish"
        );

    const filterBtn =
        (
            active,
            value
        ) =>
            `px-5 py-3 rounded-2xl border text-sm md:text-base transition-all duration-300
        ${
            active === value
                ? "bg-violet-600 border-violet-500 text-white shadow-[0_0_25px_rgba(124,58,237,0.35)]"
                : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
        }`;

    return (

        <>

            <Navbar />

<section className="min-h-screen bg-[#181325] px-5 md:px-10 pt-36 pb-20">

     <div className="flex flex-col xl:flex-row gap-8 relative">
        <div
    className={`transition-all duration-500
    ${
        showCart
        ? "xl:w-[68%]"
        : "w-full"
    }`}
>
                {/* Heading */}
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
                    className="mb-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >

                    <div>

                        <p className="text-violet-400 uppercase tracking-[5px] text-sm mb-2">

                            Premium Dining

                        </p>

                        <h1 className="text-white text-[42px] md:text-[70px] font-bold">

                            {meal} Menu

                        </h1>

                        <p className="text-gray-400 text-lg md:text-2xl mt-3">

                            Explore our delicious{" "}
                            {meal.toLowerCase()}
                            {" "}special dishes.

                        </p>

                    </div>

                    <button
                        onClick={() =>
                            navigate("/")
                        }
                        className="bg-white/5 border border-white/10 backdrop-blur-md px-7 py-4 rounded-2xl text-white hover:bg-violet-600/20 hover:scale-105 duration-300"
                    >

                        ← Back Home

                    </button>

                </motion.div>

                {/* Filter Bar */}
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
                        delay: 0.2
                    }}
                    className="bg-white/5 border border-white/10 rounded-[35px] p-5 md:p-8 backdrop-blur-xl mb-14"
                >

                    {/* Search */}
                    <div className="flex items-center bg-[#231b38] rounded-2xl px-5 py-4 mb-8 border border-white/10">

                        <Search
                            size={20}
                            className="text-violet-400"
                        />

                        <input
                            type="text"
                            placeholder="Search delicious food..."
                            value={
                                search
                            }
                            onChange={
                                (
                                    e
                                ) =>
                                    setSearch(
                                        e
                                        .target
                                        .value
                                    )
                            }
                            className="bg-transparent outline-none text-white placeholder:text-gray-500 ml-4 w-full"
                        />

                    </div>

                    {/* Food Type */}
                    <div className="mb-8">

                        <h3 className="text-white text-lg font-semibold mb-4">

                            Food Type

                        </h3>

                        <div className="flex flex-wrap gap-3">

                            {
                                [
                                    "All",
                                    "Veg",
                                    "Non-Veg"
                                ].map(
                                    item => (

                                        <button
                                            key={item}
                                            onClick={() =>
                                                setFoodType(
                                                    item
                                                )
                                            }
                                            className={filterBtn(
                                                foodType,
                                                item
                                            )}
                                        >

                                            {item}

                                        </button>
                                    )
                                )
                            }

                        </div>

                    </div>

                    {/* Section */}
                    <div>

                        <h3 className="text-white text-lg font-semibold mb-4">

                            Section

                        </h3>

                        <div className="flex flex-wrap gap-3">

                            {
                                [
                                    "All",
                                    "Starter",
                                    "Main Course",
                                    "Side Dish"
                                ].map(
                                    item => (

                                        <button
                                            key={item}
                                            onClick={() =>
                                                setSection(
                                                    item
                                                )
                                            }
                                            className={filterBtn(
                                                section,
                                                item
                                            )}
                                        >

                                            {item}

                                        </button>
                                    )
                                )
                            }

                        </div>

                    </div>

                </motion.div>

                {/* Loading */}
                {
                    loading && (

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {
                                [...Array(6)].map(
                                    (_, i) => (

                                        <div
                                            key={i}
                                            className="h-[350px] rounded-[35px] bg-white/5 animate-pulse"
                                        />
                                    )
                                )
                            }

                        </div>
                    )
                }

                {/* Menu */}
                {
    !loading && (

        <>
           {
                  [
                     "Breakfast",
                     "Lunch",
                     "Dinner"
                    ].includes(meal)

                ? (

                    <div className="space-y-16">

                        {/* Starters */}
                        {
                            starters.length > 0 && (

                                <div>

                                    <h2 className="text-white text-4xl font-bold mb-8">

                                        Starters

                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                        {
                                            starters.map(
                                                item => (

                                                    <FoodCard
                                                        key={item.id}
                                                        item={item}
                                                    />
                                                )
                                            )
                                        }

                                    </div>

                                </div>
                            )
                        }

                        {/* Main Course */}
                        {
                            mainCourse.length > 0 && (

                                <div>

                                    <h2 className="text-white text-4xl font-bold mb-8">

                                        Main Course

                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                        {
                                            mainCourse.map(
                                                item => (

                                                    <FoodCard
                                                        key={item.id}
                                                        item={item}
                                                    />
                                                )
                                            )
                                        }

                                    </div>

                                </div>
                            )
                        }

                        {/* Side Dish */}
                        {
                            sideDish.length > 0 && (

                                <div>

                                    <h2 className="text-white text-4xl font-bold mb-8">

                                        Side Dish

                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                        {
                                            sideDish.map(
                                                item => (

                                                    <FoodCard
                                                        key={item.id}
                                                        item={item}
                                                    />
                                                )
                                            )
                                        }

                                    </div>

                                </div>
                            )
                        }

                        {
    starters.length === 0 &&
    mainCourse.length === 0 &&
    sideDish.length === 0 && (

        <div className="text-center py-20">

            <h2 className="text-white text-4xl font-bold mb-4">

                🍽 No Foods Found

            </h2>

            <p className="text-gray-400 text-lg">

                Try changing filters
                or search.

            </p>

        </div>
    )
}

                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {
                            filteredFoods.map(
                                item => (

                                    <FoodCard
                                        key={item.id}
                                        item={item}
                                    />
                                )
                            )
                        }

                    </div>
                )
            }
        </>
    )
}

                {/* Empty */}
                {
                    !loading &&
                    filteredFoods.length ===
                    0 && (

                        <div className="text-center py-28">

                            <h2 className="text-white text-4xl font-bold mb-4">

                                🍽 No Foods Found

                            </h2>

                            <p className="text-gray-400 text-lg">

                                Try changing
                                filters or search.

                            </p>

                        </div>
                    )
                }

           </div>

        {/* Desktop Fixed Cart */}
{
    showCart && (

        <div className="hidden xl:block xl:w-[32%] sticky top-28 h-[calc(100vh-140px)]">

            <div className="h-full overflow-hidden rounded-[40px] border border-white/10 bg-[#140f22]/95 backdrop-blur-3xl shadow-[0_0_60px_rgba(124,58,237,0.12)]">

                <Cart
                    fixedMode={true}
                />

            </div>

        </div>
    )
}

{/* Mobile Drawer */}
<div className="xl:hidden">

    <Cart />

</div>

</div>

</section>

        </>
    );
}