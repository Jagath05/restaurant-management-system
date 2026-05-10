import React,
{
  useState
}
from "react";

import Navbar
from "../components/Navbar";

export default function Feedback() {

  const [feedback,
    setFeedback]
    =
    useState("");

  const submitFeedback =
    () => {

      alert(
        "Thank you for your feedback ❤️"
      );

      setFeedback("");
    };

  return (

    <>

      <section className="min-h-screen bg-[#262235] px-8 py-20">

        <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-[40px] p-10">

          <h1 className="text-white text-5xl font-bold">

            Feedback

          </h1>

          <p className="text-gray-400 mt-3 text-lg">

            Share your dining experience with us.

          </p>

          <textarea
            value={feedback}
            onChange={(e)=>
              setFeedback(
                e.target.value
              )
            }
            rows="8"
            placeholder="Write your feedback..."
            className="w-full mt-8 bg-[#312B45] rounded-3xl p-5 text-white outline-none border border-white/10"
          />

          <button
            onClick={submitFeedback}
            className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-2xl duration-300"
          >

            Submit Feedback

          </button>

        </div>

      </section>
    </>
  );
}