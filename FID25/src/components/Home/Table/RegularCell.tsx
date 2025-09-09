interface RegularCellProps {
    time: string;
    title: string;
    description: string;
    className?: string;
}

function RegularCell({ title, description, className }: RegularCellProps) {
    return (
        <>
            <td className={`peer-hover:bg-[#3a2100] peer-hover:shadow-[0_0_40px] group w-200 xl:h-20 xl:w-350 xl:outline-2 xl:hover:outline-4 outline-1 outline-yellow-500 bg-[#211300] shadow-amber-300/40 shadow-[0_0_0] px-3 py-1 hover:scale-103 hover:outline-2 hover:bg-black hover:shadow-[0_0_30px] transition-all ${className}`}>
                <span className="flex justify-between items-start">
                    <span>
                        <span className="block">
                            <p className="text-lg xl:text-2xl font-extrabold text-yellow-500 transition-all duration-75 -mb-1">{title}</p>
                        </span>
                        <span className="block">
                            <p className="text-md xl:text-xl font-bold text-white transition-all duration-75">{description}</p>
                        </span>
                    </span>
                    {/*<span className="block -mb-1 xl:mb-1 right-0">
                        <span className="relative inline-block after:inset-0 after:absolute after:w-0 after:h-[100%] after:bg-yellow-500 after:-z-10 after:bottom-0 after:top-1 px-1 pt-1 group-hover:after:w-full after:transition-all after:duration-100 after:ease-in">
                            <p className="hidden text-md xl:text-xl font-bold text-black group-hover:inline">{time}</p>
                        </span>
                    </span>*/}
                </span>
            </td>
        </>
    );
}

export default RegularCell;