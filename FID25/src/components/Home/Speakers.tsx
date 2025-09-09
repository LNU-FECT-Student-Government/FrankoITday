import SpeakerCard from "../common/SpeakerCard";

function Speakers() {
    return (
        <>
            <div className="my-30 h-50 sm:h-60 md:h-70 lg:h-80 xl:h-90 flex flex-row items-center overflow-x-scroll">
                <SpeakerCard />
                <SpeakerCard />
                <SpeakerCard />
                <SpeakerCard />
                <SpeakerCard />
                <SpeakerCard />
                <SpeakerCard />
                <SpeakerCard />
                <SpeakerCard />
                <SpeakerCard />
            </div>
        </>
    );
}

export default Speakers;