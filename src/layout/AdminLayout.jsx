import React, {
    useState
} from "react";

import {
    LayoutDashboard,
    UtensilsCrossed,
    CalendarDays,
    ShoppingBag,
    TableProperties,
    LogOut,
    Menu,
    X,
    Star
} from "lucide-react";

import {
    NavLink,
    useNavigate
} from "react-router-dom";

import {
    motion,
    AnimatePresence
} from "framer-motion";

export default function AdminLayout({
    children
}) {

    const navigate =
        useNavigate();

    const [open,
        setOpen] =
        useState(false);

    const handleLogout =
        () => {

            localStorage.removeItem(
                "admin"
            );

            window.location.href =
                "/admin";
        };

    const menu = [

        {
            name:
                "Dashboard",

            icon:
                <LayoutDashboard
                    size={22}
                />,

            path:
                "/dashboard"
        },

        {
            name:
                "Manage Menu",

            icon:
                <UtensilsCrossed
                    size={22}
                />,

            path:
                "/manage-menu"
        },

        {
            name:
                "Reservations",

            icon:
                <CalendarDays
                    size={22}
                />,

            path:
                "/reservations"
        },

        {
            name:
                "Manage Orders",

            icon:
                <ShoppingBag
                    size={22}
                />,

            path:
                "/manage-orders"
        },

        {
            name:
                "Tables",

            icon:
                <TableProperties
                    size={22}
                />,

            path:
                "/tablet-setup"
        },

        {
            name:
                "Table Management",

            icon:
                <TableProperties
                    size={22}
                />,

            path:
                "/table-management"
        },

        {
    name: "Feedback",
    icon: <Star />,
    path: "/manage-feedback"
}
    ];

    const navClass =
        ({ isActive }) =>
            `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group
        ${
            isActive
                ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-[0_0_25px_rgba(124,58,237,0.35)]"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
        }`;

    return (

        <section className="min-h-screen bg-[#181325] flex overflow-hidden">

            {/* MOBILE TOPBAR */}
            <div className="lg:hidden fixed top-0 left-0 w-full h-[80px] bg-[#181325]/95 backdrop-blur-xl border-b border-white/10 z-[999] flex items-center justify-between px-5">

                <div>

                    <h1 className="text-white text-2xl font-bold">

                        Admin Panel

                    </h1>

                    <p className="text-gray-400 text-sm">

                        Restaurant Management

                    </p>

                </div>

                <button
                    onClick={() =>
                        setOpen(
                            true
                        )
                    }
                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
                >

                    <Menu />

                </button>

            </div>

            {/* DESKTOP SIDEBAR */}
            <aside className="hidden lg:flex w-[320px] bg-white/5 border-r border-white/10 backdrop-blur-2xl flex-col sticky top-0 h-screen p-8">

                {/* Logo */}
                <div>

                    <h1 className="text-white text-4xl font-bold">

                        Admin Panel

                    </h1>

                    <p className="text-gray-400 mt-2">

                        Restaurant Management

                    </p>

                </div>

                {/* Menu */}
                <div className="mt-12 flex flex-col gap-4 flex-1">

                    {
                        menu.map(
                            item => (

                                <NavLink
                                    key={
                                        item.name
                                    }
                                    to={
                                        item.path
                                    }
                                    className={
                                        navClass
                                    }
                                >

                                    {item.icon}

                                    <span className="font-medium text-[16px]">

                                        {
                                            item.name
                                        }

                                    </span>

                                </NavLink>
                            )
                        )
                    }

                </div>

                {/* Logout */}
                <button
                    onClick={
                        handleLogout
                    }
                    className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:scale-[1.02] py-5 rounded-3xl text-white font-bold duration-300 shadow-lg flex items-center justify-center gap-3"
                >

                    <LogOut
                        size={20}
                    />

                    Logout

                </button>

            </aside>

            {/* MOBILE DRAWER */}
            <AnimatePresence>

                {
                    open && (

                        <>

                            {/* Overlay */}
                            <motion.div
                                initial={{
                                    opacity: 0
                                }}
                                animate={{
                                    opacity: 1
                                }}
                                exit={{
                                    opacity: 0
                                }}
                                onClick={() =>
                                    setOpen(
                                        false
                                    )
                                }
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
                            />

                            {/* Drawer */}
                            <motion.aside
                                initial={{
                                    x: -350
                                }}
                                animate={{
                                    x: 0
                                }}
                                exit={{
                                    x: -350
                                }}
                                transition={{
                                    type: "spring",
                                    damping: 24
                                }}
                                className="fixed top-0 left-0 w-[320px] h-screen bg-[#181325] border-r border-white/10 backdrop-blur-2xl z-[9999] p-8 flex flex-col"
                            >

                                {/* Header */}
                                <div className="flex justify-between items-center">

                                    <div>

                                        <h1 className="text-white text-3xl font-bold">

                                            Admin

                                        </h1>

                                        <p className="text-gray-400 text-sm mt-1">

                                            Restaurant Panel

                                        </p>

                                    </div>

                                    <button
                                        onClick={() =>
                                            setOpen(
                                                false
                                            )
                                        }
                                        className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white"
                                    >

                                        <X />

                                    </button>

                                </div>

                                {/* Nav */}
                                <div className="mt-10 flex flex-col gap-4 flex-1">

                                    {
                                        menu.map(
                                            item => (

                                                <NavLink
                                                    key={
                                                        item.name
                                                    }
                                                    to={
                                                        item.path
                                                    }
                                                    onClick={() =>
                                                        setOpen(
                                                            false
                                                        )
                                                    }
                                                    className={
                                                        navClass
                                                    }
                                                >

                                                    {
                                                        item.icon
                                                    }

                                                    {
                                                        item.name
                                                    }

                                                </NavLink>
                                            )
                                        )
                                    }

                                </div>

                                {/* Logout */}
                                <button
                                    onClick={
                                        handleLogout
                                    }
                                    className="w-full bg-gradient-to-r from-red-500 to-rose-600 py-5 rounded-3xl text-white font-bold flex items-center justify-center gap-3"
                                >

                                    <LogOut
                                        size={20}
                                    />

                                    Logout

                                </button>

                            </motion.aside>

                        </>
                    )
                }

            </AnimatePresence>

            {/* PAGE CONTENT */}
            <main className="flex-1 min-h-screen pt-[100px] lg:pt-10 p-5 md:p-10 overflow-auto">

                {children}

            </main>

        </section>
    );
}