// import Pong from "../common/Pong";
import { useEffect, useState } from "react";
import TimeCell from "./Table/TimeCell.tsx";
import RegularCell from "./Table/RegularCell.tsx";

const schedule1Import = async () => import("../../data/shedule1.json");
const schedule2Import = async () => import("../../data/shedule2.json");

type ScheduleRow = {
    time: string;
    content: string[];
};

function Schedule() {
    const [schedules, setSchedules] = useState<{
        flow1: ScheduleRow[];
        flow2: ScheduleRow[];
    }>({
        flow1: [],
        flow2: []
    });

    const [activeFlow, setActiveFlow] = useState<number>(1);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    useEffect(() => {
        Promise.all([schedule1Import(), schedule2Import()]).then(
            ([data1, data2]) => {
                setSchedules({
                    flow1: data1.default,
                    flow2: data2.default
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
        <section
            id="schedule"
            className="flex items-center relative flex-col py-6 my-5"
        >
            <div className="flex gap-3 mb-6 z-10">
                <button
                    onClick={() => handleFlowChange(1)}
                    disabled={activeFlow === 1}
                    className={`px-6 py-2 border-2 border-yellow-500 font-semibold transition-all ${activeFlow === 1
                        ? "bg-yellow-500 text-black cursor-default"
                        : "bg-black text-gray-300 hover:bg-yellow-950"
                        }`}
                >
                    1 Потік
                </button>
                <button
                    onClick={() => handleFlowChange(2)}
                    disabled={activeFlow === 2}
                    className={`px-6 py-2 border-2 border-yellow-500 font-semibold transition-all ${activeFlow === 2
                        ? "bg-yellow-500 text-black cursor-default"
                        : "bg-black text-gray-300 hover:bg-yellow-950"
                        }`}
                >
                    2 Потік
                </button>
            </div>

            <div className="w-full relative overflow-x-clip">
                <div
                    className={`flex transition-transform duration-500 ease-in-out ${isAnimating ? "pointer-events-none" : ""
                        }`}
                    style={{
                        transform: `translateX(${activeFlow === 1 ? "0%" : "-100%"
                            })`
                    }}
                >
                    {/* 1 потік */}
                    <div className="w-full flex-shrink-0 px-3">
                        <table className="w-full">
                            <tbody>
                                {schedules.flow1.map((row, key) => (
                                    <tr key={key}>
                                        <TimeCell time={row.time} />
                                        <RegularCell
                                            title={row.content[0]}
                                            description={row.content[1]}

                                        />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 2 потік */}
                    <div className="w-full flex-shrink-0 px-3">
                        <table className="w-full">
                            <tbody>
                                {schedules.flow2.map((row, key) => (
                                    <tr key={key}>
                                        <TimeCell time={row.time} />
                                        <RegularCell
                                            title={row.content[0]}
                                            description={row.content[1]}
                                        />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* <Pong /> */}
        </section>
    );
}

export default Schedule;
