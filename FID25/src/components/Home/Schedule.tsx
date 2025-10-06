import type { Key } from "react";
import RegularCell from "./Table/RegularCell";
import TimeCell from "./Table/TimeCell";
import { useEffect, useState } from "react";
const scheduleImport = async () => import("../../data/shedule.json");

function Schedule() {
    const [schedule, setSchedule] = useState<{ time: string; content: string[] }[]>([]);

    useEffect(() => {
        scheduleImport().then((data) => {
            setSchedule(data.default);
        });
    }, []);

    return (
        <>
            <section id="schedule" className="flex items-center relative flex-col py-6 my-5">
                <h2 className="text-3xl font-bold mb-5 text-center z-120">Coming Soon...</h2>
                <div className="w-full h-[110%] top-0 absolute z-100 bg-gradient-to-t from-black/70 to-black" />
                <table className="px-3 mx-2 ">
                    <tbody>
                        {schedule.map((row: { time: string; content: string[] }, key: Key) => (
                            <tr key={key} >
                                <TimeCell time={row.time} />
                                <RegularCell title={row.content[0]} description={row.content[1]} time={row.time} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default Schedule;