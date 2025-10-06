import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'https://frankoitday-backend.onrender.com';

type FieldErrors = {
    name?: string;
    email?: string;
    phone?: string;
    telegram?: string;
    non_field_errors?: string | string[];
};

export default function ContactForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        telegram: '',
        phone: '',
    });

    const validateEmail = (email: string): boolean =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const formatPhoneNumber = (value: string): string => {
        const digits = value.replace(/\D/g, '').slice(0, 9);
        let formatted = '';
        if (digits.length > 0) formatted = digits.slice(0, 2);
        if (digits.length > 2) formatted += ' ' + digits.slice(2, 5);
        if (digits.length > 5) formatted += ' ' + digits.slice(5, 7);
        if (digits.length > 7) formatted += ' ' + digits.slice(7, 9);
        return formatted;
    };

    const handleInputChange = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setFieldErrors((prev) => ({ ...prev, [name]: undefined, non_field_errors: undefined }));

        if (name === 'telegram') {
            setFormData((p) => ({ ...p, telegram: value.replace(/^@+/, '') }));
        } else if (name === 'email') {
            setFormData((p) => ({ ...p, email: value }));
            if (value && !validateEmail(value)) setEmailError('Please enter a valid email address');
            else setEmailError('');
        } else if (name === 'phone') {
            setFormData((p) => ({ ...p, phone: formatPhoneNumber(value) }));
        } else {
            setFormData((p) => ({ ...p, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);
        setFieldErrors({});

        const payload = {
            name: formData.name,
            email: formData.email,
            telegram: `@${formData.telegram}`,
            phone: `+380 ${formData.phone}`,
        };

        try {
            const res = await fetch(`${API_BASE}/api/contact/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok || data?.ok === false) {
                const be = (data && data.errors) || {};
                const next: FieldErrors = {};

                (['name', 'email', 'phone', 'telegram', 'non_field_errors'] as (keyof FieldErrors)[]).forEach((k) => {
                    const v = be?.[k];
                    if (v) next[k] = Array.isArray(v) ? v.join(', ') : String(v);
                });

                const general = String(next.non_field_errors ?? '');
                if (!next.email && /already|exists/i.test(general)) next.email = general;

                if (next.email) setEmailError(next.email);
                setFieldErrors(next);
                throw new Error('Submit failed');
            }

            setIsSubmitted(true);
        } catch {
            //
        } finally {
            setIsSubmitting(false);
        }
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
        <div className="w-full p-3 bg-black">
            <h2 className="text-2xl font-bold mb-6 text-white">Contact Form</h2>

            <div className="space-y-4">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Ivan Franko"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                            fieldErrors.name ? 'border-red-500' : 'border-yellow-500'
                        }`}
                    />
                    {fieldErrors.name && <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                        Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-white pointer-events-none font-mono">+380</span>
                        <input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="__ ___ __ __"
                            required
                            maxLength={12}
                            className={`w-full pl-14 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                                fieldErrors.phone ? 'border-red-500' : 'border-yellow-500'
                            }`}
                        />
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Format: +380 93 123 90 97</p>
                    {fieldErrors.phone && <p className="text-red-400 text-xs mt-1">{fieldErrors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="example@email.com"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                            emailError || fieldErrors.email ? 'border-red-500' : 'border-yellow-500'
                        }`}
                    />
                    {(emailError || fieldErrors.email) && (
                        <p className="text-red-400 text-xs mt-1">{emailError || fieldErrors.email}</p>
                    )}
                </div>

                {/* Telegram */}
                <div>
                    <label htmlFor="telegram" className="block text-sm font-medium text-white mb-1">
                        Telegram Nickname <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-white pointer-events-none">@</span>
                        <input
                            id="telegram"
                            name="telegram"
                            value={formData.telegram}
                            onChange={handleInputChange}
                            placeholder="username"
                            required
                            className={`w-full pl-7 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                                fieldErrors.telegram ? 'border-red-500' : 'border-yellow-500'
                            }`}
                        />
                    </div>
                    <p className="text-gray-400 text-xs mt-1">for example: @Xopycc</p>
                    {fieldErrors.telegram && <p className="text-red-400 text-xs mt-1">{fieldErrors.telegram}</p>}
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={
                        !formData.name ||
                        !formData.email ||
                        !formData.phone ||
                        !formData.telegram ||
                        isSubmitting ||
                        !!emailError ||
                        formData.phone.replace(/\s/g, '').length !== 9
                    }
                    className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:bg-amber-950 disabled:text-gray-500"
                >
                    {isSubmitting ? 'Sending...' : 'Send'}
                </button>

                {fieldErrors.non_field_errors && (
                    <p className="text-red-400 text-sm mt-2">
                        {Array.isArray(fieldErrors.non_field_errors)
                            ? fieldErrors.non_field_errors.join(', ')
                            : fieldErrors.non_field_errors}
                    </p>
                )}
            </div>
        </div>
    );
}
