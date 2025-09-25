import { useState } from "react";
import { classifyClothing } from "../../api/classify";

export const useClassification = () => {
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState<string>("Unknown");
    const [error, setError] = useState<Error | null>(null);

    const classify = async (file: File) => {
        setLoading(true);
        setError(null);
        try {
            const predicted = await classifyClothing(file);
            setCategory(predicted);
        } catch (err: any) {
            console.error("Classification failed:", err);
            setError(err);
            setCategory("Unknown");
        } finally {
            setLoading(false);
        }
    };

    return { loading, category, setCategory, error, classify };
};
