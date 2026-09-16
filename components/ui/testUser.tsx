"use client";

import { cn } from "@/utils";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
type GmailResult = {
  filename?: string;
  size?: number;
  text?: string;
  pythonResult?: Record<string, unknown>;
  error?: string;
};
export default function Test() {
  const [data, setData] = useState<GmailResult | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    getToken,
    isLoaded,
    isSignedIn,
  } = useAuth();


  useEffect(() => {
      const getGmailMessages = async () => {
    if (!isLoaded || !isSignedIn) return;

    try {
      setLoading(true);
      setData(null);


      const clerkToken = await getToken();

      if (!clerkToken) {
        throw new Error("Clerk token tidak tersedia");
      }

      // Request ke NestJS
      const response = await fetch(
        "http://localhost:3002/gmail/attachment",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${clerkToken}`,
          },
        }
      );

      console.log("Status:", response.status);
      console.log(
        "Content-Type:",
        response.headers.get("content-type")
      );

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
          `Request gagal: ${response.status} ${errorText}`
        );
      }

      const result: GmailResult =
        await response.json();

      console.log("Gmail result:", result);

      setData(result);
    } catch (error) {
      console.error("Gmail error:", error);

      setData({
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };
getGmailMessages()
  },[])

  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center p-6"
      )}
    >
      <div className="w-full max-w-3xl">
        <h1 className="mb-4 text-xl font-bold">
        AI Resume Analyzer
        </h1>
<button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-300"> Klik Saya </button>
        {/* <button
          className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"

          disabled={
            !isLoaded ||
            !isSignedIn ||
            loading
          }
        >
          {loading
            ? "Processing..."
            : "Process"}
        </button> */}

        {data && (
          <div className="mt-6 space-y-4">
            {/* Error */}
            {data.error && (
              <div className="rounded border border-red-300 bg-red-50 p-4 text-red-700">
                {data.error}
              </div>
            )}

            {/* Filename */}
            {data.filename && (
              <div className="rounded border p-4">
                <p className="text-sm te">
                  Filename
                </p>

                <p className="font-medium">
                  {data.filename}
                </p>
              </div>
            )}

            {/* Size */}
            {/* {data.size && (
              <div className="rounded border p-4">
                <p className="text-sm te">
                  File Size
                </p>

                <p className="font-medium">
                  {data.size.toLocaleString()} bytes
                </p>
              </div>
            )} */}

     

            {/* Python Result */}
            {data.pythonResult && (
              <div className="mt-6 rounded-2xl border p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">
                      Resume Classification
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      AI analysis result
                    </p>
                  </div>

                  <div className="rounded-full border px-3 py-1 text-xs font-medium">
                    AI Result
                  </div>
                </div>

                {/* Main Result */}
                <div className="border-b pb-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Predicted Category
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-3xl font-bold tracking-tight">
                      {String(data.pythonResult.category ?? "-")}
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  {/* Score */}
                  <div className="py-5 sm:px-5 sm:pl-0">
                    <p className="text-xs text-gray-500">
                      Score
                    </p>

                    <p className="mt-1 text-2xl font-semibold">
                      {typeof data.pythonResult.score === "number"
                        ? `${(data.pythonResult.score * 100).toFixed(1)}%`
                        : "-"}
                    </p>

                    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-black"
                        style={{
                          width: `${typeof data.pythonResult.score === "number"
                              ? data.pythonResult.score * 100
                              : 0
                            }%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Confidence */}
                  <div className="py-5 sm:px-5">
                    <p className="text-xs text-gray-500">
                      Confidence
                    </p>

                    <p className="mt-1 text-2xl font-semibold">
                      {typeof data.pythonResult.confidence === "number"
                        ? `${(
                          data.pythonResult.confidence * 100
                        ).toFixed(1)}%`
                        : "-"}
                    </p>

                    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-black"
                        style={{
                          width: `${typeof data.pythonResult.confidence ===
                              "number"
                              ? data.pythonResult.confidence * 100
                              : 0
                            }%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Consistency */}
                  <div className="py-5 sm:px-5 sm:pr-0">
                    <p className="text-xs text-gray-500">
                      Consistency
                    </p>

                    <p className="mt-1 text-2xl font-semibold">
                      {typeof data.pythonResult.consistency === "number"
                        ? `${(
                          data.pythonResult.consistency * 100
                        ).toFixed(1)}%`
                        : "-"}
                    </p>

                    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-black"
                        style={{
                          width: `${typeof data.pythonResult.consistency ===
                              "number"
                              ? data.pythonResult.consistency * 100
                              : 0
                            }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Chunks */}
                <div className="mt-2 border-t pt-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        Chunks Processed
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Resume sections analyzed by the model
                      </p>
                    </div>

                    <span className="text-xl font-semibold">
                      {String(
                        data.pythonResult.chunks_processed ?? 0
                      )}
                    </span>
                  </div>
                </div>

                {/* Top Predictions */}
                {Array.isArray(
                  data.pythonResult.top_predictions
                ) && (
                    <div className="mt-6 border-t pt-6">
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold">
                          Top Predictions
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          Most likely categories predicted by the model
                        </p>
                      </div>

                      <div className="divide-y">
                        {data.pythonResult.top_predictions.map(
                          (prediction, index) => {
                            const item =
                              prediction as Record<string, unknown>;

                            const score =
                              typeof item.score === "number"
                                ? item.score
                                : 0;

                            return (
                              <div
                                key={index}
                                className="flex items-center gap-4 py-4"
                              >
                                {/* Number */}
                                <span className="w-6 text-sm text-gray-400">
                                  {String(index + 1).padStart(2, "0")}
                                </span>

                                {/* Category */}
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                      {String(
                                        item.category ?? "-"
                                      )}
                                    </span>

                                    <span className="text-sm font-semibold">
                                      {(score * 100).toFixed(1)}%
                                    </span>
                                  </div>

                                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-200">
                                    <div
                                      className="h-full rounded-full bg-black"
                                      style={{
                                        width: `${score * 100}%`,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}
              </div>
            )}   
                   {/* Extracted Text */}
            {data.text && (
              <div className="rounded border p-4">
                <p className="mb-2 text-sm font-semibold">
                  Resume
                </p>

                <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded  p-4 text-sm">
                  {data.text}
                </pre>
              </div>
            )}
            
            
            
            
            </div>



            
        )}
      </div>
    </div>
  );
}