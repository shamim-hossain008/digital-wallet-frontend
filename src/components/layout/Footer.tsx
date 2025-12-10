import { Link } from "react-router-dom";
import Logo from "../../assets/icons/Logo";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-100 dark:bg-gray-900 dark:border-gray-700 mt-12">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Branding */}
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <div className="scale-110">
              <Logo />
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-sm">
              Digital Wallet is a secure finance platform crafted with modern
              technologies ensuring reliability, fast transactions, and a
              seamless digital payment experience.
            </p>
          </div>

          {/* Links */}
          <ul className="flex gap-6 text-sm font-medium">
            <li>
              <Link
                to="/about"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
            </li>
            <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Privacy
            </li>
          </ul>
        </div>

        <hr className="my-6 border-gray-300 dark:border-gray-700" />

        {/* Copyright */}
        <p className="text-center text-xs text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} DigitalWallet — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
