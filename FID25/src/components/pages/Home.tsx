import Hero from "../Home/Hero.tsx";
import { lazy } from "react";
const SectionBar = lazy(() => import('../common/SectionBar.tsx'))
const Registration = lazy(() => import('../Home/Registration.tsx'))
const About = lazy(() => import('../Home/About.tsx'))
const Schedule = lazy(() => import('../Home/Schedule.tsx'))

function Home() {
    return (
        <>
            <SectionBar title="Home" />
            <Hero />
            <SectionBar title="About" />
            <About />
            <SectionBar title="Schedule" />
            <Schedule />
            <SectionBar title="Registration" />
            <Registration />
        </>
    );
}
export default Home;