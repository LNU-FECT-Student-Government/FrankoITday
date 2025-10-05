import { useState } from 'react';

export default function ContactForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailError, setEmailError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        telegram: '',
        phone: '',
    });

    // Email validation regex
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Phone formatting function
    const formatPhoneNumber = (value: string): string => {
        // Remove all non-digits
        const digits = value.replace(/\D/g, '');

        // Limit to 9 digits (Ukrainian phone without country code)
        const limitedDigits = digits.slice(0, 9);

        // Format: XX XXX XX XX
        let formatted = '';
        if (limitedDigits.length > 0) {
            formatted = limitedDigits.slice(0, 2);
        }
        if (limitedDigits.length > 2) {
            formatted += ' ' + limitedDigits.slice(2, 5);
        }
        if (limitedDigits.length > 5) {
            formatted += ' ' + limitedDigits.slice(5, 7);
        }
        if (limitedDigits.length > 7) {
            formatted += ' ' + limitedDigits.slice(7, 9);
        }

        return formatted;
    };

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;

        // Remove @ if user types it in telegram field
        if (name === 'telegram') {
            const cleanValue = value.replace(/^@+/, '');
            setFormData(prev => ({
                ...prev,
                [name]: cleanValue
            }));
        } else if (name === 'contact') {
            // Validate email in real-time
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));

            if (value && !validateEmail(value)) {
                setEmailError('Please enter a valid email address');
            } else {
                setEmailError('');
            }
        } else if (name === 'phone') {
            // Format phone number
            const formatted = formatPhoneNumber(value);
            setFormData(prev => ({
                ...prev,
                [name]: formatted
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    interface FormData {
        name: string;
        contact: string;
        telegram: string;
        phone: string;
    }

    interface Fields extends FormData {

    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Final email validation before submit
        if (!validateEmail(formData.contact)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);


        /*
        Object.keys(fields).forEach(key => {
            const input: HTMLInputElement = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = fields[key as keyof Fields];
        });
        */

        // Show success message after a delay
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1000);
    };

    if (isSubmitted) {
        return (
            <div className="max-w-lg mx-auto p-6 ">
                <div className="text-center">
                    <div className="text-yellow-500 text-4xl mb-2">✓</div>
                    <h3 className="text-lg font-bold text-yellow-600 mb-2">Thank you!</h3>
                    <p className="text-yellow-600">We will contact you soon.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="w-full p-3 bg-black">
                <h2 className="text-2xl font-bold mb-6 text-white">Contact Form</h2>

                <div className="space-y-4">
                    {/* 1. Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder='Ivan Franko'
                            className="w-full px-3 py-2 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>

                    {/* 2. Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                            Phone <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-white pointer-events-none font-mono">
                                +380
                            </span>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="__ ___ __ __"
                                required
                                maxLength={12}
                                className="w-full pl-14 pr-3 py-2 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono"
                            />
                        </div>
                        <p className="text-gray-400 text-xs mt-1">Format: +380 93 123 90 97</p>
                    </div>

                    {/* 3. Email */}
                    <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-white mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleInputChange}
                            required
                            placeholder="example@email.com"
                            className={`w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-yellow-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                        />
                        {emailError && (
                            <p className="text-red-400 text-xs mt-1">{emailError}</p>
                        )}
                    </div>

                    {/* 4. Telegram */}
                    <div>
                        <label htmlFor="telegram" className="block text-sm font-medium text-white mb-1">
                            Telegram Nickname <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-white pointer-events-none">
                                @
                            </span>
                            <input
                                type="text"
                                id="telegram"
                                name="telegram"
                                value={formData.telegram}
                                onChange={handleInputChange}
                                placeholder="username"
                                required
                                className="w-full pl-7 pr-3 py-2 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            />
                        </div>
                        <p className="text-gray-400 text-xs mt-1">for example: @Xopycc</p>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!formData.name || !formData.contact || !formData.phone || !formData.telegram || isSubmitting || !!emailError || formData.phone.replace(/\s/g, '').length !== 9}
                        className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-200 disabled:bg-amber-950 disabled:text-gray-500 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>
        </>
    );
}