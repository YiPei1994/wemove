import type { Metadata } from "next";
import Header from "@/components/header/Header";
import { ReactQueryClientProvider } from "@/store/reactQuery/ReactQueryProvider";
import "./globals.css";
import { ThemeProvider } from "@/store/shadcd/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "ReLink",
  description: "Lets become a better version of you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={``}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
