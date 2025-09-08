import { lazy } from "react";

const LogoGrid = lazy(() => import('../common/LogoGrid'))

function Sponsors() {
    return (
        <section id="sponsors" className="flex flex-col items-center py-8 md:pt-20">
            <div className="flex flex-col items-center justify-center pl-6">
                <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start w-screen md:px-10 lg:px-15">
                    <div className="flex flex-col justify-center items-center  mx-10 sm:mx-2">
                        <h1 className="text-5xl sm:text-4xl text-yellow-500 font-bold -mb-2">General Partner</h1>
                        <LogoGrid columns={1}>
                            <img src="/sponsors/softserve.svg" alt="SoftServe Logo" className="max-h-20 object-contain" />
                        </LogoGrid>
                    </div>
                    <div className="flex flex-col justify-center items-center mx-10 sm:mx-2">
                        <h1 className="text-5xl sm:text-4xl text-yellow-500 font-bold -mb-2">General Partner</h1>
                        <LogoGrid columns={1}>
                            <img src="/sponsors/softserve.svg" alt="SoftServe Logo" className="max-h-20 object-contain" />
                            <img src="/sponsors/softserve.svg" alt="SoftServe Logo" className="max-h-20 object-contain" />
                        </LogoGrid>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center md:px-20">
                    <h1 className="text-5xl text-yellow-500 font-bold -mb-2">General Partner</h1>
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