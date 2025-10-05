import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Vault Dashboard",
  description: "Secure Password Vault",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 dark:bg-zinc-950 dark:text-white">
        <Navbar />
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
