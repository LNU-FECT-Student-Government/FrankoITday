interface ArrowBlockProps {
    children: React.ReactNode;
    className?: string;
}

function ArrowBlock({ children, className }: ArrowBlockProps) {
    return (
        <svg className={className} width="442" height="175" viewBox="0 0 442 175" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id="bgblur_0_67_150_clip_path" transform="translate(21.3 21.3)">
                    <path d="M391.732 3L438.569 87.5L391.732 172H5.09277L51.124 88.9541L51.9297 87.5L51.124 86.0459L5.09277 3H391.732Z" />
                </clipPath>
            </defs>
            <path
                data-figma-bg-blur-radius="21.3"
                d="M391.732 3L438.569 87.5L391.732 172H5.09277L51.124 88.9541L51.9297 87.5L51.124 86.0459L5.09277 3H391.732Z"
                fill="black"
                fill-opacity="1"
                stroke="#FFAE00"
                stroke-width="6"
            />
            <foreignObject className="flex items-center justify-center w-full h-full relative" width="442" height="175">
                <div className="h-20 w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 ">
                    {children}
                </div>
            </foreignObject>
        </svg >
    );
}

export default ArrowBlock;