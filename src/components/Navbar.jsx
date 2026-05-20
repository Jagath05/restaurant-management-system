import React, {
    useState,
    useEffect
} from "react";

import {
    Search,
    Menu,
    X
} from "lucide-react";

import {
    Link,
    NavLink,
    useNavigate
} from "react-router-dom";

import {
    motion,
    AnimatePresence
} from "framer-motion";

export default function Navbar() {

    const navigate =
        useNavigate();

    const [openMenu,
        setOpenMenu] =
        useState(false);

    const [scrolled,
        setScrolled] =
        useState(false);

    const [search,
        setSearch] =
        useState("");

    const [foods,
        setFoods] =
        useState([]);

    const [showResults,
        setShowResults] =
        useState(false);

    const API_URL =
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api/menu/getFoods.php";

    useEffect(() => {

        const handleScroll =
            () => {

                setScrolled(
                    window.scrollY > 40
                );
            };

        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll
            );

    }, []);

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

                setFoods(
                    Array.isArray(
                        data
                    )
                        ? data.filter(
                            item =>
                                item.available ===
                                "1"
                        )
                        : []
                );

            } catch(error){

                console.log(
                    error
                );
            }
        };

    const filteredResults =
        foods.filter(
            item =>
                item.food_name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        )
        .slice(0, 6);

    const handleSearchNavigation =
        (item) => {

            const category =
                item.category
                    .toLowerCase();

            navigate(
                `/${category}`
            );

            setSearch("");

            setShowResults(
                false
            );
        };

  const navItems = [
    ["Home", "/"],
    ["Menu", "#menu"],
    ["About Us", "/about"],
    ["Reserve Table", "/reservation"],
    ["Track Order", "/order-status"],
    ["Feedback", "/feedback"]
];

    const navStyle =
        ({ isActive }) =>
            `relative px-5 py-3 rounded-2xl font-medium transition-all duration-500 text-[15px]
        ${
            isActive
                ? "bg-violet-500/20 text-violet-300 border border-violet-500/30 shadow-[0_0_30px_rgba(124,58,237,0.25)]"
                : "text-gray-300 hover:text-white hover:bg-white/5"
        }`;

    return (

        <motion.nav
            initial={{
                y: -100,
                opacity: 0
            }}
            animate={{
                y: 0,
                opacity: 1
            }}
            transition={{
                duration: 0.7
            }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
            ${
                scrolled
                    ? "bg-[#140f22]/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
                    : "bg-transparent"
            }`}
        >

            {/* Floating Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">

                <div className="absolute -top-10 left-[10%] w-72 h-72 bg-violet-600/10 rounded-full blur-[120px]" />

                <div className="absolute -top-10 right-[10%] w-72 h-72 bg-pink-600/10 rounded-full blur-[120px]" />

            </div>

            <div className={`relative max-w-[1600px] mx-auto px-5 lg:px-10 flex items-center justify-between transition-all duration-500
            ${
                scrolled
                    ? "h-[75px]"
                    : "h-[95px]"
            }`}>

                {/* LOGO */}
                <Link
                    to="/"
                    className="flex items-center gap-4 shrink-0 group"
                >

                    <motion.div
                        whileHover={{
                            rotate: 8,
                            scale: 1.08
                        }}
                        className="relative w-14 h-14 rounded-3xl bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.4)] overflow-hidden"
                    >

                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 duration-500" />

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-7 h-7 relative z-10"
                        >
                            <path d="M5 16L3 7l5 4 4-6 4 6 5-4-2 9H5zm0 2h14v2H5v-2z" />
                        </svg>

                    </motion.div>

                    <div>

                        <h1 className="text-white text-xl md:text-2xl font-bold tracking-wide">

                            The Royal Taste

                        </h1>

                        <p className="text-yellow-300 text-xs tracking-[3px] uppercase">

                            Luxury Dining

                        </p>

                    </div>

                </Link>
                                {/* DESKTOP MENU */}
                <ul className="hidden xl:flex items-center gap-2">

                    {
                        navItems.map(
                            ([name, path]) => (

                                <motion.li
                                    whileHover={{
                                        y: -2
                                    }}
                                    key={name}
                                >

                                 {
    name === "Menu"

    ? (

        <button
           onClick={() => {

    if(
        window.location.pathname
        !== "/"
    ){

        navigate(
            "/#menu"
        );

        setTimeout(() => {

            const section =
                document.getElementById(
                    "menu"
                );

            section?.scrollIntoView({
                behavior:
                "smooth"
            });

        }, 300);

    }

    else {

        const section =
            document.getElementById(
                "menu"
            );

        section?.scrollIntoView({
            behavior:
            "smooth"
        });
    }
}}
            className="relative px-5 py-3 rounded-2xl font-medium transition-all duration-500 text-[15px] text-gray-300 hover:text-white hover:bg-white/5"
        >

            Menu

        </button>

    ) : (

        <NavLink
            to={path}
            className={
                navStyle
            }
        >

            {name}

        </NavLink>

    )
}

                                </motion.li>
                            )
                        )
                    }

                </ul>

                {/* RIGHT SIDE */}
                <div className="hidden lg:flex items-center gap-5">

                    {/* Search */}
                    <div className="relative">

                        <motion.div
                            whileHover={{
                                scale: 1.02
                            }}
                            className="hidden xl:flex items-center bg-white/5 border border-white/10 px-5 py-3 rounded-2xl w-[300px] hover:border-violet-500/40 transition-all duration-500"
                        >

                            <Search
                                size={18}
                                className="text-violet-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onFocus={() =>
                                    setShowResults(
                                        true
                                    )
                                }
                                onChange={(e)=>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                placeholder="Search delicious food..."
                                className="bg-transparent outline-none text-white placeholder:text-gray-500 ml-4 w-full"
                            />

                        </motion.div>

                        {/* Search Results */}
                        {
                            showResults &&
                            search &&
                            filteredResults.length > 0 && (

                                <div className="absolute top-[70px] right-0 w-[320px] bg-[#1c152d]/95 backdrop-blur-2xl border border-white/10 rounded-[30px] p-3 shadow-2xl z-[99999]">

                                    {
                                        filteredResults.map(
                                            item => (

                                                <button
                                                    key={
                                                        item.id
                                                    }
                                                    onClick={() =>
                                                        handleSearchNavigation(
                                                            item
                                                        )
                                                    }
                                                    className="w-full text-left p-4 rounded-2xl hover:bg-white/5 duration-300 border border-transparent hover:border-violet-500/20"
                                                >

                                                    <h3 className="text-white font-semibold">

                                                        {
                                                            item.food_name
                                                        }

                                                    </h3>

                                                    <p className="text-gray-400 text-sm mt-1">

                                                        {
                                                            item.category
                                                        }
                                                        {" • "}
                                                        {
                                                            item.section
                                                        }

                                                    </p>

                                                </button>
                                            )
                                        )
                                    }

                                </div>
                            )
                        }

                    </div>

                </div>

                {/* MOBILE BUTTON */}
                <motion.button
                    whileTap={{
                        scale: 0.9
                    }}
                    onClick={() =>
                        setOpenMenu(
                            !openMenu
                        )
                    }
                    className="lg:hidden text-white"
                >

                    {
                        openMenu
                            ? <X size={32} />
                            : <Menu size={32} />
                    }

                </motion.button>

            </div>
                        {/* MOBILE MENU */}
            <AnimatePresence>

                {
                    openMenu && (

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -20
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            exit={{
                                opacity: 0,
                                y: -20
                            }}
                            transition={{
                                duration: 0.3
                            }}
                            className="lg:hidden bg-[#140f22]/95 backdrop-blur-2xl border-t border-white/10 overflow-hidden"
                        >

                            <div className="px-5 py-6">

                                {/* Mobile Search */}
                                <div className="relative">

                                    <div className="flex items-center bg-white/5 border border-white/10 px-5 py-4 rounded-2xl">

                                        <Search
                                            size={20}
                                            className="text-violet-400"
                                        />

                                        <input
                                            type="text"
                                            value={search}
                                            onFocus={() =>
                                                setShowResults(
                                                    true
                                                )
                                            }
                                            onChange={(e)=>
                                                setSearch(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Search food..."
                                            className="bg-transparent outline-none text-white placeholder:text-gray-500 w-full ml-4"
                                        />

                                    </div>

                                    {/* Mobile Results */}
                                    {
                                        showResults &&
                                        search &&
                                        filteredResults.length > 0 && (

                                            <div className="mt-4 bg-white/5 border border-white/10 rounded-[30px] p-3">

                                                {
                                                    filteredResults.map(
                                                        item => (

                                                            <button
                                                                key={
                                                                    item.id
                                                                }
                                                                onClick={() => {

                                                                    handleSearchNavigation(
                                                                        item
                                                                    );

                                                                    setOpenMenu(
                                                                        false
                                                                    );
                                                                }}
                                                                className="w-full text-left p-4 rounded-2xl hover:bg-white/5 duration-300"
                                                            >

                                                                <h3 className="text-white font-semibold">

                                                                    {
                                                                        item.food_name
                                                                    }

                                                                </h3>

                                                                <p className="text-gray-400 text-sm mt-1">

                                                                    {
                                                                        item.category
                                                                    }

                                                                </p>

                                                            </button>
                                                        )
                                                    )
                                                }

                                            </div>
                                        )
                                    }

                                </div>

                                {/* Mobile Links */}
                                <ul className="flex flex-col gap-3 mt-8">

                                    {
                                        navItems.map(
                                            ([name, path]) => (

                                                <motion.li
                                                    initial={{
                                                        opacity: 0,
                                                        x: -30
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0
                                                    }}
                                                    transition={{
                                                        duration: 0.3
                                                    }}
                                                    key={name}
                                                >

                                                    {
    name === "Menu"

    ? (

        <button
            onClick={() => {

    setOpenMenu(
        false
    );

    if(
        window.location.pathname
        !== "/"
    ){

        navigate(
            "/#menu"
        );

        setTimeout(() => {

            const section =
                document.getElementById(
                    "menu"
                );

            section?.scrollIntoView({
                behavior:
                "smooth"
            });

        }, 300);

    }

    else {

        const section =
            document.getElementById(
                "menu"
            );

        section?.scrollIntoView({
            behavior:
            "smooth"
        });
    }
}}
            className="w-full text-left relative px-5 py-3 rounded-2xl font-medium text-gray-300 hover:text-white hover:bg-white/5"
        >

            Menu

        </button>

    ) : (

        <NavLink
            to={path}
            onClick={() =>
                setOpenMenu(
                    false
                )
            }
            className={
                navStyle
            }
        >

            {name}

        </NavLink>

    )
}

                                                </motion.li>
                                            )
                                        )
                                    }

                                </ul>

                            </div>

                        </motion.div>
                    )
                }

            </AnimatePresence>

        </motion.nav>
    );
}