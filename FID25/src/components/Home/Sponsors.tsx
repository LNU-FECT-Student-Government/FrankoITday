import { lazy } from "react";

const LogoGrid = lazy(() => import('../common/LogoGrid'))

function Sponsors() {
    return (
        <section id="sponsors" className="flex flex-col items-center py-8 md:pt-10 lg:pt-15">
            <div className="flex flex-col items-center justify-center pl-6">
                <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start w-screen md:px-1 lg:px-5 xl:px-20 2xl:px-50">
                    <div className="flex flex-col justify-center items-center  mx-10 sm:mx-2 xl:scale-105 2xl:scale-115 2xl:pl-10">
                        <h1 className="text-5xl text-center sm:text-4xl text-yellow-500 font-bold -mb-2 xl:text-6xl">General Partner</h1>
                        <LogoGrid columns={1}>
                            <img src="/sponsors/softserve.svg" alt="SoftServe Logo" className="max-h-20 object-contain" />
                        </LogoGrid>
                    </div>
                    <div className="flex flex-col justify-center items-center mx-10 sm:mx-2 xl:scale-105 2xl:scale-115 2xl:plr-10">
                        <h1 className="text-5xl text-center sm:text-4xl text-yellow-500 font-bold -mb-2 xl:text-6xl">General Partner</h1>
                        <LogoGrid columns={1}>
                            <img src="/sponsors/softserve.svg" alt="SoftServe Logo" className="max-h-20 object-contain" />
                            <img src="/sponsors/softserve.svg" alt="SoftServe Logo" className="max-h-20 object-contain" />
                        </LogoGrid>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center md:px-20 md:scale-100 md:mt-5 lg:mt-15 xl:scale-100">
                    <h1 className="text-5xl text-yellow-500 font-bold -mb-2 xl:text-6xl">General Partner</h1>
                    <LogoGrid columns={2}>
                        <img src="/sponsors/softserve.svg" alt="SoftServe Logo" className="max-h-20 object-contain" />
                        <img src="/sponsors/softserve.svg" alt="SoftServe Logo" className="max-h-20 object-contain" />
                        <img src="/sponsors/softserve.svg" alt="SoftServe Logo" className="max-h-20 object-contain" />
                        <img src="/sponsors/softserve.svg" alt="SoftServe Logo" className="max-h-20 object-contain" />
                    </LogoGrid>
                </div>
            </div>
        </section>
    );
}

export default Sponsors;