import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export const metadata = {
  title: "Expense Tracker",
  description: "Track and manage your expenses easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-100 min-h-screen antialiased">
        <Toaster position="bottom-center" />
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
