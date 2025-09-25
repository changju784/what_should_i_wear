import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { classifyClothing } from "../../api/classify";

interface ClassificationResultProps {
    file: File;
    imgSrc: string;
    onClose: () => void;
    onConfirm: (item: { imgSrc: string; category: string }) => void;
}

const categories = ["Tops", "Outerwear", "Bottoms", "Dresses", "Footwear"];

const ClassificationResult: React.FC<ClassificationResultProps> = ({
    file,
    imgSrc,
    onClose,
    onConfirm,
}) => {
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState<string>("Unknown");

    useEffect(() => {
        const runClassification = async () => {
            try {
                const predicted = await classifyClothing(file);
                setCategory(predicted);
            } catch (err) {
                console.error("Classification failed:", err);
                setCategory("Unknown");
            } finally {
                setLoading(false);
            }
        };
        runClassification();
    }, [file]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    <X className="w-6 h-6" />
                </button>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                        <p className="text-gray-600">Classifying your item...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <img
                            src={imgSrc}
                            alt="Preview"
                            className="h-40 w-40 object-cover rounded mb-4"
                        />

                        <label className="text-gray-700 mb-2">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border rounded px-3 py-2 mb-6 w-full"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={() => onConfirm({ imgSrc, category })}
                            className="bg-blue-500 text-white px-6 py-2 rounded-full shadow hover:bg-blue-600"
                        >
                            Add to Closet
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassificationResult;
