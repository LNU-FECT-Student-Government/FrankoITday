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
            <section id="schedule" className="flex items-center flex-col py-6 my-5">
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