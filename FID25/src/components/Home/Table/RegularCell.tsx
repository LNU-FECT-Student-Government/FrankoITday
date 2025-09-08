interface RegularCellProps {
    title: string;
    description: string;
    className?: string;
}

function RegularCell({ title, description, className }: RegularCellProps) {
    return (
        <>
            <td className={`peer-hover:bg-[#331D00] group w-200 ring-1 ring-yellow-500 bg-[#211300] shadow-amber-300/40 shadow-[0_0_0] px-3 py-1 hover:scale-103 hover:ring-2 hover:bg-black hover:shadow-[0_0_30px] transition-all ${className}`}>
                <span className="block -mb-1">
                    <span className="relative inline-block after:inset-0 after:absolute after:w-0 after:h-5 after:bg-yellow-500 after:-z-10 after:bottom-0 after:top-1 px-1 group-hover:after:w-full after:transition-all after:duration-100 after:ease-in">
                        <p className="text-lg font-bold text-yellow-500 group-hover:text-black transition-all duration-75 -mb-1">{title}</p>
                    </span>
                </span>
                <span className="block">
                    <span className="relative inline-block after:inset-0 after:absolute after:w-0 after:h-5 after:bg-white after:-z-10 after:bottom-0 after:top-1 px-1 group-hover:after:w-full after:transition-all after:duration-100 after:ease-in">
                        <p className="text-md font-medium text-white group-hover:text-black transition-all duration-75">{description}</p>
                    </span>
                </span>
            </td>
        </>
    );
}

export default RegularCell;