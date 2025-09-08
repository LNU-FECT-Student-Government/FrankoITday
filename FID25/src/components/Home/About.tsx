function About() {
    return (
        <>
        <section id="about" className="relative flex flex-col justify-center items-center py-6">
        <div className="flex items-center justify-around">
            <div className="w-40 h-40 bg-cyan-500"></div>
                <div className="flex flex-col ml-4">
                    <p className="text-xl">About Franko IT Day</p>
                    <p className="max-w-70 text-md">Since 2018, the conference has been an annual event, successfully adapting to a
                        rapidly changing environment and challenges. Franko IT Day is always ready to
                        surprise you with inspiring lectures and informative workshops both online and in
                        person!</p>
                    <p className="text-sm">November 4, 50 Drahomanova St., Lviv</p>
                </div>
            </div>
        </section>
        </>
    );
}
export default About;