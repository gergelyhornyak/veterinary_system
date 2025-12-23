import { useEffect, useRef, useState } from "react";

export default function CameraPage() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [streaming, setStreaming] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    // Start camera stream
    const startCamera = async () => {
        setError(null);
        try {
            if (typeof navigator === "undefined" || !navigator.mediaDevices) {
                throw new Error("Camera API not supported in this context.");
            }
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            setStreaming(true);
        } catch (err) {
            console.error("Error accessing camera:", err);
            setError(`Camera error: ${err.message}`);
        }
    };


    // Stop the camera stream
    const stopCamera = () => {
        const stream = videoRef.current?.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
        }
        setStreaming(false);
    };

    // Capture photo
    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const width = video.videoWidth;
        const height = video.videoHeight;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/png");
        setPhoto(dataUrl);
        stopCamera();
    };

    // Upload photo to API
    const uploadPhoto = async () => {
        if (!photo) return;
        setUploading(true);
        setError(null);

        try {
            const res = await fetch(`${apiUrl()}/picture/upload`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: photo }),
            });

            if (!res.ok) throw new Error("Upload failed");
            alert("Photo uploaded successfully!");
        } catch (err) {
            console.error(err);
            setError("Error uploading photo.");
        } finally {
            setUploading(false);
        }
    };

    // Clean up camera on unmount
    useEffect(() => {
        return () => stopCamera();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Camera Capture</h1>

            {!streaming && !photo && (
                <button
                    onClick={startCamera}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Open Camera
                </button>
            )}

            {streaming && (
                <div className="flex flex-col items-center">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="rounded-lg shadow-md w-full max-w-md mb-4"
                    />
                    <button
                        onClick={takePhoto}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                        Take Photo
                    </button>
                </div>
            )}

            {photo && (
                <div className="flex flex-col items-center">
                    <img
                        src={photo}
                        alt="Captured"
                        className="rounded-lg shadow-md w-full max-w-md mb-4"
                    />
                    <div className="flex gap-4">
                        <button
                            onClick={uploadPhoto}
                            disabled={uploading}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            {uploading ? "Uploading..." : "Save / Upload"}
                        </button>
                        <button
                            onClick={() => {
                                setPhoto(null);
                                startCamera();
                            }}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                        >
                            Retake
                        </button>
                    </div>
                </div>
            )}

            <canvas ref={canvasRef} hidden />

            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}
