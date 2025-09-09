function SpeakerCard({
    name = "nameeeee surnameeeee",
    company = "company name",
    photoUrl = "/speakers/photo_placeholder.png"
}) {
    return (
        <div className="flex-shrink-0 relative mx-3 h-full">
            {/* Image container */}
            <div className="relative h-full">
                <img
                    src={photoUrl}
                    alt={name}
                    className="block h-full w-auto object-cover"
                />
                {/* Text overlay container - positioned absolutely to center on image */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-2">
                    {/* Name div - spans full image width */}
                    <div className="w-full bg-yellow-500 pb-1">
                        <p className="text-black text-sm text-center font-bold px-2 break-words">
                            {name}
                        </p>
                    </div>
                    {/* Company div - 50% of image width, centered */}
                    <div className="w-3/4 bg-black border border-yellow-500 pb-1">
                        <p className="text-white text-sm text-center font-medium px-2 truncate">
                            {company}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SpeakerCard;