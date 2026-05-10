import React from "react";
import AdminLayout from "../../layout/AdminLayout";

export default function Dashboard() {

    const stats = [

        {
            title: "Orders",
            count: 120
        },

        {
            title: "Reservations",
            count: 45
        },

        {
            title: "Foods",
            count: 80
        },

        {
            title: "Tables",
            count: 10
        }

    ];

    return (

        <AdminLayout>

            <div>

                <h1 className="text-white text-6xl font-bold">
                    Dashboard
                </h1>

                <p className="text-gray-400 mt-3 text-xl">
                    Welcome back Admin
                </p>

                {/* Cards */}
                <div className="grid grid-cols-4 gap-8 mt-12">

                    {
                        stats.map((item) => (

                            <div
                                key={item.title}
                                className="bg-white/5 border border-white/10 rounded-[35px] p-8 shadow-2xl backdrop-blur-xl hover:border-violet-500 duration-300"
                            >

                                <h2 className="text-gray-400 text-lg">
                                    {item.title}
                                </h2>

                                <h1 className="text-white text-5xl font-bold mt-4">
                                    {item.count}
                                </h1>

                            </div>

                        ))
                    }

                </div>

            </div>

        </AdminLayout>
    );
}