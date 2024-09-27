// frontend/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to Global Ground News</h1>
      <p className="text-xl mb-8">
        Engage in meaningful conversations with people around the world.
      </p>
      <Link
        href="/chat"
        className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
      >
        Join the Conversation
      </Link>
    </div>
  );
}