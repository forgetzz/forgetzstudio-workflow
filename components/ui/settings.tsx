
import React from "react";

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-[#0b0b0d] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            Configuration
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Global Settings
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Manage your AI provider, model configuration, API keys, and
            knowledge base settings.
          </p>
        </div>

        <div className="space-y-6">
          {/* AI Provider */}
          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111114]">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                AI Provider
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Configure the provider and model used by your AI Agent.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Provider */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Provider
                </label>

                <select
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/30 dark:focus:ring-white/10"
                  defaultValue="openrouter"
                >
                  <option value="openrouter">OpenRouter</option>
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="google">Google Gemini</option>
                </select>
              </div>

              {/* Model */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Model
                </label>

                <input
                  type="text"
                  defaultValue="llama-3.3-70b-instruct"
                  placeholder="Enter model name"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-white/30 dark:focus:ring-white/10"
                />
              </div>

              {/* API Key */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  API Key
                </label>

                <div className="flex gap-2">
                  <input
                    type="password"
                    defaultValue="sk-or-v1-example-key"
                    placeholder="Enter API key"
                    className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-white/30 dark:focus:ring-white/10"
                  />

                  <button className="rounded-xl border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10">
                    Test
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Your API key should be stored securely and never exposed to
                  the client.
                </p>
              </div>
            </div>
          </section>

          {/* Model Parameters */}
          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111114]">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Model Parameters
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Control how the AI generates responses.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Temperature */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Temperature
                  </label>

                  <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-white/10 dark:text-gray-300">
                    0.7
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  defaultValue="0.7"
                  className="w-full accent-black dark:accent-white"
                />

                <div className="mt-2 flex justify-between text-xs text-gray-400">
                  <span>Precise</span>
                  <span>Balanced</span>
                  <span>Creative</span>
                </div>
              </div>

              {/* Max Tokens */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Max Output Tokens
                </label>

                <input
                  type="number"
                  defaultValue="2048"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/30"
                />
              </div>

              {/* Top P */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Top P
                </label>

                <input
                  type="number"
                  defaultValue="1"
                  min="0"
                  max="1"
                  step="0.1"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/30"
                />
              </div>

              {/* Frequency Penalty */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Frequency Penalty
                </label>

                <input
                  type="number"
                  defaultValue="0"
                  min="-2"
                  max="2"
                  step="0.1"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/30"
                />
              </div>
            </div>
          </section>

          {/* Qdrant */}
          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111114]">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Knowledge Base
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Configure Qdrant and embedding settings for your RAG system.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Qdrant URL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Qdrant URL
                </label>

                <input
                  type="url"
                  placeholder="https://your-cluster.qdrant.io"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-white/30"
                />
              </div>

              {/* Qdrant API Key */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Qdrant API Key
                </label>

                <input
                  type="password"
                  placeholder="Enter Qdrant API key"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-white/30"
                />
              </div>

              {/* Collection */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Collection Name
                </label>

                <input
                  type="text"
                  defaultValue="knowledge_base"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/30"
                />
              </div>

              {/* Similarity */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Similarity Threshold
                </label>

                <input
                  type="number"
                  defaultValue="0.5"
                  min="0"
                  max="1"
                  step="0.05"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/30"
                />
              </div>
            </div>
          </section>

          {/* System Prompt */}
          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111114]">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                System Prompt
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Define the global behavior of your AI Agent.
              </p>
            </div>

            <textarea
              rows={7}
              defaultValue={`You are a helpful AI assistant.

Use the available knowledge base when answering questions.
Do not invent information that is not available in the knowledge base.
If the information is unavailable, clearly state that you do not know.`}
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:focus:border-white/30"
            />
          </section>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pb-10">
            <button className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10">
              Reset
            </button>

            <button className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

