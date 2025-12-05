import { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { APP_NAME } from "@/lib/constants";   // ✅ import from separate file

export const metadata: Metadata = {
  title: APP_NAME,
  description: "School Website",
  icons: {
    icon: { url: "/favicon.ico" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
          <ToastContainer position="bottom-right" theme="dark" />
        </body>
      </html>
    </ClerkProvider>
  );
}
