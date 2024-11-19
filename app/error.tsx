"use client"; // Error boundaries must be Client Components
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">{error.message}</h1>
      <p className="text-lg">ERROR!</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={() => {
          console.log("Reset function called"); // Debugging line
          reset();
        }}
      >
        Try again
      </button>
    </main>
  );
}
