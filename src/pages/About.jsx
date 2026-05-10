import React from "react";
import Navbar from "../components/Navbar";

export default function About() {

  return (

    <>

      <section className="min-h-screen bg-[#262235] px-8 md:px-16 py-20">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-6xl font-bold text-white">

            About Us

          </h1>

          <p className="text-gray-400 text-xl mt-4 leading-9">

            Welcome to our Restaurant,
            where passion meets flavor.

            We believe food is more
            than a meal — it is an
            experience.

            Our chefs prepare every dish
            with premium ingredients,
            authentic taste, and care.

            From breakfast to desserts,
            we deliver quality dining
            for every customer.

          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">

              <h2 className="text-yellow-300 text-3xl font-bold">

                Quality Food

              </h2>

              <p className="text-gray-400 mt-4">

                Fresh ingredients and
                premium cooking.

              </p>

            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">

              <h2 className="text-yellow-300 text-3xl font-bold">

                Fast Service

              </h2>

              <p className="text-gray-400 mt-4">

                Quick and customer-first
                service.

              </p>

            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">

              <h2 className="text-yellow-300 text-3xl font-bold">

                Best Experience

              </h2>

              <p className="text-gray-400 mt-4">

                Elegant dining atmosphere.

              </p>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}