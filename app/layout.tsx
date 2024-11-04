import type { Metadata } from "next";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <header>
        <Logo />
      </header>
      <Navigation />
        {children}
      </body>
    </html>
  );
}
