"use client";

import { useState } from "react";
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
    <div className="flex min-h-screen items-center justify-center px-4 bg-stone-50 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg border border-stone-300 p-4 sm:p-6">
        <CardHeader>
          <CardTitle className="text-stone-800 text-center text-2xl font-bold sm:text-3xl">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-stone-600 text-sm sm:text-base"
              >
                Name
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
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-stone-600 text-sm sm:text-base"
              >
                Email
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
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-stone-600 text-sm sm:text-base"
              >
                Password
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
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="confirm-password"
                className="text-stone-600 text-sm sm:text-base"
              >
                Confirm Password
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
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
            <Button
              type="submit"
              className="w-full bg-stone-600 text-white hover:bg-stone-700 rounded-md py-2"
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="mt-4">
          <p className="text-center text-sm text-stone-600">
            Already have an account?{" "}
            <a href="/login" className="text-stone-700 hover:underline">
              Log in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

//.......................................................................................................

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

// export default function SignupPage() {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(""); // Clear any existing error messages

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     console.log("Signup submitted");
//     // Further signup logic can go here
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center px-4 bg-stone-50 sm:px-6 lg:px-8">
//       <Card className="w-full max-w-md shadow-lg border border-stone-300 p-4 sm:p-6">
//         <CardHeader>
//           <CardTitle className="text-stone-800 text-center text-2xl font-bold sm:text-3xl">
//             Create an Account
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSignup} className="space-y-6">
//             <div className="space-y-2">
//               <Label
//                 htmlFor="name"
//                 className="text-stone-600 text-sm sm:text-base"
//               >
//                 Name
//               </Label>
//               <Input
//                 id="name"
//                 type="text"
//                 placeholder="Enter your name"
//                 required
//                 className="rounded-md border-stone-300 focus:ring-2 focus:ring-stone-400"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label
//                 htmlFor="email"
//                 className="text-stone-600 text-sm sm:text-base"
//               >
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 required
//                 className="rounded-md border-stone-300 focus:ring-2 focus:ring-stone-400"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label
//                 htmlFor="password"
//                 className="text-stone-600 text-sm sm:text-base"
//               >
//                 Password
//               </Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Create a password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="rounded-md border-stone-300 focus:ring-2 focus:ring-stone-400"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label
//                 htmlFor="confirm-password"
//                 className="text-stone-600 text-sm sm:text-base"
//               >
//                 Confirm Password
//               </Label>
//               <Input
//                 id="confirm-password"
//                 type="password"
//                 placeholder="Confirm your password"
//                 required
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="rounded-md border-stone-300 focus:ring-2 focus:ring-stone-400"
//               />
//             </div>
//             {error && <p className="text-red-600 text-sm">{error}</p>}
//             <Button
//               type="submit"
//               className="w-full bg-stone-600 text-white hover:bg-stone-700 rounded-md py-2"
//             >
//               Sign Up
//             </Button>
//           </form>
//         </CardContent>
//         <CardFooter className="mt-4">
//           <p className="text-center text-sm text-stone-600">
//             Already have an account?{" "}
//             <a href="/login" className="text-stone-700 hover:underline">
//               Log in
//             </a>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }
