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
            <div className="flex flex-1 h-[90%]">
              <aside className="w-1/4 p-6 sm:w-60 bg-gray-800 text-gray-100">
                <nav className="space-y-8 text-sm">
                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-600">Getting Started</h2>
                    <div className="flex flex-col space-y-1">
                      <Link rel="noopener noreferrer" href="/user/profile">Profile</Link>
                      <Link rel="noopener noreferrer" href="/user/articles">Articles</Link>
                      <a rel="noopener noreferrer" href="#">Migrations</a>
                      <a rel="noopener noreferrer" href="#">Appearance</a>
                      <a rel="noopener noreferrer" href="#">Mamba UI</a>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-600">Dashboard</h2>
                    <div className="flex flex-col space-y-1">
                      <a rel="noopener noreferrer" href="#">Header</a>
                      <a rel="noopener noreferrer" href="#">Drawer</a>
                      <a rel="noopener noreferrer" href="#">Page Title</a>
                      <a rel="noopener noreferrer" href="#">Menus</a>
                      <a rel="noopener noreferrer" href="#">Sidebar</a>
                      <a rel="noopener noreferrer" href="#">Footer</a>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-600">Pages</h2>
                    <div className="flex flex-col space-y-1">
                      <a rel="noopener noreferrer" href="#">Homepage</a>
                      <a rel="noopener noreferrer" href="#">Users</a>
                      <a rel="noopener noreferrer" href="#">Tools</a>
                      <a rel="noopener noreferrer" href="#">Settings</a>
                    </div>
                  </div>
                </nav>
              </aside>
              <div className="flex flex-col w-full">
                <Navbar />
                {/* Główna zawartość z marginesem */}
                <div className="flex-1 h-full overflow-y-auto mt-[90px] p-4">
                  {children}
                </div>
              </div>
            </div>

            <footer className="h-[10%] bg-gray-800 text-gray-100">
              <div className="container flex flex-col p-4 mx-auto md:p-8 lg:flex-row dark:divide-gray-600 !pb-0">
                <ul className="self-center py-6 space-y-4 text-center sm:flex sm:space-y-0 sm:justify-around sm:space-x-4 lg:flex-1 lg:justify-start">
                  <li>Shop</li>
                  <li>About</li>
                  <li>Blog</li>
                  <li>Pricing</li>
                  <li>Contact</li>
                </ul>
                <div className="flex flex-col justify-center pt-6 lg:pt-0">
                  <div className="flex justify-center space-x-4">
                    {/* Social Media Icons */}
                    <a rel="noopener noreferrer" href="#" title="Instagram" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-violet-600 dark:text-gray-50">
                      {/* SVG Icon */}
                    </a>
                    <a rel="noopener noreferrer" href="#" title="Pinterest" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-violet-600 dark:text-gray-50">
                      {/* SVG Icon */}
                    </a>
                    <a rel="noopener noreferrer" href="#" title="Twitter" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-violet-600 dark:text-gray-50">
                      {/* SVG Icon */}
                    </a>
                    <a rel="noopener noreferrer" href="#" title="Facebook" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-violet-600 dark:text-gray-50">
                      {/* SVG Icon */}
                    </a>
                    <a rel="noopener noreferrer" href="#" title="Gmail" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-violet-600 dark:text-gray-50">
                      {/* SVG Icon */}
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
