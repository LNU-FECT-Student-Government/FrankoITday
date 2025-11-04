import { useState, useMemo, useEffect } from "react";


export const Theme = {
    Yellow: "yellow",
    Blue: "blue",
    Green: "green",
    Red: "red",
} as const;
export type Theme = typeof Theme[keyof typeof Theme];

type FileUploadProps = {
    theme?: Theme;
    label: string;
    acceptedFileType?: string;
    maxFileSizeMB?: number;
    onFileSelect: (file: File | null) => void;
    isSubmitting?: boolean;
    uploadSuccess?: boolean;
    onClearSuccess: () => void;
};

type ThemeClasses = {
    border: string;
    text: string;
    focusRing: string;
    hoverBg: string;
    hoverText: string;
    submitBorder: string; // Можна видалити, якщо кнопка 'Надіслати' ніколи не повернеться
    submitText: string; // Aле залишимо для консистентності теми
    submitHoverBg: string;
    submitHoverText: string;
};

const themeMap: Record<Theme, ThemeClasses> = {
    [Theme.Yellow]: {
        border: "border-yellow-500",
        text: "text-yellow-500",
        focusRing: "focus:ring-yellow-500",
        hoverBg: "hover:bg-yellow-500/10",
        hoverText: "hover:text-yellow-400",
        submitBorder: "border-yellow-500",
        submitText: "text-yellow-500",
        submitHoverBg: "hover:bg-yellow-500",
        submitHoverText: "hover:text-black",
    },
    [Theme.Blue]: {
        border: "border-blue-500",
        text: "text-blue-500",
        focusRing: "focus:ring-blue-500",
        hoverBg: "hover:bg-blue-500/10",
        hoverText: "hover:text-blue-400",
        submitBorder: "border-blue-500",
        submitText: "text-blue-500",
        submitHoverBg: "hover:bg-blue-500",
        submitHoverText: "hover:text-white",
    },
    [Theme.Green]: {
        border: "border-green-500",
        text: "text-green-500",
        focusRing: "focus:ring-green-500",
        hoverBg: "hover:bg-green-500/10",
        hoverText: "hover:text-green-400",
        submitBorder: "border-green-500",
        submitText: "text-green-500",
        submitHoverBg: "hover:bg-green-500",
        submitHoverText: "hover:text-black",
    },
    [Theme.Red]: {
        border: "border-red-500",
        text: "text-red-500",
        focusRing: "focus:ring-red-500",
        hoverBg: "hover:bg-red-500/10",
        hoverText: "hover:text-red-400",
        submitBorder: "border-red-500",
        submitText: "text-red-500",
        submitHoverBg: "hover:bg-red-500",
        submitHoverText: "hover:text-white",
    },
};

const UploadIcon = ({ className }: { className: string }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        />
    </svg>
);

const FileIcon = ({ className }: { className: string }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
    </svg>
);

const CloseIcon = ({ className }: { className: string }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

export default function FileUpload({
    label,
    theme = Theme.Yellow,
    acceptedFileType = "application/pdf", // Default to PDF
    maxFileSizeMB = 20, // Default to 20MB
    // Нові props
    onFileSelect,
    isSubmitting = false,
    uploadSuccess = false,
    onClearSuccess,
}: FileUploadProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // isUploading видалено, використовуємо isSubmitting
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isUploaded, setIsUploaded] = useState(false);

    // Переводимо мегабайти в байти для порівняння
    const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;

    const styles = useMemo(() => themeMap[theme], [theme]);

    // Синхронізуємо стан 'isUploaded' з 'uploadSuccess' від батька
    useEffect(() => {
        if (uploadSuccess) {
            setIsUploaded(true);
            setSelectedFile(null); // Очищуємо файл після успішного завантаження
        }
    }, [uploadSuccess]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            onFileSelect(null); // Повідомляємо батька
            return;
        }

        setErrorMessage(null);
        setIsUploaded(false);

        // --- Клієнтська валідація файлу ---

        if (acceptedFileType && file.type !== acceptedFileType) {
            setErrorMessage(
                `Невірний тип файлу. Будь ласка, завантажте ${acceptedFileType.split("/")[1]?.toUpperCase() ?? "файл"
                }.`
            );
            onFileSelect(null); // Повідомляємо про невалідний файл
            return;
        }

        if (file.size > maxFileSizeBytes) {
            setErrorMessage(`Файл завеликий. Максимальний розмір ${maxFileSizeMB}MB.`);
            onFileSelect(null); // Повідомляємо про невалідний файл
            return;
        }

        setSelectedFile(file);
        onFileSelect(file); // Передаємо валідний файл батьку
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setIsUploaded(false);
        onFileSelect(null); // Повідомляємо батька, що файл видалено
    };

    // handleSubmit видалено

    // Екран успішного завантаження
    if (isUploaded) {
        return (
            <div className="max-w-md mx-auto p-6 text-center">
                <div className={`text-4xl mb-2 ${styles.text}`}>✓</div>
                <h3 className={`text-lg font-bold ${styles.text} mb-2`}>
                    Завантажено!
                </h3>
                <p className="text-gray-300">Ваш файл було успішно отримано.</p>
                <button
                    type="button"
                    onClick={() => {
                        setIsUploaded(false);
                        onClearSuccess(); // Повідомляємо батька, що екран успіху закрито
                    }}
                    className={`mt-4 text-sm ${styles.text} ${styles.hoverText} transition-colors`}
                >
                    Завантажити інший файл
                </button>
            </div>
        );
    }

    // Змінено <form> на <div>
    return (
        <div className="w-full max-w-md mx-auto text-white">
            <label className="block text-sm mb-2 text-left">{label}</label>
            <div
                className={`relative flex items-center justify-center w-full p-6 border-2 ${styles.border} border-dashed cursor-pointer ${styles.hoverBg} transition-colors`}
            >
                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept={acceptedFileType} // Фільтр для діалогу вибору файлу
                    onChange={handleFileChange}
                    disabled={isSubmitting} // Використовуємо 'isSubmitting'
                />
                <div className="flex flex-col items-center">
                    <UploadIcon className={`w-12 h-12 ${styles.text}`} />
                    <p className="mt-2 text-sm text-gray-300">
                        <span className={`font-semibold ${styles.text}`}>
                            Натисніть для завантаження
                        </span>{" "}
                        або перетягніть
                    </p>
                    <p className="text-xs text-gray-400">
                        ({acceptedFileType?.split("/")[1]?.toUpperCase() ?? "Файл"}
                        , Макс {maxFileSizeMB}MB)
                    </p>
                </div>
            </div>

            {/* Блок з інформацією про обраний файл */}
            {selectedFile && !isSubmitting && (
                <div
                    className={`flex items-center justify-between w-full mt-4 p-3 border ${styles.border} bg-white/5`}
                >
                    <div className="flex items-center min-w-0">
                        <FileIcon className={`w-5 h-5 flex-shrink-0 ${styles.text}`} />
                        <span className="ml-3 text-sm text-gray-200 truncate">
                            {selectedFile.name}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={handleRemoveFile}
                        className={`ml-4 text-gray-400 hover:text-red-500 transition-colors ${styles.focusRing}`}
                        aria-label="Видалити файл"
                    >
                        <CloseIcon className="w-5 h-5" />
                    </button>
                </div>
            )}

            {errorMessage && (
                <p className="text-red-400 text-sm mt-4 text-center">
                    {errorMessage}
                </p>
            )}

            {/* Блок <div className="flex justify-center mt-6">...</div> з кнопкою "Надіслати" видалено */}
        </div>
    );
}

