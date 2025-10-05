import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import Form from "./Form";

function FormButton() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button onClick={() => setIsOpen(true)} className="bg-black outline-2 outline-yellow-500 px-4 min-w-32 py-2 pb-3 lg:px-8 lg:py-4 lg:pb-3 lg:min-w-50 lg:text-2xl text-md font-bold font-lota hover:-outline-offset-8 hover:outline-10 hover:bg-yellow-500 hover:cursor-pointer hover:text-black transition-all duration-200">
                Registration
            </button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 rounded-none">
                <div className="fixed h-full w-full bg-black/80 inset-0 backdrop-blur-sm" />
                <div className="fixed inset-0 w-screen overflow-y-auto p-4">
                    <div className="flex min-h-full items-center justify-center">
                        <DialogPanel className="w-md sm:w-xl md:w-2xl lg:w-3xl relative space-y-4 p-6 bg-black shadow-lg border-yellow-500 border-2">
                            <Form />
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default FormButton;