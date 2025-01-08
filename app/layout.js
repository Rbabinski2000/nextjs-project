'use client'
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { AuthProvider,CalendarProvider } from "./lib/AuthContext";
import Navbar from "./lib/navbar";

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
  return (
    <html lang="en">
      <AuthProvider>
      <CalendarProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="flex flex-col h-screen">
            <div className="flex flex-1 h-[100%]">
              <aside className="w-1/4  p-6 sm:w-60 bg-gray-800 text-gray-100">
                <nav className="space-y-8 text-sm">
                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-600">Pages</h2>
                    <div className="flex flex-col space-y-1">
                      <Link rel="noopener noreferrer" href="/">Home</Link>
                      <Link rel="noopener noreferrer" href="/user/profile">Profile</Link>
                      <Link rel="noopener noreferrer" href="/user/articles">Articles</Link>
                      <Link rel="noopener noreferrer" href="/calendar">Calendar</Link>
                    </div>
                  </div>
                </nav>
              </aside>
              <div className="flex flex-col w-full">
                <Navbar />
                {/* Główna zawartość z marginesem */}
                <div className="flex-1 h-full overflow-y-auto mt-[90px]">
                  {children}

                </div>
                
              </div>
            </div>

            
          </div>
        </body>
        </CalendarProvider>
      </AuthProvider>
    </html>
  );
}
