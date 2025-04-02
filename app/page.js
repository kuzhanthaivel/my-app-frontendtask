import Link from "next/link";

export default function TaskCompleted() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600">✅ Task Completed!</h1>
        <p className="text-gray-600 mt-2">You have successfully completed the frontend intern task.</p>

        <Link href="/search" target="_blank">
          <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
            View Project
          </button>
        </Link>
      </div>
    </div>
  );
}
