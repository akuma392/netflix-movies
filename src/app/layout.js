import "../styles/globals.css"; // Import global styles
import Navbar from "../components/Navbar"; // Import Navbar
import Footer from "@/components/Footer"; // Import Footer

export const metadata = {
  title: "Netflix Movie Search App",
  description: "Search for Netflix movies by title, genre, and country.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Ensure full height */}
        <Navbar />
        <main className="flex-grow">{children}</main>{" "}
        {/* This ensures the content grows to fill available space */}
        <Footer />
      </body>
    </html>
  );
}
