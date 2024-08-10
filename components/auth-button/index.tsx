import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AuthButton() {
  const { isSignedIn, isLoaded, user } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
    );
  }

  if (isSignedIn && user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          onMouseEnter={() => setDropdownOpen(true)}
          className="focus:outline-none"
        >
          <img
            src={user.imageUrl}
            alt={user.fullName || "User avatar"}
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        </button>
        {dropdownOpen && (
          <div
            className="absolute -right-10 mt-2 z-20 bg-white shadow-lg rounded-md w-28 xl:w-32"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <SignOutButton>
              <button className="px-4 py-2 text-sm font-semibold leading-6 text-gray-900 xl:text-base hover:text-primary hover:bg-gray-100 w-full text-left">
                Sign out <span aria-hidden="true">&rarr;</span>
              </button>
            </SignOutButton>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href="/sign-in"
      className="text-sm font-semibold leading-6 text-gray-900 xl:text-base hover:text-primary"
    >
      Log in <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}
