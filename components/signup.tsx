import { useTabEntry } from '@/store/useTabEntry'
import { AxiosFetch } from '@/utils/axios'
import axios, { Axios, AxiosError, isAxiosError } from 'axios'
import React, { useState } from 'react'
interface usersCreate {
    name: string
    email: string
    password: string
}


export default function SingUp() {
    const { setActiveTab } = useTabEntry()
    const [loading, setLoading] = useState(false)
    const baseURl = process.env.NEXT_PUBLIC_URL_BACKEND
    const [inputField, setInputField] = useState<usersCreate | null>({
        name: "",
        email: "",
        password: ""
    })
    const axios_ = new AxiosFetch(String(baseURl))


    const handleRegister = async () => {
        const data = {
            name: inputField?.name,
            email: inputField?.email,
            password: inputField?.password
        }
        setLoading(true)
        try {
            const res = await axios_.POST(data)
            return res
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response) {
                    console.log("baca dulu kak", error.response.data)
                    console.log("erorr status :", error.response.status)
                } else if (error.request) {
                    console.log("server merespon cuman ada yang salah di data", error.request)
                } else {
                    console.log(error.message)
                }
            }
        } finally {
            setLoading(false)
        }
    }

    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setInputField((prevState) => {

            if (!prevState) return { name: "", email: "", password: "", [name]: value };


            return {
                ...prevState,
                [name]: value
            };
        })

    }


    return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-6">
  <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl p-8">

    <div className="flex flex-col items-center mb-8">
      <div className="glass rounded-2xl px-5 py-3">
        <h1 className="text-2xl font-bold text-white">
          ForgetzStudio
        </h1>
      </div>

      <p className="text-slate-400 mt-3 text-center">
        Create your account to continue
      </p>
    </div>

    <div className="space-y-4">

      <input
        value={inputField?.email || ""}
        name="email"
        onChange={onchange}
        type="email"
        placeholder="Email Address"
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
      />

      <input
        value={inputField?.name || ""}
        name="name"
        onChange={onchange}
        type="text"
        placeholder="Full Name"
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
      />

      <input
        value={inputField?.password || ""}
        name="password"
        onChange={onchange}
        type="password"
        placeholder="Password"
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
      />

      <button
        onClick={handleRegister}
        disabled={loading}
        className="mt-3 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

    </div>

    <div className="mt-8 border-t border-white/10 pt-6 text-center text-slate-400">
      Already have an account?
      <button
        onClick={() => setActiveTab("login")}
        className="ml-2 font-semibold text-cyan-400 hover:text-cyan-300"
      >
        Login
      </button>
    </div>

  </div>
</div>
    )
}
