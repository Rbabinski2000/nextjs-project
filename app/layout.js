'use client';
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { AuthProvider, CalendarProvider } from "./lib/AuthContext";
import Navbar from "./lib/navbar";
import { useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <AuthProvider>
        <CalendarProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <div className="flex flex-col h-screen">
              

              {/* Main layout */}
              <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside
                  className={`${
                    sidebarOpen ? "w-44" : "w-16"
                  } bg-gray-800 text-gray-100 flex-shrink-0 transition-all duration-300`}
                >
                  {/* Sidebar Content */}
                  <div className="flex flex-col h-full">
                    <button
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      className="p-4 text-gray-100 hover:bg-gray-700 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>

                    {sidebarOpen && (
                      <nav className="space-y-8 text-sm p-6">
                        <div className="space-y-2">
                          <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-400">
                            Pages
                          </h2>
                          <div className="flex flex-col space-y-1">
                            <Link rel="noopener noreferrer" href="/">
                              Home
                            </Link>
                            <Link rel="noopener noreferrer" href="/user/profile">
                              Profile
                            </Link>
                            <Link rel="noopener noreferrer" href="/user/articles">
                              Articles
                            </Link>
                            <Link rel="noopener noreferrer" href="/calendar">
                              Calendar
                            </Link>
                          </div>
                        </div>
                      </nav>
                    )}
                  </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 h-full overflow-y-auto p-0">
                  {/* Navbar */}
                  <Navbar className="z-50"/>
                  {children}
                </main>
              </div>
            </div>
          </body>
        </CalendarProvider>
      </AuthProvider>
    </html>
  );
}