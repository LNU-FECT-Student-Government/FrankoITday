import Franko from "../common/svg/Franko.tsx";
import ArrowsLong from "../common/svg/ArrowsLong.tsx";
import ArrowsShort from "../common/svg/ArrowsShort.tsx";
import { useEffect, useState } from "react";

function Hero() {
    const [viewport, setViewport] = useState<[number, number]>([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        const handleResize = () => {
            setViewport([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [window.innerHeight, window.innerWidth]);

    const frankoText = "FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY ";
    return (
        <>
            <section id="hero" className={`overflow-hidden ${viewport[1] >= 915 ? 'h-screen' : 'h-[915px]'} sm:h-auto xl:h-fit`}>
                <div className="sm:flex sm:flex-row sm:justify-between items-end">
                    <div className="flex flex-col px-1 ">
                        <p className="hidden sm:absolute sm:block md:text-3xl lg:text-4xl xl:top-20 lg:top-10 -z-100 text-xl opacity-20 font-black scale-150">
                            {frankoText.split(" ").map((word, index) => (
                                <span
                                    key={index}
                                    className={index % 2 === 0 ? "text-yellow-500" : "text-white"}
                                >
                                    {word}{" "}
                                </span>
                            ))}
                        </p>
                        <div className="h-full">
                            <h1 className="font-lota font-black text-8xl sm:text-7xl md:text-8xl lg:text-9xl lg:scale-100 lg:pt-10 lg:pl-10 italic scale-90 ">
                                FRANKO<br />
                                IT<br />
                                DAY<br />
                            </h1>
                            <div className="flex justify-around items-center md:ml-8 my-16 mb-21 sm:my-6 sm:mb-6  sm:max-w-75 lg:max-w-150">
                                <button className="bg-black outline-2 outline-yellow-500 px-4 min-w-32 py-2 pb-3 lg:px-8 lg:py-4 lg:pb-3 lg:min-w-50 lg:text-2xl text-md font-bold font-lota hover:-outline-offset-8 hover:outline-10 hover:bg-yellow-500 hover:cursor-pointer hover:text-black transition-all duration-200">Registration</button>
                                <button className="bg-black outline-2 outline-yellow-500 px-4 min-w-32 py-2 pb-3 lg:px-8 lg:py-4 lg:pb-3 lg:min-w-50 lg:text-2xl text-md font-bold font-lota hover:-outline-offset-8 hover:outline-10 hover:bg-yellow-500 hover:cursor-pointer hover:text-black transition-all duration-200">Schedule</button>
                            </div>
                        </div>

                    </div>

                    <div className="relative h-fit lg:h-full lg:w-screen lg:flex lg:flex-row lg:justify-end">
                        <div className=" -z-40 ">
                            <div className="top-1/2 my-auto absolute flex flex-col items-center w-screen pt-5 scale-125 sm: sm:w-1">
                                <ArrowsLong className="text-yellow-500 w-screen scale-150 sm:scale-0" />
                                <ArrowsShort className="text-yellow-500 w-screen scale-150 sm:scale-0 -translate-y-5" />
                            </div>
                        </div>
                        <Franko style={{ clipPath: `inset(0 0 ${viewport[0] <= 640 ? '50%' : '0'} 0)` }} className="w-[150%] bottom-0 right-0 max-h-170 sm:right-0 sm:-translate-x-0 sm:w-[100%] lg:w-auto lg:max-h-120 sm:relative  -translate-x-35 -z-50" />
                        <div className="relative">
                        </div>
                    </div>
                </div>
                <div className="hidden sm:block relative left-0 w-full h-full">
                    <div className="flex top-0 flex-col items-center w-full h-fit mb-2">
                        <ArrowsLong className="text-yellow-500 w-[110%] scale-100" />
                        <ArrowsShort className="text-yellow-500 w-[110%] scale-100 h-auto mt-2" />
                    </div>
                </div>

            </section>
        </>
    );
}
export default Hero;