import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export const metadata = {
  title: "Expense Tracker | Financial Management",
  description: "Track and manage your finances with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-zinc-100 min-h-screen flex flex-col relative selection:bg-emerald-500/20 selection:text-emerald-300">
        {/* Subtle Ambient Glows */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[140px] rounded-full" />
          <div className="absolute top-1/3 -right-40 w-[450px] h-[350px] bg-teal-500/5 blur-[140px] rounded-full" />
        </div>

        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#18181b",
              color: "#fafafa",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              fontSize: "13px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
            },
          }}
        />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
