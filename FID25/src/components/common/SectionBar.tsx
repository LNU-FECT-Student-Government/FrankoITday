
interface SectionProps {
    title: string;
}

function SectionBar({ title }: SectionProps) {
    return (
        <>
            <div className="flex flex-row justify-center items-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-lota font-black italic text-yellow-500 mx-3 lg:mx-5">{title}</h2>
                <div className="w-full h-1 bg-yellow-500"></div>
            </div>
        </>
    )
}

export default SectionBar;