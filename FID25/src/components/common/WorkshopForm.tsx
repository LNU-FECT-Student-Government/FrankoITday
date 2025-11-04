import { useState, useEffect } from "react";
import FileUpload from "./FileUpload";

const API_BASE_URL =
    (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
    "http://127.0.0.1:8000";

type ScheduleItem = {
    time: string;
    content: string[];
    reservation?: boolean;
    slotMinutes?: number;
};

const schedule3Import = async () => import("../../data/shedule3.json");
const SCHEDULE_3: ScheduleItem[] = (await schedule3Import()).default;

// ===== time slot utilities =====

function parseTimeToMinutes(time: string): number {
    const [h, m] = time.split(":");
    const hours = parseInt(h, 10) || 0;
    const minutes = m ? parseInt(m, 10) || 0 : 0;
    return hours * 60 + minutes;
}

function formatMinutesToTime(totalMinutes: number): string {
    const h = Math.floor(totalMinutes / 60)
        .toString()
        .padStart(2, "0");
    const m = (totalMinutes % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
}

function getTimeSlots(range: string, slotMinutes: number): string[] {
    const [startStr, endStr] = range.split("-");
    if (!endStr) return [range];

    // if the end is not a concrete time (like "end" / "кінець") – show as is
    const endLower = endStr.toLowerCase();
    if (endLower.includes("кінець") || endLower.includes("end")) return [range];

    const start = parseTimeToMinutes(startStr);
    const end = parseTimeToMinutes(endStr);
    const slots: string[] = [];

    for (let t = start; t + slotMinutes <= end; t += slotMinutes) {
        const from = formatMinutesToTime(t);
        const to = formatMinutesToTime(t + slotMinutes);
        slots.push(`${from}-${to}`);
    }

    return slots;
}

export default function WorkshopForm() {
    const [email, setEmail] = useState("");
    // for EACH event – its own selected slot (key – index in SCHEDULE_3)
    const [selectedSlots, setSelectedSlots] = useState<
        Record<number, string | null>
    >({});

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [cvFile, setCvFile] = useState<File | null>(null);

    // all events that require reservation
    const reservableEvents = SCHEDULE_3.filter((item) => item.reservation);

    // from DB: which slots are booked
    const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});

    useEffect(() => {
        const loadBookedSlots = async () => {
            try {
                const res = await fetch(
                    `${API_BASE_URL}/api/workshop-reservations/slots/`
                );
                if (!res.ok) return;

                const data: { workshop_title: string; slot: string }[] =
                    await res.json();

                const grouped: Record<string, string[]> = {};
                data.forEach((item) => {
                    if (!grouped[item.workshop_title]) {
                        grouped[item.workshop_title] = [];
                    }
                    grouped[item.workshop_title].push(item.slot);
                });

                setBookedSlots(grouped);
            } catch {
                // silently ignore, no console spam
            }
        };

        loadBookedSlots();
    }, []);

    const toggleSlot = (eventIndex: number, slot: string) => {
        setSelectedSlots((prev) => {
            const current = prev[eventIndex] ?? null;
            return {
                ...prev,
                // clicking the same slot again will unselect it
                [eventIndex]: current === slot ? null : slot,
            };
        });
    };

    const isSelected = (eventIndex: number, slot: string) =>
        selectedSlots[eventIndex] === slot;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        const cleanEmail = email.trim();

        if (!cleanEmail) {
            setErrorMessage("Please enter your email.");
            return;
        }
        if (!cvFile) {
            setErrorMessage("Please upload your CV.");
            return;
        }

        // build payload for backend
        const reservationsPayload = reservableEvents.flatMap((event) => {
            const originalIndex = SCHEDULE_3.indexOf(event);
            const slot = selectedSlots[originalIndex];

            if (!slot) return [];
            return [
                {
                    workshop_title: event.content[0],
                    slot,
                },
            ];
        });

        if (reservationsPayload.length === 0) {
            setErrorMessage("Please choose at least one time slot.");
            return;
        }

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("email", cleanEmail);
            formData.append("reservations", JSON.stringify(reservationsPayload));
            formData.append("cv", cvFile);

            const res = await fetch(`${API_BASE_URL}/api/workshop-reservations/`, {
                method: "POST",
                body: formData,
            });

            let data: any = {};
            try {
                data = await res.json();
            } catch {
                // no body
            }

            if (!res.ok || data.ok === false) {
                const errors = data?.errors || {};
                let msg: string | string[] | undefined =
                    errors.email ||
                    errors.reservations ||
                    errors.non_field_errors ||
                    data.detail;

                if (Array.isArray(msg)) {
                    msg = msg.join(" ");
                }

                setErrorMessage(
                    msg ||
                    "Failed to send reservation. Please check your data and try again."
                );
                return;
            }

            setBookedSlots((prev) => {
                const updated: Record<string, string[]> = { ...prev };

                reservationsPayload.forEach(({ workshop_title, slot }) => {
                    const currentList = updated[workshop_title]
                        ? [...updated[workshop_title]]
                        : [];
                    if (!currentList.includes(slot)) {
                        currentList.push(slot);
                    }
                    updated[workshop_title] = currentList;
                });

                return updated;
            });

            // reset selection so no slot stays highlighted as "selected"
            setSelectedSlots({});
            setCvFile(null);
            // setEmail(""); // якщо захочеш – можеш теж очищати

            setIsSubmitted(true);
        } catch (err) {
            console.error(err);
            setErrorMessage("Network error. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="max-w-lg mx-auto p-6 ">
                <div className="text-center">
                    <div className="text-yellow-500 text-4xl mb-2">✓</div>
                    <h3 className="text-lg font-bold text-yellow-600 mb-2">
                        Thank you!
                    </h3>
                    <p className="text-yellow-600">
                        Your reservation has been saved. We will see you at the workshop!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-fit bg-black text-white p-4 md:p-8">
            <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-8">
                    Workshop reservation
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col items-center"
                >
                    {/* Email Input */}
                    <div className="mb-8 w-full max-w-md text-left">
                        <label className="block text-sm mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border-2 border-yellow-500 px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
                            placeholder="your@email.com"
                        />
                        <p className="text-gray-400 text-xs mt-2">
                            This email is used to check if you are already registered. If you
                            have not registered yet, please fill in the registration form first.
                        </p>
                    </div>

                    {/* Errors */}
                    {errorMessage && (
                        <p className="text-red-400 text-sm mb-4">{errorMessage}</p>
                    )}

                    {/* Automatically render ALL events with reservation=true */}
                    {reservableEvents.length > 0 ? (
                        reservableEvents.map((event, index) => {
                            const slots =
                                event.slotMinutes && event.time
                                    ? getTimeSlots(event.time, event.slotMinutes)
                                    : [event.time];

                            const originalIndex = SCHEDULE_3.indexOf(event);
                            const title = event.content[0];

                            return (
                                <div
                                    key={index}
                                    className="mt-8 w-full max-w-lg border-t border-yellow-700 pt-6"
                                >
                                    <h2 className="text-2xl font-bold mb-3 text-yellow-500">
                                        {title}
                                    </h2>

                                    <p className="text-gray-300 mb-1">
                                        Time:{" "}
                                        <span className="font-semibold">{event.time}</span>
                                    </p>
                                    <p className="text-gray-300 mb-4">
                                        Reservation required:{" "}
                                        <span className="font-semibold">
                                            {event.reservation ? "yes" : "no"}
                                        </span>
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-2">
                                        {slots.map((slot) => {
                                            const isBooked =
                                                bookedSlots[title]?.includes(slot) ?? false;
                                            const disabled = isBooked || isSubmitting;

                                            return (
                                                <button
                                                    key={`${title}-${slot}`}
                                                    type="button"
                                                    disabled={disabled}
                                                    onClick={() =>
                                                        !disabled && toggleSlot(originalIndex, slot)
                                                    }
                                                    className={`px-4 py-2 w-fit rounded-full font-medium transition-all ${
                                                        isBooked
                                                            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                                                            : isSelected(originalIndex, slot)
                                                                ? "bg-yellow-500 text-black outline-8 -outline-offset-8 outline-yellow-500"
                                                                : "bg-black text-white hover:bg-yellow-400/20"
                                                    } outline-2 -outline-offset-2 outline-yellow-500`}
                                                >
                                                    {slot}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-gray-400 mt-6">
                            There are no events available for reservation.
                        </p>
                    )}

                    {/* File Upload */}
                    <div className="py-5">
                        <FileUpload
                            onClearSuccess={() => void 0}
                            onFileSelect={(file) => {
                                setCvFile(file);
                            }}
                            label="Ur CV"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-12">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="border-2 border-yellow-500 px-8 py-2 text-yellow-500 font-bold transition-colors hover:bg-yellow-500 hover:text-black disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Sending..." : "Send"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
