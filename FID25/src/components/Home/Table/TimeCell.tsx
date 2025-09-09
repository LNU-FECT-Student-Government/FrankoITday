interface TimeCellProps {
    time: string;
}

function TimeCell({ time }: TimeCellProps) {
    return (
        <>
            <th className="peer xl:outline-2 xl:hover:outline-4 xl:text-xl xl:max-w-50 outline-1 outline-yellow-500 min-w-30 max-w-31 bg-[#211300] shadow-amber-300/40 shadow-[0_0_0] px-2 py-1 peer-hover:bg-[341E00] hover:scale-103 hover:outline-2 hover:bg-black hover:shadow-[0_0_30px] transition-all">{time}</th>
        </>
    );
}

export default TimeCell;