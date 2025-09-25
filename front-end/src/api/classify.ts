export async function classifyClothing(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const API_URL = process.env.REACT_APP_BACKEND_URL!;

    try {
        const response = await fetch(
            `${API_URL}/classify`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error(`Backend error: ${response.status}`);
        }

        const data = await response.json();
        return data.category; // expects { "category": "Tops" }
    } catch (err) {
        console.error("Error calling backend:", err);
        return "Unknown";
    }
}
