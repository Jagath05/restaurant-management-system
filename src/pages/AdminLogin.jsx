import React, {
    useState,
    useEffect
} from "react";

export default function AdminLogin() {

    useEffect(() => {

        const admin =
            localStorage.getItem(
                "admin"
            );

        if(admin){

            window.location.href =
                "/dashboard";
        }

    }, []);

    const [form,
        setForm] =
        useState({
            username: "",
            password: ""
        });

    const [loading,
        setLoading] =
        useState(false);

    const [message,
        setMessage] =
        useState("");

    const handleChange =
        (e) => {

            setForm({
                ...form,
                [e.target.name]:
                    e.target.value
            });
        };

    const handleLogin =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);
                setMessage("");

                const response =
                    await fetch(
                        "/restaurant-api/admin/login.php",
                        {
                            method:
                                "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    username:
                                        form.username,

                                    password:
                                        form.password
                                })
                        }
                    );

                const text =
                    await response.text();

                console.log(
                    "Login API Response:",
                    text
                );

                let data;

                try {

                    data =
                        JSON.parse(
                            text
                        );

                } catch {

                    setMessage(
                        "Server Error"
                    );

                    return;
                }

                if(data.success){

                    localStorage.setItem(
                        "admin",
                        JSON.stringify(
                            data.admin
                        )
                    );

                    window.location.href =
                        "/dashboard";

                } else {

                    setMessage(
                        data.message
                    );
                }

            } catch(error){

                console.log(error);

                setMessage(
                    "Login Failed"
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <section className="min-h-screen bg-[#262235] flex items-center justify-center px-5">

            <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[35px] p-10 backdrop-blur-xl shadow-2xl">

                <h1 className="text-white text-5xl font-bold text-center">

                    Admin Login

                </h1>

                <form
                    onSubmit={
                        handleLogin
                    }
                    className="mt-10 space-y-6"
                >

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={
                            form.username
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full bg-[#312B45] rounded-2xl p-5 text-white"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={
                            form.password
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full bg-[#312B45] rounded-2xl p-5 text-white"
                    />

                    <button
                        type="submit"
                        disabled={
                            loading
                        }
                        className="w-full bg-violet-600 py-5 rounded-2xl text-white"
                    >

                        {
                            loading
                            ? "Logging In..."
                            : "Login"
                        }

                    </button>

                </form>

                {
                    message && (

                        <p className="text-red-400 text-center mt-5">

                            {message}

                        </p>
                    )
                }

            </div>

        </section>
    );
}