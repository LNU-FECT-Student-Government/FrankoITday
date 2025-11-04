import { useEffect, useState } from "react";
// import Pong from "../common/Pong";
import RegularCell from "./Table/RegularCell";
import TimeCell from "./Table/TimeCell";

const schedule1Import = async () => import("../../data/shedule1.json");
const schedule2Import = async () => import("../../data/shedule2.json");
const schedule3Import = async () => import("../../data/shedule3.json");

type Row = { time: string; content: string[] };

function Schedule() {
    const [schedules, setSchedules] = useState<{
        flow1: Row[];
        flow2: Row[];
        flow3: Row[];
    }>({
        flow1: [],
        flow2: [],
        flow3: []
    });

    const [activeFlow, setActiveFlow] = useState<number>(1);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    useEffect(() => {
        Promise.all([schedule1Import(), schedule2Import(), schedule3Import()]).then(
            ([data1, data2, data3]) => {
                setSchedules({
                    flow1: data1.default,
                    flow2: data2.default,
                    flow3: data3.default
                });
            }
        );
    }, []);

    const handleFlowChange = (flow: number) => {
        if (flow === activeFlow || isAnimating) return;
        setIsAnimating(true);
        setActiveFlow(flow);
        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <section id="schedule" className="flex items-center relative flex-col py-6 my-5">
            {/*<h1 className="text-4xl font-bold">Very Soon!</h1>*/}
            {/*<p className="text-gray-600 pb-6">play some pong for now</p>*/}

            <div className="flex gap-3 mb-6 z-10">
                <button
                    onClick={() => handleFlowChange(1)}
                    disabled={activeFlow === 1}
                    className={`px-6 py-2 border-2 border-yellow-500 font-semibold transition-all ${
                        activeFlow === 1
                            ? "bg-yellow-500 text-black cursor-default"
                            : "bg-black text-gray-300 hover:bg-yellow-950"
                    }`}
                >
                    1 Потік
                </button>
                <button
                    onClick={() => handleFlowChange(2)}
                    disabled={activeFlow === 2}
                    className={`px-6 py-2 border-2 border-yellow-500 font-semibold transition-all ${
                        activeFlow === 2
                            ? "bg-yellow-500 text-black cursor-default"
                            : "bg-black text-gray-300 hover:bg-yellow-950"
                    }`}
                >
                    2 Потік
                </button>
            </div>

            {/* ЦЕЙ БЛОК — 1в1 як у тебе раніше */}
            <div className="w-full relative">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(${activeFlow === 1 ? "0%" : "-100%"})`
                    }}
                >
                    {/* Потік 1 */}
                    <div className="w-full flex-shrink-0 px-3">
                        <table className="w-full">
                            <tbody>
                            {schedules.flow1.map((row, key) => (
                                <tr key={key}>
                                    <TimeCell time={row.time} />
                                    <RegularCell
                                        title={row.content[0]}
                                        description={row.content[1]}
                                        time={row.time}
                                    />
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Потік 2 */}
                    <div className="w-full flex-shrink-0 px-3">
                        <table className="w-full">
                            <tbody>
                            {schedules.flow2.map((row, key) => (
                                <tr key={key}>
                                    <TimeCell time={row.time} />
                                    <RegularCell
                                        title={row.content[0]}
                                        description={row.content[1]}
                                        time={row.time}
                                    />
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ДAdditional activities */}
            <div className="w-full relative mt-10 px-3">
                <h2 className="text-2xl font-semibold mb-3 text-yellow-500">
                    Additional activities
                </h2>
                <table className="w-full">
                    <tbody>
                    {schedules.flow3.map((row, key) => (
                        <tr key={key}>
                            <TimeCell time={row.time} />
                            <RegularCell
                                title={row.content[0]}
                                description={row.content[1]}
                                time={row.time}
                            />
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/*
      <Pong />
      */}
        </section>
    );
}

export default Schedule;
