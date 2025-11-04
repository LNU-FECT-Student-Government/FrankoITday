import ArrowsBG from "../common/svg/ArrowsBG";
import Masonry from '../common/Masonry';

function About() {
    return (
        <>
            <section id="about" className="relative flex flex-col justify-center items-center py-6 overflow-hidden">
                <div>
                    <ArrowsBG className="absolute right-0 opacity-30 -z-100 scale-65 sm:scale-85 md:scale-100 lg:scale-125" />
                    <div className="flex items-center justify-around">
                        <img src="/images/monitor.webp" alt="Franko IT Day Logo" className="w-45 h-45 sm:w-65 sm:h-65 md:w-80 md:h-80 ml-4" />
                        <div className="flex flex-col mx-4 sm:ml-8 lg:ml-16">
                            <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl lg:mb-4 mb-1 font-extrabold italic text-yellow-500">About Franko IT Day</p>
                            <p className="max-w-90 text-md sm:text-xl md:text-2xl md:max-w-140 md:nb-2 font-medium text-yellow-500">Since 2018, the conference has been an annual event, successfully adapting to a
                                rapidly changing environment and challenges. Franko IT Day is always ready to
                                surprise you with inspiring lectures and informative workshops both online and in
                                person!</p>
                            <p className="text-sm sm:text:lg md:text-xl text-yellow-600">November 6, 50 Drahomanova St., Lviv</p>
                        </div>
                    </div>

                    <div className="h-0.25 w-[80%] mx-auto my-9 bg-yellow-500"></div>

                    <div className="flex flex-col md:flex-row items-center md:items-start mx-5">
                        <p className="pr-3 top-0 mb-4 text-sm text-justify sm:text-lg max-w-100 sm:max-w-130 md:text-xl md:max-w-125">
                            Since the very beginning, the conference’s motto was "for students, by students". Our
                            speakers never fail to impress the guests with high-quality knowledge sharing in the
                            form of interactive lectures and workshops about the latest trends in the IT industry.<br /> <br />

                            Plus, Franko IT Day loves to encourage the younger generation to learn new things and
                            develop their skills using exciting giveaways and cool presents. Come and impress us
                            with your attentive engagement or exceptional luck - maybe you'll be the next one to
                            take all that merch home!
                        </p>
                        <div className="relative">
                            <Masonry breakPoints={[1, 340]} >
                                <img src="/images/image1.webp" className="w-55 h-auto m-1"></img>
                                <img src="/images/image2.webp" className="w-55 h-auto m-1"></img>
                                <img src="/images/image3.webp" className="w-55 h-auto m-1"></img>
                                <img src="/images/image4.webp" className="w-55 h-auto m-1"></img>
                                <img src="/images/image5.webp" className="w-55 h-auto m-1"></img>
                                <img src="/images/image6.webp" className="w-55 h-auto m-1"></img>
                            </Masonry>
                        </div>
                    </div>
                </div>

                <div className="h-0.25 w-[80%] mx-auto my-9 bg-yellow-500"></div>

                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-yellow-500 text-4xl sm:ml-5 text-center font-bold mb-3 mx-auto md:text-5xl sm:text-left lg:text-6xl">
                        Supported by<br />
                        Leading Ukrainian<br />
                        IT companies<br />
                    </p>
                    <p className="text-justify text-sm md:text-xl px-6 max-w-100 md:max-w-115 mr-2 ml-0 sm:max-w-71 sm:ml-5 md:mr-6 md:ml-15 lg:max-w-100 lg:text-2xl">
                        Franko IT Day is the most prominent IT conference of the Ivan Franko National  University of Lviv. It is held annually on the faculty of electronics and computer  technologies to help bring ambitious students and their future employers together.
                    </p>
                </div>
                <div className="pt-10">
                </div>
            </section>
        </>
    );
}
export default About;