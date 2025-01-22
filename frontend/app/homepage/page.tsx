"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const cursors = ["🖱️", "⏳", "🔄"]; // Multicursor symbols

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Remove the token
    router.push("/login"); // Redirect to login page
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.warn("No token found. Redirecting to login.");
      router.push("/notfound"); // Redirect to login page if no token is found
    } else {
      setTimeout(() => setLoading(false), 3000); // Simulate loading for 3 seconds
    }
  }, [router]);

  if (loading) {
    return (
      <LazyMotion features={domAnimation}>
        <div className="flex min-h-screen items-center justify-center px-4 bg-stone-50 sm:px-6 lg:px-8 flex-col">
          <div className="text-xl font-semibold text-stone-800 bg-white p-4 rounded-lg shadow-md">
            Loading, please wait...
          </div>

          <div className="flex mt-8 space-x-6">
            {cursors.map((cursor, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [1, 1.2, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                  y: [-10, 10, -10],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: index * 0.4,
                }}
                className="text-3xl"
              >
                {cursor}
              </m.div>
            ))}
          </div>
        </div>
      </LazyMotion>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-stone-50 sm:px-6 lg:px-8 flex-col">
      <h1 className="text-3xl font-bold text-stone-800 mb-4">
        Welcome to the Home Page
      </h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

// .............................................................

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function HomePage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true); // State to manage loading

//   const handleLogout = () => {
//     localStorage.removeItem("jwtToken"); // Remove the token
//     router.push("/login"); // Redirect to login page
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("jwtToken");

//     if (!token) {
//       console.warn("No token found. Redirecting to login.");
//       router.push("/notfound"); // Redirect to login page if no token is found
//     } else {
//       setLoading(false); // Set loading to false once token is found
//     }
//   }, [router]);

//   if (loading) {
//     // Show loading UI while checking token
//     return (
//       <div className="flex min-h-screen items-center justify-center px-4 bg-stone-50 sm:px-6 lg:px-8 flex-col">
//         <div className="text-2xl font-semibold text-stone-800">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center px-4 bg-stone-50 sm:px-6 lg:px-8 flex-col">
//       <h1 className="text-3xl font-bold text-stone-800 mb-4">
//         Welcome to the Home Page
//       </h1>
//       <button
//         onClick={handleLogout}
//         className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }
