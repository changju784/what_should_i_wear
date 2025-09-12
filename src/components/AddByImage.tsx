import React, { useRef, useState, useEffect } from "react";
import { X, Image, Camera } from "lucide-react";

interface AddByImageProps {
    onClose: () => void;
    onImageAdded: (imgSrc: string) => void;
}

const AddByImage: React.FC<AddByImageProps> = ({ onClose, onImageAdded }) => {
    const [showCamera, setShowCamera] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Start/stop camera stream
    useEffect(() => {
        let stream: MediaStream | null = null;
        if (showCamera && videoRef.current) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((mediaStream) => {
                    stream = mediaStream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = mediaStream;
                        videoRef.current.play();
                    }
                })
                .catch(() => {
                    alert("Could not access camera.");
                    setShowCamera(false);
                });
        }
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [showCamera]);

    // Capture photo from video
    const handleCapturePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement("canvas");
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const imgSrc = canvas.toDataURL("image/png");
                onImageAdded(imgSrc);
                setShowCamera(false);
                onClose();
            }
        }
    };

    // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const imgSrc = ev.target?.result as string;
                onImageAdded(imgSrc);
                onClose();
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 relative flex flex-col items-center">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    <X className="w-6 h-6" />
                </button>
                {!showCamera ? (
                    <>
                        <h2 className="text-lg font-semibold mb-4">Add Item by Image</h2>
                        <button
                            onClick={() => document.getElementById("addByImageFileInput")?.click()}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition mb-3"
                        >
                            <Image className="w-5 h-5" /> Use from my devices
                        </button>
                        <input
                            id="addByImageFileInput"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <button
                            onClick={() => setShowCamera(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                        >
                            <Camera className="w-5 h-5" /> Take a photo
                        </button>
                    </>
                ) : (
                    <>
                        <video
                            ref={videoRef}
                            className="rounded-lg w-80 h-60 bg-black"
                            autoPlay
                            playsInline
                        />
                        <button
                            onClick={handleCapturePhoto}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                        >
                            Capture Photo
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddByImage;