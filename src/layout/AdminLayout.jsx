import React from "react";

import {
    LayoutDashboard,
    UtensilsCrossed,
    CalendarDays,
    ShoppingBag,
    TableProperties,
    LogOut
}
from "lucide-react";

import {
    NavLink,
    useNavigate
}
from "react-router-dom";

export default function AdminLayout({
    children
}) {

    const navigate =
        useNavigate();

    const handleLogout =
        () => {

        localStorage.removeItem(
            "admin"
        );

        navigate(
            "/admin"
        );
    };

    const menu = [

        {
            name: "Dashboard",
            icon: <LayoutDashboard />,
            path: "/dashboard"
        },

        {
            name: "Manage Menu",
            icon: <UtensilsCrossed />,
            path: "/manage-menu"
        },

        {
            name: "Reservations",
            icon: <CalendarDays />,
            path: "/reservations"
        },

        {
            name: "Manage Orders",
            icon: <ShoppingBag />,
            path: "/manage-orders"
        },

        {
            name: "Tables",
            icon: <TableProperties />,
            path: "/tablet-setup"
        },

        {
    name: "Table Management",
    icon: <TableProperties />,
    path: "/table-management"
}

    ];

    return (

        <section className="min-h-screen bg-[#262235] flex">

            {/* Sidebar */}
            <div className="w-[300px] bg-white/5 border-r border-white/10 backdrop-blur-xl p-8 flex flex-col">

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
                <div className="mt-12 flex flex-col gap-4">

                    {
                        menu.map(
                            (item) => (

                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({
                                    isActive
                                }) =>
                                    `flex items-center gap-4 px-5 py-4 rounded-2xl duration-300 ${
                                        isActive
                                        ? "bg-violet-600 text-white"
                                        : "text-gray-300 hover:bg-white/10"
                                    }`
                                }
                            >

                                {item.icon}

                                {item.name}

                            </NavLink>
                        ))
                    }

                </div>

                {/* Logout */}
                <button
                    onClick={
                        handleLogout
                    }
                    className="mt-auto flex items-center gap-3 bg-red-500 hover:bg-red-600 duration-300 px-5 py-4 rounded-2xl text-white"
                >

                    <LogOut />

                    Logout

                </button>

            </div>

            {/* Content */}
            <div className="flex-1 p-10">

                {children}

            </div>

        </section>
    );
}