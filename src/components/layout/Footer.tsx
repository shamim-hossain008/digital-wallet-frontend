import { Link } from "react-router-dom";
import Logo from "../../assets/icons/Logo";

export default function Footer() {
  return (
    <footer className="border-t pt-2 text-muted-foreground">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Logo and description */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Logo />
          <p className="max-w-md text-center md:text-left">
            DigitalWallet is a secure, scalable financial platform built with
            React, Tailwind CSS, and ShadCN UI. Designed for real-world use
            cases and professional-grade performance.
          </p>
        </div>

        {/* Right: Static links */}
        <ul className="flex flex-wrap items-center justify-center md:justify-end gap-4 font-medium">
          <li>
            <Link to="/about" className="hover:text-primary">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-primary">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/privacy" className="hover:text-primary">
              Privacy
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom: Copyright */}
      <div className="mt-6 text-center text-xs">
        © {new Date().getFullYear()} DigitalWallet. All rights reserved.
      </div>
    </footer>
  );
}
