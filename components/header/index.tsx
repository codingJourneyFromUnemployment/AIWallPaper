"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Logo = ({ className = "h-10 w-auto xl:h-12" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={className}
  >
    <rect x="0" y="0" width="100" height="100" fill="white" />
    <path
      d="M20 80 Q50 20 80 80"
      fill="none"
      stroke="#7C3AED"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <circle
      cx="50"
      cy="50"
      r="25"
      fill="none"
      stroke="#7C3AED"
      strokeWidth="6"
    />
    <circle cx="50" cy="50" r="5" fill="#7C3AED" />
    <path
      d="M35 70 L50 40 L65 70"
      fill="none"
      stroke="#7C3AED"
      strokeWidth="6"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn, signOut } = useAuth();
  const { signIn } = useSignIn();
  const router = useRouter();



  return (
    <header className="bg-white w-full flex-shrink-0">
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between p-6 lg:px-8 lg:w-11/12 xl:w-10/12"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">AI Wallpaper</span>
            <Logo className="h-10 w-auto xl:h-12" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/sign-in"
            className="text-sm font-semibold leading-6 text-gray-900 xl:text-base hover:text-primary"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Logo className="h-10 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6">
                <Link
                  href="/sign-in"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
