import Franko from "../common/svg/Franko.tsx";
import ArrowsLong from "../common/svg/ArrowsLong.tsx";
import ArrowsShort from "../common/svg/ArrowsShort.tsx";

function Hero(){

const frankoText = "FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY FRANKO IT DAY ";
    return (
        <>
        <section id="hero" className="overflow-hidden relative sm:flex sm:flex-row h-screen sm:h-auto">
            <div className="flex flex-col w-screen px-1 ">
                <p className="hidden sm:absolute sm:block md:text-3xl lg:text-4xl lg:top-10 -z-100 text-xl opacity-20 font-black scale-150">
                    {frankoText.split(" ").map((word, index) => (
                        <span
                            key={index}
                            className={index % 2 === 0 ? "text-yellow-500" : "text-white"}
                        >
                        {word}{" "}
                    </span>
                    ))}
                </p>
            <h1 className="font-lota font-black text-8xl sm:text-7xl md:text-8xl lg:text-9xl italic scale-90 ">
                FRANKO<br/>
                IT<br/>
                DAY<br/>
            </h1>
                <div className="flex justify-around items-center md:ml-8 my-16 mb-21 sm:my-6 sm:mb-6  sm:max-w-75">
                <button className="bg-black outline-2 outline-yellow-500 px-4 min-w-32 py-2 pb-3 text-md font-bold font-lota hover:-outline-offset-8 hover:outline-10 hover:bg-yellow-500 hover:cursor-pointer hover:text-black transition-all duration-200">Registration</button>
                    <button className="bg-black outline-2 outline-yellow-500 px-4 min-w-32 py-2 pb-3 text-md font-bold font-lota hover:-outline-offset-8 hover:outline-10 hover:bg-yellow-500 hover:cursor-pointer hover:text-black transition-all duration-200">Schedule</button>
                </div>

            </div>

            <div className="relative">
                <Franko style={{ clipPath: `inset(0 0 ${window.innerWidth <= 640 ? '52%' : '0' } 0)` }} className="w-[150%] max-h-170 sm:right-0 sm:-translate-x-15 md:w-[200%] md:-translate-x-60 sm:relative bottom-0  -translate-x-40 -z-50"/>

                <div className="w-full 0 -z-40 sm:hidden">
                    <div className="absolute top-80 flex flex-col items-center w-screen pt-5 scale-125">
                        <ArrowsLong className="text-yellow-500 w-screen scale-150" />
                        <ArrowsShort className="text-yellow-500 w-screen scale-150 -translate-y-5" />
                    </div>
                </div>
            </div>

        </section>
            <div className="relative mn-40">
                <div className="hidden sm:block relative left-0 w-full">
                    <div className="flex flex-col items-center w-full pt-2">
                        <ArrowsLong className="text-yellow-500 w-full scale-150" />
                        <ArrowsShort className="text-yellow-500 w-full scale-150 -translate-y-3 md:-translate-y-2 lg:-translate-y-1 xl:translate-y-1" />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Hero;