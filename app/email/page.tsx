"use client"

import { idTypes, Messages } from "@/types"
import axios from "axios"
import { useAuth, useUser } from "@clerk/nextjs"
import React, { useEffect, useState } from "react"

const urlApi = process.env.NEXT_PUBLIC_BASE_URL

export default function Page() {
  const [messages, setMessages] = useState<Messages[]>([])
  const { user } = useUser()
  const { getToken } = useAuth()
  const [data, setDatas] = useState<idTypes[]>([])
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [loadingList, setLoadingList] = useState(false)
  const getList = async () => {
    if (!user) return

    const token = await getToken()
    if (!token) return

    try {
      setLoadingList(true)

      const res = await axios.get(`${urlApi}/gmail/messages`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const finalRes = res.data

      if (!finalRes) {
        setDatas([])
        return
      }

      setDatas(finalRes)

      console.log("Message IDs:", finalRes)
    } catch (error) {
      console.error("get list error:", error)
    } finally {
      setLoadingList(false)
    }
  }
  const getMessages = async () => {
    if (!user) return

    const token = await getToken()
    if (!token) return

    if (!data.length) return

    try {
      setLoading(true)

      const result = await Promise.all(
        data.map(async (item) => {
          const response = await axios.get(
            `${urlApi}/gmail/messages/${item.id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            },
          )

          return response.data
        }),
      )

      setMessages(result)

      console.log(
        "Messages:",
        result.map((item) => item.id),
      )
    } catch (error) {
      console.error("get messages error:", error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!user) return

    getList()
  }, [user])

  useEffect(() => {
    if (!data.length) return

    getMessages()
  }, [data])
  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
                Gmail
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-gray-950">
              Messages
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Your latest email messages
            </p>
          </div>

          {/* <button
            onClick={getMessages}
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-gray-900
              bg-gray-900
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-black
              hover:shadow-lg
              active:translate-y-0
              sm:w-auto
            "
          >
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h5"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 20v-5h-5"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.5 15a8 8 0 0 0 13-9"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.5 9a8 8 0 0 0-13 9"
              />
            </svg>

            Fetch Messages
          </button> */}
        </div>

        {/* Message List */}
        <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white/70 shadow-sm backdrop-blur-sm">

          {/* List Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Inbox
              </p>

              <p className="text-xs text-gray-400">
                {messages.length} messages
              </p>
            </div>

            <div className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500">
              {messages.length > 0 ? "Loaded" : "Empty"}
            </div>
          </div>

          {messages.length > 0 ? (
            <div>
              {messages.map((message: any, index: number) => (
                <div
                  key={message.id ?? index}
                  onClick={() => setSelectedMessage(message)}
                  className="
                    group
                    cursor-pointer
                    border-b
                    border-gray-100
                    px-5
                    py-5
                    transition-all
                    duration-200
                    last:border-b-0
                    hover:bg-gray-50/70
                    sm:px-6
                  "
                >
                  <div className="flex items-start gap-4">

                    {/* Avatar */}
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-gray-100
                        text-sm
                        font-semibold
                        text-gray-700
                        ring-4
                        ring-white
                        transition-all
                        duration-200
                        group-hover:bg-gray-900
                        group-hover:text-white
                      "
                    >
                      {message.from?.charAt(0)?.toUpperCase() || "?"}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <h2 className="truncate text-sm font-semibold text-gray-900">
                          {message.from || "Unknown sender"}
                        </h2>

                        <span className="shrink-0 text-xs text-gray-400">
                          {message.date}
                        </span>
                      </div>

                      <h3 className="mt-1 truncate text-sm font-medium text-gray-800 transition-colors group-hover:text-gray-950">
                        {message.subject || "(No Subject)"}
                      </h3>

                      <p className="mt-1 truncate text-xs text-gray-400">
                        To: {message.to || "-"}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden shrink-0 items-center self-center sm:flex">
                      <svg
                        className="
                          h-4
                          w-4
                          text-gray-300
                          transition-all
                          duration-200
                          group-hover:translate-x-1
                          group-hover:text-gray-600
                        "
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9 18 6-6-6-6"
                        />
                      </svg>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
                <svg
                  className="h-6 w-6 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.5 12 13l9-5.5"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                  />
                </svg>
              </div>

              <h2 className="text-sm font-semibold text-gray-900">
                No messages
              </h2>

              <p className="mt-1 max-w-xs text-sm leading-6 text-gray-400">
                Fetch your Gmail messages to see them here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedMessage && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            p-4
            backdrop-blur-md
          "
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="
              w-full
              max-w-2xl
              overflow-hidden
              rounded-2xl
              border
              border-gray-200
              bg-white
              shadow-2xl
              animate-in
              fade-in
              zoom-in-95
              duration-200
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">

              <div className="min-w-0 pr-4">
                <div className="mb-2 text-xs font-medium uppercase tracking-widest text-gray-400">
                  Email
                </div>

                <h2 className="truncate text-lg font-semibold tracking-tight text-gray-950">
                  {selectedMessage.subject || "(No Subject)"}
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  {selectedMessage.date}
                </p>
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                  text-gray-400
                  transition
                  hover:border-gray-300
                  hover:bg-gray-50
                  hover:text-gray-900
                "
              >
                ✕
              </button>
            </div>

            {/* Sender */}
            <div className="border-b border-gray-100 px-6 py-5">
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                  {selectedMessage.from?.charAt(0)?.toUpperCase() || "?"}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {selectedMessage.from}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-gray-400">
                    To: {selectedMessage.to || "-"}
                  </p>
                </div>

              </div>
            </div>

            {/* Body */}
            <div className="max-h-[60vh] overflow-y-auto px-6 py-6">
              <div className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-700">
                {selectedMessage.body || "Email body is empty."}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-gray-100 px-6 py-4">
              <button
                onClick={() => setSelectedMessage(null)}
                className="
                  rounded-xl
                  bg-gray-900
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-black
                  hover:shadow-md
                  active:translate-y-0
                "
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}