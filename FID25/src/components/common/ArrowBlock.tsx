interface ArrowBlockProps {
    children: React.ReactNode;
    className?: string;
}

function ArrowBlock({ children, className }: ArrowBlockProps) {
    return (
        <div className={`relative ${className}`}>
            <svg
                className="inset-0 w-full h-full"
                viewBox="0 0 442 175"
                preserveAspectRatio="xMidYMid meet"
                style={{ width: '100%', height: 'auto' }}
                xmlns="http://www.w3.org/2000/svg"
            >
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
            </svg >
            <div className="absolute z-10 flex items-center justify-center h-full px-8">
                <div className="w-2/3">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ArrowBlock;