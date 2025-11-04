
export const API_BASE_URL =
    (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
    "https://frankoitday-backend.onrender.com";


/**
 * Uploads a single file to a specified endpoint.
 *
 * @param file The file object to upload.
 * @param endpoint The API endpoint to send the file to (e.g., "/api/upload-cv/").
 * @returns The JSON response from the server.
 */
export const uploadFile = async (file: File, endpoint: string) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (!res.ok || data.ok === false) {
            const message = data?.detail || data?.error || "Upload failed.";
            throw new Error(message);
        }

        return data;
    } catch (err) {
        console.error("File upload error:", err);
        throw err instanceof Error ? err : new Error("An unknown error occurred.");
    }
};

// You could add other API functions here, for example:
// export const fetchSpeakers = async () => { ... }
