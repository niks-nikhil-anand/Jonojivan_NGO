"use client"
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query; // Get the error message from the query

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-red-600">Error</h1>
      <p className="mt-4 text-lg text-gray-700">
        {error ? error : "An unexpected error occurred. Please try again."}
      </p>
      <button
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg"
        onClick={() => router.push("/auth/signin")}
      >
        Go Back to Sign In
      </button>
    </div>
  );
};

export default ErrorPage;
