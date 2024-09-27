// frontend/components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Global Ground News
        </Link>
        <div className="space-x-4">
          <Link href="/chat" className="hover:text-blue-600">
            Chat
          </Link>
          <Link href="/settings" className="hover:text-blue-600">
            Settings
          </Link>
          <Link href="/login.tsx" className="hover:text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}