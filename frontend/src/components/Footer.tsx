// frontend/components/Footer.tsx
import Link from 'next/link';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-8">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Global Ground News. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0 items-center">
          <Link href="/about" className="text-gray-600 hover:text-blue-600">
            About
          </Link>
          <Link href="/privacy" className="text-gray-600 hover:text-blue-600">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-gray-600 hover:text-blue-600">
            Terms of Service
          </Link>
          <a
            href="https://twitter.com/YourTwitterHandle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://facebook.com/YourFacebookPage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="https://instagram.com/YourInstagramHandle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}