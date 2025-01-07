'use client'
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "./lib/AuthContext";
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
                      <Link rel="noopener noreferrer" href="/calendar/components">Test</Link>
                    </div>
                  </div>
                </nav>
              </aside>
              <div className="flex flex-col w-full">
                <Navbar />
                {/* Główna zawartość z marginesem */}
                <div className="flex-1 h-full overflow-y-auto mt-[90px]">
                  {children}

                  <footer className="h-[10%] bg-gray-800 text-gray-100 fixed bottom-0 w-full">
                  <div className="container flex flex-col p-0 mx-0 my-0  lg:flex-row dark:divide-gray-600 !pb-0 h-max ">
                  <ul className="self-center pt-6 text-center sm:flex sm:justify-around sm:space-x-4 lg:flex-1 lg:justify-start">
                  <li>Shop</li>
                  <li>About</li>
                  <li>Blog</li>
                  <li>Pricing</li>
                  <li>Contact</li>
                  <li>&copy; Radosław Babiński</li>
                  </ul>
                  </div>
                </footer>
                </div>
                
              </div>
            </div>

            
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
