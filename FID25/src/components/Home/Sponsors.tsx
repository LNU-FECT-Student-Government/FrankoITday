import { lazy, useEffect, useState } from "react";

const LogoGrid = lazy(() => import('../common/LogoGrid'))

function Sponsors() {
    const [viewport, setViewport] = useState<[number, number]>([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        const handleResize = () => {
            setViewport([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [window.innerHeight, window.innerWidth]);

    return (
        <section id="sponsors" className="flex flex-col items-center md:pt-10 lg:pt-15">
            <div className="flex flex-col items-center justify-center pl-6">
                <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start w-screen md:px-1 lg:px-5 xl:px-20 2xl:px-50">
                    {/*<div className="flex flex-col justify-center items-center  mx-10 sm:mx-2 xl:scale-105 2xl:scale-115 2xl:pl-10">
                        <h1 className="text-5xl text-center sm:text-4xl text-yellow-500 font-bold -mb-2 xl:text-6xl">General Partner</h1>
                        <LogoGrid columns={1}>
                            <img src="/sponsors/Partner.svg" alt="partner placeholder" className="max-h-20 object-contain" />
                        </LogoGrid>
                    </div>*/}

                </div>
                <div className="flex flex-col justify-center items-center md:px-20 md:scale-100 md:mt-5 lg:mt-15 xl:scale-100">
                    <h1 className="text-5xl text-yellow-500 font-bold -mb-2 xl:text-6xl">General Partner</h1>
                    <LogoGrid columns={1}>
                        <img src="/sponsors/softserve.svg" alt="Softserve Logo" className="max-h-20 object-contain" />
                    </LogoGrid>
                </div>
                <div className="flex flex-col justify-center items-center md:px-20 md:scale-100 md:mt-5 lg:mt-15 xl:scale-100">
                    <h1 className="text-5xl text-yellow-500 font-bold -mb-2 xl:text-6xl">Premium Partner</h1>
                    <LogoGrid columns={viewport[0] >= 850 ? 2 : 1}>
                        <img src="/sponsors/epam.svg" alt="Epam Logo" className="max-h-20 object-contain" />
                        <img src="/sponsors/leobit.svg" alt="Leobit Logo" className="max-h-20 object-contain" />
                        <img src="/sponsors/appexSoft.svg" alt="AppexSoft Logo" className="max-h-20 object-contain" />
                        <img src="/sponsors/infineon.svg" alt="Infineon Logo" className="max-h-20 object-contain" />
                        <img src="/sponsors/keenEthics.svg" alt="Infineon Logo" className="max-h-20 object-contain" />
                        <img src="/sponsors/nix.svg" alt="nix Logo" className="max-h-20 object-contain" />
                    </LogoGrid>
                </div>

                <div className="flex flex-col justify-center items-center md:px-20 md:scale-100 md:mt-5 lg:mt-15 xl:scale-100">
                    <h1 className="text-5xl text-yellow-500 font-bold -mb-2 xl:text-6xl">Partner</h1>
                    <LogoGrid columns={2}>
                        <img src="/sponsors/GL.svg" alt="Epam Logo" className="max-h-20 object-contain" />
                        <img src="/sponsors/Renesas.svg" alt="Leobit Logo" className="max-h-20 object-contain" />
                    </LogoGrid>
                </div>
            </div>
        </section>
    );
}

export default Sponsors;