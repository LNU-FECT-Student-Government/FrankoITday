import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useState } from 'react';
import MiniSchedule from './MiniSchedule';
import ScheduleIcon from './svg/ScheduleIcon';


const schedule1Import = async () => import("../../data/shedule1.json");
const schedule2Import = async () => import("../../data/shedule2.json");
const SCHEDULE_1: { time: string; content: string[] }[] = (await schedule1Import()).default;
const SCHEDULE_2: { time: string; content: string[] }[] = (await schedule2Import()).default;

export default function WorkshopForm() {
    const [email, setEmail] = useState('');
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

    const toggleCheck = (streamIndex: number, itemIndex: number) => {
        const key = `${streamIndex}-${itemIndex}`;
        setCheckedItems(prev => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    const isChecked = (streamIndex: number, itemIndex: number) => {
        return checkedItems.has(`${streamIndex}-${itemIndex}`);
    };

    return (
        <div className="min-h-fit bg-black text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Email Input Section */}
                <div className="mb-8 max-w-xl">
                    <label className="block text-sm mb-2">email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-2 border-yellow-500 px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
                        placeholder="your@email.com"
                    />
                    <p className="text-gray-400 text-xs mt-2">
                        this email is used to check if you are already registered. If you haven't registered yet go to registration form
                    </p>
                </div>

                {/* Emoji Icon */}
                <div className="flex justify-end mb-6">
                    <Popover>
                        <PopoverButton className="bg-yellow-500 rounded-full w-12 h-12 flex items-center justify-center text-2xl z-100">
                            <ScheduleIcon props={{ width: 24, height: 24 }} />
                        </PopoverButton>
                        <PopoverPanel
                            transition
                            anchor="bottom end"
                            className="rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0 absolute"
                        >
                            <div className="p-0 ">
                                <MiniSchedule schedule1={SCHEDULE_1} schedule2={SCHEDULE_2} />
                            </div>
                        </PopoverPanel>
                    </Popover>

                </div>

                {/* Schedules Side by Side */}
                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Stream 1 */}
                        <div>
                            <h2 className="text-xl text-right pr-4 font-bold mb-6">1 Stream</h2>

                            <div className="flex flex-row md:flex-col items-end flex-wrap gap-2">
                                {SCHEDULE_1.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <span className="hidden md:inline text-white">{item.content[0]}</span>
                                        <button
                                            onClick={() => toggleCheck(1, idx)}
                                            className={`px-4 py-2 w-fit rounded-full font-medium transition-all ${isChecked(1, idx)
                                                ? 'bg-yellow-500 text-black outline-8 -outline-offset-8 outline-yellow-500'
                                                : 'bg-black text-white hover:bg-yellow-400/20'
                                                } outline-2 -outline-offset-2 outline-yellow-500`}
                                        >
                                            {item.time}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Vertical Line */}
                        <div className="hidden md:block absolute left-1/2 top-16 bottom-0 w-0.5 bg-yellow-500 -translate-x-1/2"></div>

                        {/* Stream 2 */}
                        <div>
                            <h2 className="text-xl pl-4 font-bold mb-6">2 Stream</h2>

                            <div className="flex flex-row md:flex-col flex-wrap gap-2 ">
                                {SCHEDULE_2.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <button
                                            onClick={() => toggleCheck(2, idx)}
                                            className={`min-w-30 px-4 py-2 w-fit rounded-full font-medium transition-all ${isChecked(2, idx)
                                                ? 'bg-yellow-500 text-black outline-8 -outline-offset-8 outline-yellow-500'
                                                : 'bg-black text-white hover:bg-yellow-400/20'
                                                } outline-2 -outline-offset-2 outline-yellow-500`}
                                        >
                                            {item.time}
                                        </button>
                                        <span className="hidden md:inline text-white">{item.content[0]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Register Button */}
                <div className="flex justify-center mt-12">
                    <button className="border-2 border-yellow-500 px-8 py-2 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors">
                        send
                    </button>
                </div>
            </div>
        </div>
    );
}