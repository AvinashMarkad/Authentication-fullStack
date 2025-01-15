"use client";

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/"); // Redirect to home page
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-stone-50 sm:px-6 lg:px-8 flex-col">
      <h1 className="text-4xl font-bold text-stone-800 mb-4">Page Not Found</h1>
      <p className="text-lg text-stone-600 mb-6">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <button
        onClick={handleRedirect}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Go to Login Page
      </button>
    </div>
  );
}
