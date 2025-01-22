"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Signup failed. Please try again.");
        return;
      }

      const data = await response.json();
      setSuccess("Signup successful! You can now log in.");
      console.log("Signup successful:", data);
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Error during signup:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-stone-50 sm:px-6 lg:px-8 background">
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-lg border border-stone-300 p-4 sm:p-6">
            <CardHeader>
              <CardTitle className="text-stone-800 text-center text-2xl font-bold sm:text-3xl">
                Create an Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup} className="space-y-6">
                <m.div
                  className="space-y-2"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Label htmlFor="name" className="text-stone-600 text-sm sm:text-base">
                    Name <m.span initial={{ rotate: 360 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>👤</m.span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-md border-stone-300 focus:ring-2 focus:ring-stone-400"
                  />
                </m.div>
                <m.div
                  className="space-y-2"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Label htmlFor="email" className="text-stone-600 text-sm sm:text-base">
                    Email <m.span initial={{ rotate: 360 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>📧</m.span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-md border-stone-300 focus:ring-2 focus:ring-stone-400"
                  />
                </m.div>
                <m.div
                  className="space-y-2"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Label htmlFor="password" className="text-stone-600 text-sm sm:text-base">
                    Password <m.span initial={{ rotate: 360 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>🔒</m.span>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-md border-stone-300 focus:ring-2 focus:ring-stone-400"
                  />
                </m.div>
                <m.div
                  className="space-y-2"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Label htmlFor="confirm-password" className="text-stone-600 text-sm sm:text-base">
                    Confirm Password <m.span initial={{ rotate: 360 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>🔒</m.span>
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-md border-stone-300 focus:ring-2 focus:ring-stone-400"
                  />
                </m.div>
                {error && (
                  <m.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-red-600 text-sm"
                  >
                    {error}
                  </m.p>
                )}
                {success && (
                  <m.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-green-600 text-sm"
                  >
                    {success}
                  </m.p>
                )}
                <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    className="w-full bg-stone-600 text-white hover:bg-stone-700 rounded-md py-2"
                  >
                    Sign Up
                  </Button>
                </m.div>
              </form>
            </CardContent>
            <CardFooter className="mt-4">
              <p className="text-center text-sm text-stone-600">
                Already have an account?{" "}
                <m.a href="/login" className="text-stone-700 hover:underline" whileHover={{ color: "#6b7280" }}>
                  Log in
                </m.a>
              </p>
            </CardFooter>
          </Card>
        </m.div>
      </LazyMotion>
    </div>
  );
}

//.....................................................................................................

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { LazyMotion, domAnimation, m } from "framer-motion";

// export default function SignupPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors
//     setSuccess(""); // Clear previous success messages

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8080/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setError(errorData.message || "Signup failed. Please try again.");
//         return;
//       }

//       const data = await response.json();
//       setSuccess("Signup successful! You can now log in.");
//       console.log("Signup successful:", data);
//     } catch (err) {
//       setError("An error occurred. Please try again later.");
//       console.error("Error during signup:", err);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center px-4 bg-stone-50 sm:px-6 lg:px-8">
//       <LazyMotion features={domAnimation}>
//         <m.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-md"
//         >
//           <Card className="shadow-lg border border-stone-300 p-4 sm:p-6">
//             <CardHeader>
//               <CardTitle className="text-stone-800 text-center text-2xl font-bold sm:text-3xl">
//                 Create an Account
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSignup} className="space-y-6">
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="name"
//                     className="text-stone-600 text-sm sm:text-base"
//                   >
//                     Name
//                   </Label>
//                   <Input
//                     id="name"
//                     type="text"
//                     placeholder="Enter your name"
//                     required
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="rounded-md border-stone-300 focus:ring-2 focus:ring-stone-400"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="email"
//                     className="text-stone-600 text-sm sm:text-base"
//                   >
//                     Email
//                   </Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="rounded-md border-stone-300 focus:ring-2 focus:ring-stone-400"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="password"
//                     className="text-stone-600 text-sm sm:text-base"
//                   >
//                     Password
//                   </Label>
//                   <Input
//                     id="password"
//                     type="password"
//                     placeholder="Create a password"
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="rounded-md border-stone-300 focus:ring-2 focus:ring-stone-400"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="confirm-password"
//                     className="text-stone-600 text-sm sm:text-base"
//                   >
//                     Confirm Password
//                   </Label>
//                   <Input
//                     id="confirm-password"
//                     type="password"
//                     placeholder="Confirm your password"
//                     required
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className="rounded-md border-stone-300 focus:ring-2 focus:ring-stone-400"
//                   />
//                 </div>
//                 {error && (
//                   <m.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                     className="text-red-600 text-sm"
//                   >
//                     {error}
//                   </m.p>
//                 )}
//                 {success && (
//                   <m.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                     className="text-green-600 text-sm"
//                   >
//                     {success}
//                   </m.p>
//                 )}
//                 <Button
//                   type="submit"
//                   className="w-full bg-stone-600 text-white hover:bg-stone-700 rounded-md py-2"
//                 >
//                   Sign Up
//                 </Button>
//               </form>
//             </CardContent>
//             <CardFooter className="mt-4">
//               <p className="text-center text-sm text-stone-600">
//                 Already have an account?{" "}
//                 <a href="/login" className="text-stone-700 hover:underline">
//                   Log in
//                 </a>
//               </p>
//             </CardFooter>
//           </Card>
//         </m.div>
//       </LazyMotion>
//     </div>
//   );
// }

