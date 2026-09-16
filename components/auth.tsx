// "use client";

// import React, { useState } from "react";
// import "./css/auth.css";

// import { useRouter } from "next/navigation";
// import { useSignIn, useSignUp } from "@clerk/nextjs";

// export default function AuthForm() {
//   const [isActive, setIsActive] = useState(false);

//   const { signUp } = useSignUp();
//   const { signIn } = useSignIn();

//   const router = useRouter();

//   const [auths, setAuths] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const { name, value } = event.target;

//     setAuths((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

// const handleRegister = async () => {
//   const { email, password } = auths;

//   try {
//     const response = await signUp.create({
//       emailAddress: email,
//       password: password,
//     });

//     console.log("SIGN UP:", response);

//     await signUp.verifications.sendEmailCode();

//     console.log("Verification code sent");

//     // tampilkan UI OTP
//   } catch (error: any) {
//     console.error("REGISTER ERROR:", error);
//     console.error("CLERK ERRORS:", error?.errors);
//   }
// };
//   const handleLogin = async () => {
//     const { email, password } = auths;

//     try {
//       console.log("LOGIN:", email, password);

//       alert("Login berhasil");

//       // router.replace("/");
//     } catch (error: any) {
//       console.error("LOGIN ERROR:", error);
//     }
//   };

//   return (
//     <div className={`container ${isActive ? "active" : ""}`}>

//       {/* Login */}
//       <div className="form-box login">
//         <form
//           onSubmit={(event) => {
//             event.preventDefault();
//             handleLogin();
//           }}
//         >
//           <h1>Login</h1>

//           <div className="input-box">
//             <input
//               name="email"
//               value={auths.email}
//               type="email"
//               onChange={handleChange}
//               placeholder="Email"
//               required
//             />

//             <i className="bx bxs-user" />
//           </div>

//           <div className="input-box">
//             <input
//               name="password"
//               value={auths.password}
//               type="password"
//               onChange={handleChange}
//               placeholder="Password"
//               required
//             />

//             <i className="bx bxs-lock-alt" />
//           </div>

//           <div className="forgot-link">
//             <a href="#">Forgot Password?</a>
//           </div>

//           <button
//             type="submit"
//             className="btn"
//           >
//             Login
//           </button>

//           <p>or login with social platforms</p>

//           <div className="social-icons">
//             <a href="#">
//               <i className="bx bxl-google" />
//             </a>

//             <a href="#">
//               <i className="bx bxl-facebook" />
//             </a>

//             <a href="#">
//               <i className="bx bxl-github" />
//             </a>

//             <a href="#">
//               <i className="bx bxl-linkedin" />
//             </a>
//           </div>
//         </form>
//       </div>

//       {/* Register */}
//    <div className="form-box register">
//   <form
//     onSubmit={(event) => {
//       event.preventDefault();
//       handleRegister();
//     }}
//   >
//     <h1>Registration</h1>

//     <div className="input-box">
//       <input
//         name="email"
//         value={auths.email}
//         onChange={handleChange}
//         type="email"
//         placeholder="Email"
//         required
//       />

//       <i className="bx bxs-envelope" />
//     </div>

//     <div className="input-box">
//       <input
//         name="password"
//         value={auths.password}
//         onChange={handleChange}
//         type="password"
//         placeholder="Password"
//         required
//       />

//       <i className="bx bxs-lock-alt" />
//     </div>

//     {/* Clerk CAPTCHA */}
//     <div id="clerk-captcha" />

//     <button
//       type="submit"
//       className="btn"
//     >
//       Register
//     </button>

//     <p>or register with social platforms</p>

//     <div className="social-icons">
//       <a href="#">
//         <i className="bx bxl-google" />
//       </a>

//       <a href="#">
//         <i className="bx bxl-facebook" />
//       </a>

//       <a href="#">
//         <i className="bx bxl-github" />
//       </a>

//       <a href="#">
//         <i className="bx bxl-linkedin" />
//       </a>
//     </div>
//   </form>
// </div>
//       {/* Toggle */}
//       <div className="toggle-box">

//         <div className="toggle-panel toggle-left">
//           <h1>Hello, Welcome!</h1>

//           <p>Don't have an account?</p>

//           <button
//             type="button"
//             className="btn register-btn"
//             onClick={() => setIsActive(true)}
//           >
//             Register
//           </button>
//         </div>

//         <div className="toggle-panel toggle-right">
//           <h1>Welcome Back!</h1>

//           <p>Already have an account?</p>

//           <button
//             type="button"
//             className="btn login-btn"
//             onClick={() => setIsActive(false)}
//           >
//             Login
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }