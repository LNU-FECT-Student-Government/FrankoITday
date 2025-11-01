type ScheduleTableProps = {
    schedule1: { time: string; content: string[] }[];
    schedule2: { time: string; content: string[] }[];
};

export default function MiniSchedule({ schedule1, schedule2 }: ScheduleTableProps) {
    const maxRows = Math.max(schedule1.length, schedule2.length);

    return (
        <div className="bg-black/85 p-1 backdrop-blur-sm">
            <table className="border-collapse border border-yellow-500 text-xs w-fit">
                <thead>
                    <tr className="">
                        <th className="border border-yellow-500 px-2 py-1 text-yellow-500 font-semibold" colSpan={2}>
                            Stream 1
                        </th>
                        <th className="border border-yellow-500 px-2 py-1 text-yellow-500 font-semibold" colSpan={2}>
                            Stream 2
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: maxRows }).map((_, idx) => {
                        const item1 = schedule1[idx];
                        const item2 = schedule2[idx];

                        return (
                            <tr key={idx} className="">
                                <td className="border border-yellow-500 bg-yellow-950/40 px-2 py-1 text-white">
                                    {item1?.time || '-'}
                                </td>
                                <td className="border border-yellow-500 px-2 py-1 text-white">
                                    {item1?.content[0] || '-'}
                                </td>
                                <td className="border border-yellow-500 bg-yellow-950/40 px-2 py-1 text-white">
                                    {item2?.time || '-'}
                                </td>
                                <td className="border border-yellow-500 px-2 py-1 text-white">
                                    {item2?.content[0] || '-'}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}