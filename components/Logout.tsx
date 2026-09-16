import { useClerk, useUser } from '@clerk/nextjs'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Logout() {
  const [open, setOpen] = useState(false)
  const {signOut} = useClerk()
  const { user } = useUser()

  const handleLogout = async () => {
    if (!user) return
    try {

      signOut({
        redirectUrl: "/signin"
      })
      alert("berhasil logout")

    } catch {
      alert("jaringan anda rusakk hehe")
    }
  }
  const isOpen = () => {
    setOpen(!open)
  }




  return (
    <div className="flex min-h-screen items-center justify-center  px-4">
      {/* Main Content */}
      <div className="flex flex-col items-center gap-6 text-center">


        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Apakah Anda yakin ingin keluar?
          </h1>

          <p className="mt-2 text-sm ">
            Anda akan keluar dari akun Anda.
          </p>
        </div>

        <button
          onClick={() => isOpen()}
          className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-700 active:scale-95"
        >
          Keluar
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 backdrop-blur-3xl">
          <div className="w-[50%] h-[50%]  rounded-2xl border border-white/10 p-6">

            {/* Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
              <span className="text-xl">⚠️</span>
            </div>

            {/* Content */}
            <div className="mt-5 text-center">
              <h2 className="text-xl font-bold text-white">
                Konfirmasi Keluar
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-300">
                Apakah Anda yakin ingin keluar dari akun ini?
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => isOpen()}
                className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
              >
                Batal
              </button>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-95"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
