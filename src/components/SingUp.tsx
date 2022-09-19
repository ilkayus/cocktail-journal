export {};
// function SignUp({ setSignUp }) {
//   const [form, setForm] = React.useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [response, setResponse] = React.useState({
//     open: false,
//     success: true,
//     message: null,
//   });

//   const handleChange = (e) => {
//     if (response.open) {
//       setResponse((prev) => ({
//         ...prev,
//         open: false,
//       }));
//     }
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     try {
//       e.preventDefault();
//       const user = JSON.parse(localStorage.getItem("user"));

//       const x1 = user?.email === form.email;
//       const x2 = user?.username === form.username;

//       setForm((prev) => ({
//         ...prev,
//         username: "",
//         email: "",
//         password: "",
//       }));

//       if (x1 || x2) {
//         throw {
//           message: `${x1 ? "Email" : ""} ${x1 && x2 ? "and" : ""} ${
//             x2 ? "Username" : ""
//           } already used`,
//         };
//       }

//       localStorage.setItem("user", JSON.stringify(form));
//       setTimeout(() => setSignUp(false), 1000);

//       setResponse((prev) => ({
//         ...prev,
//         open: true,
//         success: true,
//         message: "Account registered successfully",
//       }));
//     } catch (error) {
//       setResponse((prev) => ({
//         ...prev,
//         open: true,
//         success: false,
//         message: error.message,
//       }));
//     }
//   };

//   return (
//     <div className="w-[450px] sm:bg-white p-5 rounded-lg">
//       <h1 className="text-3xl font-bold text-center">Sign Up 🍺</h1>
//       <form
//         method="post"
//         className="grid gap-2 mt-5"
//         autoCapitalize={false}
//         onSubmit={handleSubmit}
//       >
//         <div className="grid">
//           <button
//             type="button"
//             className="relative w-full flex justify-center items-center gap-5 border border-solid border-zinc-800 rounded-md py-2 px-5 hover:bg-zinc-100"
//           >
//             <span className="absolute h-full flex items-center top-0 left-0 translate-x-5">
//               <box-icon name="google" type="logo"></box-icon>
//             </span>
//             <p className="text-center">Sign in with Google</p>
//           </button>
//           <div className="flex justify-center items-center gap-2 mt-3">
//             <span className="block w-10 h-[1px] bg-gray-800"></span>
//             <p>or</p>
//             <span className="block w-10 h-[1px] bg-gray-800"></span>
//           </div>
//         </div>
//         <label
//           htmlFor="username"
//           className="relative overflow-hidden cursor-text"
//         >
//           <input
//             type="username"
//             name="username"
//             id="username"
//             className={`
//                 peer border border-solid border-transparent valid:border-teal-500 valid:bg-teal-100/50
//                 ${
//                   form.username.length > 0 &&
//                   "invalid:border-rose-500 invalid:bg-rose-100/50"
//                 }
//                 w-full bg-transparent outline-none bg-zinc-100 pl-16 pt-7 pb-2 pr-5 rounded-md
//               `}
//             pattern="^[a-z0-9._]{6,18}$"
//             required
//             value={form.username}
//             onChange={handleChange}
//           />
//           <span className="absolute left-0 top-0 h-full flex items-center translate-x-5">
//             <box-icon name="user"></box-icon>
//           </span>
//           <span
//             className={`
//               peer-focus:translate-y-2 peer-focus:text-xs peer-focus:opacity-60 transition
//               absolute translate-y-5 left-0 top-0 translate-x-16 flex justify-between
//               ${
//                 form.username.length > 0 &&
//                 "translate-y-2 h-auto text-xs opacity-60"
//               }
//               `}
//           >
//             Username
//           </span>
//         </label>
//         <label htmlFor="email" className="relative overflow-hidden cursor-text">
//           <input
//             type="email"
//             name="email"
//             id="email"
//             className={`
//                 peer border border-solid border-transparent valid:border-teal-500 valid:bg-teal-100/50
//                 ${
//                   form.email.length > 0 &&
//                   "invalid:border-rose-500 invalid:bg-rose-100/50"
//                 }
//                 w-full bg-transparent outline-none bg-zinc-100 pl-16 pt-7 pb-2 pr-5 rounded-md
//               `}
//             pattern="^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$"
//             required
//             value={form.email}
//             onChange={handleChange}
//           />
//           <span className="absolute left-0 top-0 h-full flex items-center translate-x-5">
//             <box-icon name="envelope"></box-icon>
//           </span>
//           <span
//             className={`
//               peer-focus:translate-y-2 peer-focus:text-xs peer-focus:opacity-60 transition
//               absolute translate-y-5 left-0 top-0 translate-x-16 flex justify-between
//               ${
//                 form.email.length > 0 &&
//                 "translate-y-2 h-auto text-xs opacity-60"
//               }
//               `}
//           >
//             Email
//           </span>
//         </label>
//         <label
//           htmlFor="password"
//           className="relative overflow-hidden cursor-text"
//         >
//           <input
//             type="password"
//             name="password"
//             id="password"
//             className={`
//                 peer border border-solid border-transparent valid:border-teal-500 valid:bg-teal-100/50
//                 ${
//                   form.password.length > 0 &&
//                   "invalid:border-rose-500 invalid:bg-rose-100/50"
//                 }
//                 w-full bg-transparent outline-none bg-zinc-100 pl-16 pt-7 pb-2 pr-5 rounded-md
//               `}
//             pattern="^[A-Za-z0-9\W]{3,}$"
//             required
//             aria-label="hello"
//             value={form.password}
//             onChange={handleChange}
//           />
//           <span className="absolute left-0 top-0 h-full flex items-center translate-x-5">
//             <box-icon name="lock-open-alt"></box-icon>
//           </span>
//           <span
//             className={`
//               peer-focus:translate-y-2 peer-focus:text-xs peer-focus:opacity-60 transition
//               absolute translate-y-5 left-0 top-0 translate-x-16 flex justify-between
//               ${
//                 form.password.length > 0 &&
//                 "translate-y-2 h-auto text-xs opacity-60"
//               }
//               `}
//           >
//             Password
//           </span>
//         </label>
//         {response.open && (
//           <span
//             className={`py-2 px-5 border-0 border-t-[1px] border-solid ${
//               response.success
//                 ? "bg-teal-100/50 border-teal-500"
//                 : "bg-rose-100/50 border-rose-500"
//             }`}
//           >
//             <p
//               className={`text-xs ${
//                 response.success ? "text-teal-900" : "text-rose-900"
//               }`}
//             >
//               {response.message}
//             </p>
//           </span>
//         )}
//         <button
//           type="submit"
//           className="mt-3 flex justify-between items-center bg-zinc-800 hover:bg-zinc-900 py-4 px-5 rounded-md"
//         >
//           <p className="text-white">Sign Up</p>
//           <box-icon
//             name="right-arrow-alt"
//             type="solid"
//             color="#ffffffee"
//           ></box-icon>
//         </button>
//         <span className="flex justify-center items-center gap-2 mt-5">
//           <p>Already have an account?</p>
//           <button
//             className="underline underline-offset-2"
//             onClick={() => setSignUp(false)}
//           >
//             Sign In
//           </button>
//         </span>
//       </form>
//     </div>
//   );
// }
