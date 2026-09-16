
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

const BASE_URL = "http://localhost:3002";

interface VideoData {

    videoUrl: string[];
}

export default function Gallery() {
    const { getToken } = useAuth();

    const [video, setVideo] = useState<VideoData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getVideos = async () => {
        try {
            setLoading(true);
            setError("");

            const token = await getToken();

            const response = await fetch(
                `${BASE_URL}/instagram/getVidUrl`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const text = await response.text();

            console.log("STATUS:", response.status);
            console.log("RESPONSE BODY:", text);

            if (!response.ok) {
                throw new Error(
                    `Backend error ${response.status}: ${text}`
                );
            }

            const data: VideoData = JSON.parse(text);

            console.log("VIDEO DATA:", data);

            setVideo(data);

        } catch (error) {
            console.error("Get video error:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Gagal mengambil video"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getVideos();
    }, []);

    /*
     * Backend kamu mengembalikan URL yang bentuknya:
     *
     * [https://example.com/video.mp4](https://example.com/video.mp4)
     *
     * Kita ubah menjadi URL biasa.
     */
    const cleanVideoUrl = (url: string) => {
        const markdownMatch = url.match(/\((https?:\/\/[^)]+)\)/);

        if (markdownMatch) {
            return markdownMatch[1];
        }

        if (url.startsWith("[") && url.includes("](")) {
            return url
                .replace(/^\[/, "")
                .replace(/\]\(.*$/, "");
        }

        return url;
    };

    const handleCreateContainer = () => {
        if (!video) return;

    };

    return (
        <main className="min-h-screen p-6 md:p-10">
            <div className="mx-auto w-full max-w-7xl">

                {/* Header */}
                <header className="mb-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

                        <div>
                            <h1 className="text-2xl font-bold">
                                Video Gallery
                            </h1>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Video yang sudah di-upload dan siap
                                dibuat menjadi Instagram Container.
                            </p>
                        </div>

                        <div className="neu px-5 py-3">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                Total Video
                            </div>

                            <div className="mt-1 text-xl font-bold">
                                {video ? video.videoUrl.length : 0}
                            </div>
                        </div>

                    </div>
                </header>

                {/* Toolbar */}
                <div className="neu mb-8 flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">

                        <div className="neu-inset flex h-10 w-10 items-center justify-center text-lg">
                            🎬
                        </div>

                        <div>
                            <p className="text-sm font-semibold">
                                Ready to publish
                            </p>

                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Video siap dibuat menjadi Instagram Container
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        className="neu-button px-5 py-2.5 text-sm font-semibold"
                    >
                        Upload Video
                    </button>

                </div>

                {/* Loading */}
                {loading && (
                    <div className="neu flex min-h-[300px] items-center justify-center p-10">
                        <p className="text-sm text-gray-500">
                            Loading video...
                        </p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="neu flex min-h-[300px] flex-col items-center justify-center p-10 text-center">

                        <div className="neu-inset mb-5 flex h-16 w-16 items-center justify-center text-2xl">
                            ⚠️
                        </div>

                        <h2 className="text-lg font-bold">
                            Gagal mengambil video
                        </h2>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={getVideos}
                            className="neu-button mt-6 px-6 py-3 text-sm font-semibold"
                        >
                            Coba Lagi
                        </button>

                    </div>
                )}

                {/* Empty */}
                {!loading && !error && !video && (
                    <div className="neu flex min-h-[400px] flex-col items-center justify-center p-10 text-center">

                        <div className="neu-inset mb-5 flex h-20 w-20 items-center justify-center text-3xl">
                            🎬
                        </div>

                        <h2 className="text-lg font-bold">
                            Belum ada video
                        </h2>

                        <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
                            Upload video terlebih dahulu untuk
                            membuat Instagram Container.
                        </p>

                    </div>
                )}

                {/* Video */}
             {!loading && !error && video && ( <div className= "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> {video.videoUrl.map((url, index) => ( <article key={index} className="neu overflow-hidden" > {/* Video Preview */} <div className="relative aspect-[9/16] overflow-hidden"> <video src={cleanVideoUrl(url)} className="h-full w-full object-cover" controls preload="metadata" /> {/* Status */} <div className="absolute left-3 top-3"> <span className="neu px-3 py-1.5 text-xs font-semibold"> Ready </span> </div> </div> {/* Information */} <div className="p-4"> <h3 className="text-sm font-semibold"> Video {index + 1} </h3> <p className="mt-2 truncate text-xs text-gray-500 dark:text-gray-400" title={cleanVideoUrl(url)} > {cleanVideoUrl(url)} </p> <button type="button" onClick={handleCreateContainer} className="neu-button mt-4 w-full px-4 py-2.5 text-xs font-semibold" > Create Instagram Container </button> </div> </article> ))} </div> )}

            </div>
        </main>
    );
}

