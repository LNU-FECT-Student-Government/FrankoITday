import Hero from "../Home/Hero.tsx";
import { lazy } from "react";
//import Speakers from "../Home/Speakers.tsx";
import Footer from "../common/Footer.tsx";
const SectionBar = lazy(() => import('../common/SectionBar.tsx'))
import About from "../Home/About.tsx";
import Sponsors from "../Home/Sponsors.tsx";

{/* 
    const Schedule = lazy(() => import('../Home/Schedule.tsx'))
    */}

function Home() {
    return (
        <>
            <SectionBar title="Home" />
            <Hero />
            <SectionBar title="About" />
            <About />
            <Sponsors />
            <SectionBar title="Schedule" />
            <h1 className="text-4xl text-center mx-auto text-gray-300 italic mb-10">Schedule will be announced super soon</h1>
            {/*
            <Schedule />
            <SectionBar title="Speakers" />
            <Speakers />
            */}
            <Footer />
        </>
    );
}
export default Home;