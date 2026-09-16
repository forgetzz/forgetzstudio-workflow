
"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import {
  FileImage,
  FileText,
  UploadCloud,
} from "lucide-react";
import React, { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const { getToken } = useAuth()
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setUploadedUrl(null);
  };
  const uploadFile = async () => {

    if (!file) return;

    try {

      setUploading(true);


      if (file.type === "application/pdf") {

        const arrayBuffer = await file.arrayBuffer();

        const pdfjsLib = await import("pdfjs-dist");

        pdfjsLib.GlobalWorkerOptions.workerSrc =
          new URL(
            "pdfjs-dist/build/pdf.worker.min.mjs",
            import.meta.url,
          ).toString();

        const pdf = await pdfjsLib.getDocument({
          data: arrayBuffer,
        }).promise;

        let text = "";

        for (
          let pageNumber = 1;
          pageNumber <= pdf.numPages;
          pageNumber++
        ) {

          const page =
            await pdf.getPage(pageNumber);

          const textContent =
            await page.getTextContent();

          const pageText =
            textContent.items
              .map((item: any) => item.str)
              .join(" ");

          text += pageText + "\n\n";
        }


        const res = await axios.post(
          `${BASE_URL}/graph/doc`,
          {
            doc: text,
          },
        );

        console.log(res.data);

        alert("Success upload document");

        return;
      }


      const response = await fetch(
        "/api/storage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          "Gagal mendapatkan presigned URL",
        );
      }

      const data = await response.json();



      const uploadResponse = await fetch(
        data.uploadUrl,
        {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        },
      );

      if (!uploadResponse.ok) {
        throw new Error(
          "Gagal upload file ke R2",
        );
      }




      const token = await getToken();

      if (!token) {
        throw new Error(
          "User belum terautentikasi",
        );
      }



const saveResponse = await fetch(
    `${BASE_URL}/instagram/saveVidUrl`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            videoUrl: data.videoUrl,
        }),
    },
);

      if (!saveResponse.ok) {
        throw new Error(
          "Gagal menyimpan video ke backend",
        );
      }

      const savedVideo =
        await saveResponse.json();

      console.log(
        "Video berhasil disimpan:",
        savedVideo,
      );




      setUploadedUrl(data.videoUrl);

      console.log(
        "Upload berhasil",
      );

      console.log(
        "R2 URL:",
        data.videoUrl,
      );

      console.log(
        "R2 Key:",
        data.key,
      );

      alert("Success upload file");

    } catch (error) {

      console.error(
        "Upload error:",
        error,
      );

      alert("Gagal upload file");

    } finally {

      setUploading(false);

    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-3xl">



        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            Upload Documents
          </h1>

          <p className="mt-2 text-slate-400">
            Upload PDF documents or videos.
          </p>
        </div>

        {/* Upload Area */}

        <div className="overflow-hidden">
          <div className="p-2">

            {!file ? (
              <label
                htmlFor="upload"
                className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-400/40 py-20 transition-all duration-300 hover:border-blue-400 hover:bg-blue-500/10"
              >
                <div className="rounded-full p-5 transition group-hover:scale-110">
                  <UploadCloud
                    size={42}
                    className="text-blue-300"
                  />
                </div>

                <h2 className="mt-6 text-2xl font-semibold text-white">
                  Drag & Drop File
                </h2>

                <p className="mt-2 text-slate-400">
                  or click to browse from your device
                </p>

                <input
                  id="upload"
                  type="file"
                  accept="application/pdf,video/*"
                  className="hidden"
                  onChange={onChange}
                />
              </label>
            ) : (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="rounded-xl bg-red-500/20 p-3">
                      {file.type === "application/pdf" ? (
                        <FileText
                          size={36}
                          className="text-red-400"
                        />
                      ) : (
                        <FileImage
                          size={36}
                          className="text-cyan-400"
                        />
                      )}
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {file.name}
                      </h2>

                      <p className="mt-1 text-sm text-slate-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>

                      <p className="mt-2 text-sm font-medium text-emerald-400">
                        ✓ Ready to upload
                      </p>
                    </div>

                  </div>

                  <button
                    onClick={() => {
                      setFile(null);
                      setUploadedUrl(null);
                    }}
                    className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500 hover:text-white"
                  >
                    Remove
                  </button>

                </div>

              </div>
            )}

            {/* Uploaded URL */}

            {uploadedUrl && (
              <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <p className="text-sm text-emerald-300">
                  Upload berhasil
                </p>

                <p className="mt-1 break-all text-sm text-slate-300">
                  {uploadedUrl}
                </p>
              </div>
            )}

            {/* Supported Files */}

            <div className="mt-8 grid gap-5 md:grid-cols-2">

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">

                <div className="rounded-xl bg-red-500/20 p-3">
                  <FileText className="text-red-400" />
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    PDF Documents
                  </h3>

                  <p className="text-sm text-slate-400">
                    Reports, books, manuals, invoices.
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">

                <div className="rounded-xl bg-cyan-500/20 p-3">
                  <FileImage className="text-cyan-400" />
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Videos
                  </h3>

                  <p className="text-sm text-slate-400">
                    Upload videos 
                  </p>
                </div>

              </div>

            </div>

            {/* Footer */}

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">

              <span className="text-sm text-slate-500">
                Maximum file size:
                <span className="text-blue-300">
                  {" "}20 MB
                </span>
              </span>

              <button
                onClick={uploadFile}
                disabled={!file || uploading}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-medium text-white transition enabled:hover:scale-105 enabled:hover:shadow-lg enabled:hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploading
                  ? "Uploading..."
                  : "Upload File"}
              </button>

            </div>

          </div>
        </div>

      </div>
    </main>
  );
}

