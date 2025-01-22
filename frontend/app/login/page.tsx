"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Import Framer Motion
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Validate the token on page load
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      validateToken(jwtToken);
    }

    // Animated Background
    const intervalId = setInterval(() => {
      const backgroundElement = document.querySelector(".background");
      if (backgroundElement) {
        (backgroundElement as HTMLElement).style.backgroundPosition = "200% 0%";
      }
      setTimeout(() => {
        const backgroundElement = document.querySelector(".background");
        if (backgroundElement) {
          (backgroundElement as HTMLElement).style.backgroundPosition = "0% 0%";
        }
      }, 2000);
    }, 4000);

    return () => clearInterval(intervalId);

  }, []);

  const validateToken = async (token: string) => {
    try {
      const response = await fetch(
        "http://localhost:8080/auth/validate-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        localStorage.removeItem("jwtToken");
        router.push("/login");
      } else {
        router.push("/homepage");
      }
    } catch (err) {
      console.error("Error validating token:", err);
      localStorage.removeItem("jwtToken");
      router.push("/login");
    }
  };

  const signupCall = () => {
    router.push("/signup");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please try again.");
        return;
      }

      const data = await response.json();
      const { jwtToken } = data;

      if (jwtToken) {
        // Store JWT token in localStorage
        localStorage.setItem("jwtToken", jwtToken);
        console.log("Login successful:", data);

        // Redirect to the home
        router.push("/homepage");
      } else {
        setError("Login failed. Token not received.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Error during login:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-stone-50 sm:px-6 lg:px-8 background">
      {/* Add animation to the card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md shadow-lg border border-stone-300 p-4 sm:p-6">
          <CardHeader>
            <CardTitle className="text-stone-800 text-center text-2xl font-bold sm:text-3xl">
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div className="space-y-2" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <Label
                  htmlFor="email"
                  className="text-stone-600 text-sm sm:text-base"
                >
                  Email <motion.span initial={{ rotate: 360 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>📧</motion.span>
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
              </motion.div>
              <motion.div className="space-y-2" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <Label
                  htmlFor="password"
                  className="text-stone-600 text-sm sm:text-base"
                >
                  Password <motion.span initial={{ rotate: 360 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>🔒</motion.span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-md border-stone-300 focus:ring-2 focus:ring-stone-400"
                />
              </motion.div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="w-full bg-stone-600 text-white hover:bg-stone-700 rounded-md py-2"
                >
                  Log In
                </Button>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter className="mt-4">
            <p className="text-center text-sm text-stone-600">
              Don't have an account?{" "}
              <motion.a
                onClick={signupCall}
                className="cursor-pointer text-stone-700 hover:underline"
                whileHover={{ color: "#6b7280" }}
              >
                Sign up
              </motion.a>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}


//.......................................................................................................

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion"; // Import Framer Motion
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

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   // Validate the token on page load
//   useEffect(() => {
//     const jwtToken = localStorage.getItem("jwtToken");
//     if (jwtToken) {
//       validateToken(jwtToken);
//     }
//   }, []);

//   const validateToken = async (token: string) => {
//     try {
//       const response = await fetch(
//         "http://localhost:8080/auth/validate-token",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         localStorage.removeItem("jwtToken");
//         router.push("/login");
//       } else {
//         router.push("/homepage");
//       }
//     } catch (err) {
//       console.error("Error validating token:", err);
//       localStorage.removeItem("jwtToken");
//       router.push("/login");
//     }
//   };

//   const signupCall = () => {
//     router.push("/signup");
//   };

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors

//     try {
//       const response = await fetch("http://localhost:8080/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setError(errorData.message || "Login failed. Please try again.");
//         return;
//       }

//       const data = await response.json();
//       const { jwtToken } = data;

//       if (jwtToken) {
//         // Store JWT token in localStorage
//         localStorage.setItem("jwtToken", jwtToken);
//         console.log("Login successful:", data);

//         // Redirect to the home
//         router.push("/homepage");
//       } else {
//         setError("Login failed. Token not received.");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again later.");
//       console.error("Error during login:", err);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center px-4 bg-stone-50 sm:px-6 lg:px-8">
//       {/* Add animation to the card */}
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//       >
//         <Card className="w-full max-w-md shadow-lg border border-stone-300 p-4 sm:p-6">
//           <CardHeader>
//             <CardTitle className="text-stone-800 text-center text-2xl font-bold sm:text-3xl">
//               Welcome Back
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleLogin} className="space-y-6">
//               <div className="space-y-2">
//                 <Label
//                   htmlFor="email"
//                   className="text-stone-600 text-sm sm:text-base"
//                 >
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="rounded-md border-stone-300 focus:ring-2 focus:ring-stone-400"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label
//                   htmlFor="password"
//                   className="text-stone-600 text-sm sm:text-base"
//                 >
//                   Password
//                 </Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="rounded-md border-stone-300 focus:ring-2 focus:ring-stone-400"
//                 />
//               </div>
//               {error && <p className="text-red-600 text-sm">{error}</p>}
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Button
//                   type="submit"
//                   className="w-full bg-stone-600 text-white hover:bg-stone-700 rounded-md py-2"
//                 >
//                   Log In
//                 </Button>
//               </motion.div>
//             </form>
//           </CardContent>
//           <CardFooter className="mt-4">
//             <p className="text-center text-sm text-stone-600">
//               Don't have an account?{" "}
//               <a
//                 onClick={signupCall}
//                 className="cursor-pointer text-stone-700 hover:underline"
//               >
//                 Sign up
//               </a>
//             </p>
//           </CardFooter>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }
