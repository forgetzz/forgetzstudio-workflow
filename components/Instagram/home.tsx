
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { InstagramContainer, ContainerResponse } from "@/types";
export default function Home() {

    const { getToken } = useAuth();
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!
    const [videoUrl, setVideoUrl] = useState("");
    const [caption, setCaption] = useState("");
    const [audioName, setAudioName] = useState("");
    const [scheduleDate, setScheduleDate] = useState("");

    const [data, setData] = useState<InstagramContainer[]>([]);

    const [loading, setLoading] = useState(false);
    const [loadingContainers, setLoadingContainers] = useState(false);

    const formatDate = (date: string | null) => {
        if (!date) {
            return "-";
        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "-";
        }

        return parsedDate.toLocaleString("id-ID", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    const getContainers = async () => {
        try {
            setLoadingContainers(true);

            const token = await getToken();

            if (!token) {
                console.error("Token tidak ditemukan");
                return;
            }
            const response = await axios.get<InstagramContainer>(
                "http://localhost:3002/instagram/instagramContainerUser",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Container response:", response.data);

            setData([response.data]);


        } catch (error) {
            console.error("Gagal mengambil container:", error);
        } finally {
            setLoadingContainers(false);
        }
    };

    const createContainer = async () => {
        if (!scheduleDate) {
            return alert("fields tidak boleh kosong")
        }

        try {
            if (!videoUrl) {
                alert("Video URL wajib diisi");
                return;
            }

            setLoading(true);

            const token = await getToken();

            if (!token) {
                alert("Token tidak ditemukan");
                return;
            }

            const response = await axios.post<ContainerResponse>(
                `${BASE_URL}/instagram/CreatecontainerId`,
                {
                    videoUrl,
                    caption,
                    audioName,
                    scheduledAt: scheduleDate || null,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Create container:", response.data);

            if (!response.data.success) {
                alert("Gagal membuat container");
                return;
            }

            alert("Container berhasil dibuat");

            // Reset form
            setVideoUrl("");
            setCaption("");
            setAudioName("");
            setScheduleDate("");

            // Ambil data terbaru
            await getContainers();
        } catch (error) {
            console.error("Gagal membuat container:", error);

            if (axios.isAxiosError(error)) {
                console.error("Response error:", error.response?.data);
            }

            alert("Gagal membuat container");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getContainers();
    }, []);



    const getStatusText = (status: boolean | null) => {
        if (status === true) {
            return "Selesai";
        }

        if (status === false) {
            return "Gagal";
        }

        return "Menunggu";
    };

    const getPublishText = (publish: boolean | null) => {
        if (publish === true) {
            return "Published";
        }

        if (publish === false) {
            return "Belum publish";
        }

        return "Menunggu";
    };
    return (

        <div className="mx-auto w-full  text-black px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <header className="mb-8 sm:mb-10">
                <div className="mb-3 flex items-center gap-3">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-pink-500" />

                    <span className="text-sm font-medium ">
                        Instagram
                    </span>
                </div>

                <h1 className="text-2xl font-bold text-black">
                    Instagram Multi Auto Post
                </h1>

                <p className="mt-2 max-w-2xl text-sm">
                    Buat dan kelola Instagram Reels container.
                </p>
            </header>

            {/* Create Container */}
            <section className="neu mb-8 rounded-2xl p-4 sm:mb-10 sm:p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold">
                        Create Container
                    </h2>

                    <p className="mt-1 text-sm ">
                        Masukkan data video yang akan dikirim ke Instagram.
                    </p>
                </div>

                <div className="space-y-5">
                    {/* Video URL */}
                    <div>
                        <label
                            htmlFor="videoUrl"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Video URL
                        </label>

                        <input
                            id="videoUrl"
                            type="url"
                            value={videoUrl}
                            onChange={(event) => setVideoUrl(event.target.value)}
                            placeholder="https://example.com/video.mp4"
                            className="
            w-full rounded-xl border border-gray-300
            bg-white px-4 py-3 text-sm text-gray-900
            outline-none transition
            focus:border-pink-500
            focus:ring-2 focus:ring-pink-500/20
            dark:border-gray-700
            dark:bg-gray-950
            dark:text-white
          "
                        />
                    </div>

                    {/* Caption */}
                    <div>
                        <label
                            htmlFor="caption"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Caption
                        </label>

                        <textarea
                            id="caption"
                            value={caption}
                            onChange={(event) => setCaption(event.target.value)}
                            placeholder="Tulis caption Instagram..."
                            rows={5}
                            className="
            w-full resize-none rounded-xl border border-gray-300
            bg-white px-4 py-3 text-sm text-gray-900
            outline-none transition
            focus:border-pink-500
            focus:ring-2 focus:ring-pink-500/20
            dark:border-gray-700
            dark:bg-gray-950
            dark:text-white
          "
                        />
                    </div>

                    {/* Audio */}
                    <div>
                        <label
                            htmlFor="audioName"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Audio Name
                        </label>

                        <input
                            id="audioName"
                            type="text"
                            value={audioName}
                            onChange={(event) => setAudioName(event.target.value)}
                            placeholder="Nama audio"
                            className="
            w-full rounded-xl border border-gray-300
            bg-white px-4 py-3 text-sm text-gray-900
            outline-none transition
            focus:border-pink-500
            focus:ring-2 focus:ring-pink-500/20
            dark:border-gray-700
            dark:bg-gray-950
            dark:text-white
          "
                        />
                    </div>

                    {/* Schedule */}
                    <div>
                        <label
                            htmlFor="scheduleDate"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Schedule Date
                        </label>

                        <input
                            id="scheduleDate"
                            type="datetime-local"
                            value={scheduleDate}
                            onChange={(event) => setScheduleDate(event.target.value)}
                            className="
            w-full rounded-xl border border-gray-300
            bg-white px-4 py-3 text-sm text-gray-900
            outline-none transition
            focus:border-pink-500
            focus:ring-2 focus:ring-pink-500/20
            dark:border-gray-700
            dark:bg-gray-950
            dark:text-white
          "
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="button"
                        onClick={createContainer}
                        disabled={loading}
                        className="
          w-full rounded-xl neu-button
          px-5 py-3 text-sm font-semibold text-white
          transition
          hover:bg-green-700
          disabled:cursor-not-allowed
          disabled:opacity-50
          sm:w-auto
          active:neu-button-active
        "
                    >
                        {loading ? "Creating..." : "Create Post"}
                    </button>
                </div>
            </section>

            {/* Post List */}
            <section className="neu rounded-2xl">
                {/* Section Header */}
                <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6 dark:border-gray-800">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
                            Postingan List
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Daftar Instagram container milik akun ini.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={getContainers}
                        disabled={loadingContainers}
                        className="
          w-full rounded-xl border border-gray-300
          px-4 py-2.5 text-sm font-medium
          text-gray-700 transition
          hover:bg-gray-100
          disabled:opacity-50
          sm:w-auto
          dark:border-gray-700
          dark:text-gray-300
          dark:hover:bg-gray-800
        "
                    >
                        {loadingContainers ? "Loading..." : "Refresh"}
                    </button>
                </div>

                {/* Loading */}
                {loadingContainers ? (
                    <div className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                        Loading container...
                    </div>
                ) : data.length === 0 ? (
                    <div className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                        Belum ada container.
                    </div>
                ) : (
                    <>
                        {/* ================= MOBILE ================= */}
                        <div className="divide-y divide-gray-200 md:hidden dark:divide-gray-800">
                            {data.map((post) => (
                                <article key={post.containerId} className="space-y-4 p-4">
                                    {/* Container ID */}
                                    <div>
                                        <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                                            Container ID
                                        </p>

                                        <p className="break-all font-mono text-xs text-gray-900 dark:text-white">
                                            {post.containerId}
                                        </p>
                                    </div>

                                    {/* Instagram User */}
                                    <div>
                                        <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                                            Instagram User ID
                                        </p>

                                        <p className="break-all font-mono text-xs text-gray-600 dark:text-gray-400">
                                            {post.instagramUserId}
                                        </p>
                                    </div>

                                    {/* Schedule */}
                                    <div>
                                        <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                                            Schedule
                                        </p>

                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            {formatDate(post.scheduledAt)}
                                        </p>
                                    </div>

                                    {/* Status + Publish */}
                                    <div className="flex flex-wrap gap-2">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${post.status === true
                                                ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                                                : post.status === false
                                                    ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                                                }`}
                                        >
                                            {getStatusText(post.status)}
                                        </span>

                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${post.publish === true
                                                ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                                                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                                                }`}
                                        >
                                            {getPublishText(post.publish)}
                                        </span>
                                    </div>

                                    {/* Dates */}
                                    <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
                                        <div>
                                            <p className="mb-1 font-medium text-gray-500 dark:text-gray-400">
                                                Created At
                                            </p>

                                            <p className="text-gray-600 dark:text-gray-400">
                                                {formatDate(post.createAt)}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="mb-1 font-medium text-gray-500 dark:text-gray-400">
                                                Updated At
                                            </p>

                                            <p className="text-gray-600 dark:text-gray-400">
                                                {formatDate(post.updateAt)}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* ================= DESKTOP ================= */}
                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full min-w-[1000px] text-left text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-950">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                            Container ID
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                            Instagram User ID
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                            Schedule
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                            Publish
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                            Created At
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                            Updated At
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                    {data.map((post) => (
                                        <tr
                                            key={post.containerId}
                                            className="transition hover:bg-gray-50 dark:hover:bg-gray-950"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="max-w-[220px] truncate font-mono text-xs text-gray-900 dark:text-white">
                                                    {post.containerId}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="font-mono text-xs text-gray-600 dark:text-gray-400">
                                                    {post.instagramUserId}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                                                {formatDate(post.scheduledAt)}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${post.status === true
                                                        ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                                                        : post.status === false
                                                            ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                                                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                                                        }`}
                                                >
                                                    {getStatusText(post.status)}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${post.publish === true
                                                        ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                                                        : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                                                        }`}
                                                >
                                                    {getPublishText(post.publish)}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                {formatDate(post.createAt)}
                                            </td>

                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                {formatDate(post.updateAt)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </section>
        </div>


    )
}
