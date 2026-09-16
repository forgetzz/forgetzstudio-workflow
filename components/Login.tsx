// "use client";

// import { useState } from "react";
// import { useTabEntry } from "@/store/useTabEntry";
// import { useRouter } from "next/navigation";
// import { SignIn, SignInButton } from "@clerk/nextjs";

// export default function Login() {
//   const { setActiveTab } = useTabEntry();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter()
//   const [loading, setLoading] = useState(false);
  

//   const login = async () => {
//     if (!email || !password) {
//       alert("Email dan password wajib diisi");
//       return;
//     }

//     try {
//       setLoading(true);

//       // await signInWithEmailAndPassword(auth, email, password);

//       alert("Login berhasil");
//       router.replace("/")
//     } catch (err: any) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-950">
//       <div className="glass rounded-3xl p-10 w-[420px] flex flex-col gap-5">

//         <div className="glass rounded-2xl p-3 text-center">
//           <h1 className="text-xl font-bold text-white">
//             ForgetzStudio
//           </h1>
//         </div>

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="glass p-3 rounded-xl outline-none"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="glass p-3 rounded-xl outline-none"
//         />

//         <button
//           onClick={login}
//           disabled={loading}
//           className="glass rounded-xl py-3 transition hover:scale-[1.02] disabled:opacity-60"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <div className="flex justify-center gap-2 text-sm">
//           <p>Don't have an account?</p>

//           <button
//             onClick={() => setActiveTab("singUp")}
//             className="text-cyan-400 hover:underline"
//           >
//             Sign up here
//           </button>
//         </div>




//       </div>
//     </div>
//   );
// }