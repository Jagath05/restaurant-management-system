import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const [message, setMessage] =
        useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value
        });
    };

    const handleLogin =
        async (e) => {

        e.preventDefault();

        const response =
            await fetch(
                "http://localhost/restaurant-api/admin/login.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify(form)
                }
            );

        const data =
            await response.json();

        setMessage(data.message);

        if(data.success){

            localStorage.setItem(
                "admin",
                "true"
            );

            navigate(
                "/dashboard"
            );
        }
    };

    return (

        <section className="min-h-screen bg-[#262235] flex items-center justify-center px-5">

            <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[35px] p-10 backdrop-blur-xl shadow-2xl">

                <h1 className="text-white text-5xl font-bold text-center">
                    Admin Login
                </h1>

                <p className="text-gray-400 text-center mt-3">
                    Restaurant Management
                </p>

                <form
                    onSubmit={handleLogin}
                    className="mt-10 space-y-6"
                >

                    {/* Username */}
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full bg-[#312B45] border border-white/10 rounded-2xl p-5 text-white outline-none"
                    />

                    {/* Password */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full bg-[#312B45] border border-white/10 rounded-2xl p-5 text-white outline-none"
                    />

                    {/* Button */}
                    <button
                        className="w-full bg-violet-600 hover:bg-violet-700 py-5 rounded-2xl text-white text-lg font-semibold duration-300"
                    >
                        Login
                    </button>

                </form>

                {/* Message */}
                {
                    message && (

                        <p className="text-center mt-6 text-violet-400">

                            {message}

                        </p>
                    )
                }

            </div>

        </section>
    );
}