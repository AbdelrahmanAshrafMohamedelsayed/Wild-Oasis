import type { Metadata } from "next";
import Navigation from "./_components/Navigation";
import Logo from "./_components/Logo";
import "@/app/_styles/globals.css";
export const metadata: Metadata = {
  // title:"The Wild Oasis",
  title:{
    default:"Welcome to The Wild Oasis",
    template:"%s | The Wild Oasis",
  },
  description:"Book unique camping experiences on over 300,000 campsites",
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
