// Hero.jsx

import React, { useEffect, useState } from 'react'

import IM1 from '../assets/img_1.jpg'
import IM2 from '../assets/img_2.jpg'
import IM3 from '../assets/img_3.jpg'
import IM4 from '../assets/img_4.jpg'
import { Menu } from 'lucide-react'

export default function Hero() {

    const imgs = [IM1, IM2, IM3, IM4]

    const [img, setimg] = useState(0)

    useEffect(() => {

        const slide = setInterval(() => {

            setimg((p) => (p + 1) % imgs.length)

        }, 5000)

        return () => clearInterval(slide)

    }, [])

    return (

        <>
            <section className="min-h-screen bg-[#262235] relative overflow-hidden">

                {/* Background Glow */}
                <div className="absolute top-0 left-0 w-full h-full">

                    <div className="absolute top-[10%] left-[10%] w-150 h-150 bg-violet-700/20 blur-[180px] rounded-full animate-pulse"></div>

                    <div className="absolute bottom-[5%] right-[10%] w-125 h-125 bg-pink-600/20 blur-[180px] rounded-full animate-pulse"></div>

                </div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32">

                    {/* Badge */}
                    <div className="border border-white/10 bg-black/20 backdrop-blur-md px-8 py-3 rounded-full mb-10 shadow-2xl hover:scale-105 duration-500">

                        <p className="text-[18px] text-gray-300 tracking-wide">
                            Serving Food Lovers Since 2016 ❤️
                        </p>

                    </div>

                    {/* Heading */}
                    <h1 className="text-white text-[75px] leading-22.5 font-bold max-w-250">

                        Savor Every Bite. Savor
                        <br />
                        Every Moment.

                    </h1>

                    {/* Underline */}
                    <div className="mt-4 mb-10">

                        <svg
                            width="520"
                            height="22"
                            viewBox="0 0 520 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 16C150 -2 320 -2 515 16"
                                stroke="#7C3AED"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                        </svg>

                    </div>

                    {/* Paragraph */}
                    <p className="text-gray-300 text-[22px] leading-10.5 max-w-287.5">

                        Welcome to a dining experience where flavor,
                        freshness, and hospitality come together.
                        Whether it's your first visit or your hundredth,
                        every plate is made to impress.

                    </p>

                    {/* Button */}
                    <button  className="mt-14 bg-violet-600 hover:bg-violet-700 hover:scale-105 duration-500 text-white text-[20px] font-medium px-12 py-5 rounded-2xl shadow-2xl flex items-center gap-4 group overflow-hidden relative">

                        <span className="relative z-10">
                            <a href="#menu" >Experience the Flavor</a>
                        </span>

                        <span className="text-2xl relative z-10 group-hover:translate-x-2 duration-500">
                            →
                        </span>

                        {/* Glow Animation */}
                        <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-150 rounded-full duration-700"></div>

                    </button>

                    {/* Image Slider */}
                    <div className="mt-24 p-2 mb-20 relative group">

                        {/* Outer Glow */}
                        <div className="absolute inset-0 bg-violet-600/30 blur-[80px] rounded-[40px] opacity-70 group-hover:opacity-100 duration-700"></div>

                        {/* Floating Border */}
                        <div className="absolute -inset-0.5 bg-linear-to-r from-violet-500 via-pink-500 to-violet-500 rounded-[40px] blur-sm opacity-50 group-hover:opacity-100 duration-700 animate-pulse"></div>

                        {/* Image */}
                        <div className="relative overflow-hidden rounded-[40px] border border-white/10 shadow-2xl">

                            <img
                                src={imgs[img]}
                                alt=""
                                className='w-300 h-162.5 object-cover transition-all duration-2500 ease-in-out group-hover:scale-110'
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Bottom Glow */}
            <div className="h-52 bg-violet-700/10 blur-[120px]">
            
            
            </div>

          
        </>
    )
}