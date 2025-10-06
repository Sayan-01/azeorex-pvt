//ॐ
import NextTopLoader from "nextjs-toploader";
import type { Metadata } from "next";
import "./globals.css";
import { auth } from "../../auth";
import { SessionProvider } from "next-auth/react";
import ModalProvider from "../../providers/model-provider";
import { Inter, Lexend, Outfit, Questrial, Righteous } from "next/font/google";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Azeorex",
  description: "Convert your dream into design with precision",
};

const outfi = Inter({ subsets: ["latin"], weight: "400" });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          cz-shortcut-listen="true"
          className={`bg-black scroll-smooth dark w-full overflow-auto antialiased box x ${outfi.className}`}
        >
          {/* <ReactQueryProvider> */}
            <ModalProvider>
              <NextTopLoader
                color="#ffffff"
                height={2}
                showSpinner={false}
              />
              {children}
              <Toaster />
            </ModalProvider>
          {/* </ReactQueryProvider> */}
        </body>
      </html>
    </SessionProvider>
  );
}
