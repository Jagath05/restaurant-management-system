import React, {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

export default function TabletSetup() {

    const navigate =
        useNavigate();

    const [tableNo,
        setTableNo] =
        useState("");

    const handleSave =
        () => {

        if(!tableNo){

            alert(
                "Select table number"
            );

            return;
        }

        localStorage.setItem(
            "tableNumber",
            tableNo
        );

        alert(
            `Tablet Assigned To Table ${tableNo}`
        );

        navigate("/");
    };

    return (

        <section className="min-h-screen bg-[#262235] flex items-center justify-center px-5">

            <div className="w-full max-w-lg bg-white/5 border border-white/10 rounded-[35px] p-10 shadow-2xl backdrop-blur-xl">

                <h1 className="text-white text-5xl font-bold text-center">

                    Tablet Setup

                </h1>

                <p className="text-gray-400 text-center mt-4">

                    Assign this tablet to a restaurant table

                </p>

                <select
                    value={tableNo}
                    onChange={(e) =>
                        setTableNo(
                            e.target.value
                        )
                    }
                    className="w-full bg-[#312B45] border border-white/10 rounded-2xl p-5 text-white outline-none mt-10"
                >

                    <option value="">
                        Select Table
                    </option>

                    {
                        Array.from(
                            { length: 10 },
                            (_, i) => (

                            <option
                                key={i}
                                value={i + 1}
                            >
                                Table {i + 1}
                            </option>
                        ))
                    }

                </select>

                <button
                    onClick={
                        handleSave
                    }
                    className="w-full mt-8 bg-violet-600 hover:bg-violet-700 py-5 rounded-2xl text-white text-xl font-bold"
                >

                    Save Table

                </button>

            </div>

        </section>
    );
}