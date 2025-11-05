interface RegularCellProps {
  title: string;
  description: string;
  className?: string;
}

function RegularCell({ title, description, className }: RegularCellProps) {
  return (
    <td
      className={`peer-hover:bg-[#3a2100] peer-hover:shadow-[0_0_40px] group w-200 xl:h-20 xl:w-350 xl:outline-2 xl:hover:outline-4 outline-1 outline-yellow-500 bg-[#211300] shadow-amber-300/40 shadow-[0_0_0] px-3 py-1 hover:scale-101 hover:outline-2 hover:bg-black hover:shadow-[0_0_30px] transition-all ${className ?? ""
        }`}
    >
      <span className="flex justify-between items-start">
        <span>
          <span className="block">
            <p className="text-lg xl:text-2xl font-extrabold text-yellow-500 transition-all duration-75 -mb-1">
              {title}
            </p>
          </span>
          <span className="block">
            <p className="text-md xl:text-xl font-bold text-white transition-all duration-75">
              {description}
            </p>
          </span>
        </span>

      </span>
    </td>
  );
}

export default RegularCell;