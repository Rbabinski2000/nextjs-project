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
            <div className="flex h-screen">
              {/* Sidebar */}
              <aside
                className={`${
                  sidebarOpen ? "block" : "hidden"
                } lg:block lg:w-44 bg-gray-800 text-gray-100 flex-0 flex-shrink-0 p-6`}
              >
                <nav className="space-y-8 text-sm">
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
              </aside>

              {/* Content Area */}
              <div className="flex flex-1 flex-col lg:flex-row w-full">
                {/* Navbar */}
                <Navbar />
                
                {/* Main Content */}
                <main className="flex-1 h-full overflow-y-auto p-4">
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
