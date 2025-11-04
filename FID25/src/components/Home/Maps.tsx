import { useState } from "react";
import Floor1 from "./MapsSvgs/Floor1";
import Floor2 from "./MapsSvgs/Floor2";
import Floor3 from "./MapsSvgs/Floor3";
import Floor4 from "./MapsSvgs/Floor4";

function Maps() {
    const [selectedFloor, setSelectedFloor] = useState(1);
    const floors = [1, 2, 3, 4];

    // CSS класи для кнопок
    const baseButtonClass = "px-6 py-2 rounded-full transition-all duration-300 outline-2 -outline-offset-2 outline-yellow-500";
    const activeButtonClass = "bg-yellow-500 text-black outline-10 -outline-offset-10";
    const inactiveButtonClass = "bg-black text-white hover:bg-yellow-950/40 outline-2 -outline-offset-2 outline-yellow-500";

    return (
        <>
            <style>{`
                @keyframes slideDiagonal {
                  from {
                    background-position: 0 0;
                  }
                  to {
                    /* Розмір одного квадрату сітки.
                       Коли анімація досягне 40px 40px, вона "стрибне"
                       назад до 0 0, але оскільки сітка повторюється,
                       це буде виглядати безшовно. */
                    background-position: 40px 40px;
                  }
                }

                .animated-grid-bg {
                  background-color: #000;

                  --grid-color: rgba(234, 179, 8, 0.12);
                  --grid-size: 40px;
                  --grid-line-width: 1px;

                  background-image:
                    repeating-linear-gradient(
                      to bottom,
                      var(--grid-color),
                      var(--grid-color) var(--grid-line-width),
                      transparent var(--grid-line-width),
                      transparent var(--grid-size)
                    ),
                    repeating-linear-gradient(
                      to right,
                      var(--grid-color),
                      var(--grid-color) var(--grid-line-width),
                      transparent var(--grid-line-width),
                      transparent var(--grid-size)
                    );
                  
                  animation: slideDiagonal 4s linear infinite;
                }
            `}</style>


            <section
                id="maps"
                className="w-full mx-auto overflow-hidden my-8"
            >
                {/* Навігація поверхами */}
                <div className="flex justify-center gap-4 mb-4">
                    {floors.map((floor) => (
                        <button
                            key={floor}
                            onClick={() => setSelectedFloor(floor)}
                            className={`${baseButtonClass} ${selectedFloor === floor
                                ? activeButtonClass
                                : inactiveButtonClass
                                }`}
                        >
                            {floor} поверх
                        </button>
                    ))}
                </div>

                {/* Стрічка (Track): 
                w-[400%] (оскільки 4 слайди)
                transition-transform для плавності
            */}
                <div
                    className="flex w-[400vw] transition-transform duration-500 ease-in-out py-5 animated-grid-bg "
                    style={{
                        transform: `translateX(-${(selectedFloor - 1) * 100}vw)`,
                    }}
                >
                    <Floor1 className="w-[40vw] mx-[30vw] flex-shrink-0 h-fit" />
                    <Floor2 className="w-[40vw] mx-[30vw] flex-shrink-0 h-fit" />
                    <Floor3 className="w-[40vw] mx-[30vw] flex-shrink-0 h-fit" />
                    <Floor4 className="w-[40vw] mx-[30vw] flex-shrink-0 h-fit" />
                </div>
            </section>
        </>
    );
}

export default Maps;