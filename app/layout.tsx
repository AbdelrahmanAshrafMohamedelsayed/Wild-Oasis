import type { Metadata } from "next";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_context/ReservationContext";

const Josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
// console.log(Josefin);
export const metadata: Metadata = {
  // title:"The Wild Oasis",
  title: {
    default: "Welcome to The Wild Oasis",
    template: "%s | The Wild Oasis",
  },
  description: "Book unique camping experiences on over 300,000 campsites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={Josefin.className}>
        <Header />
        {children}
      </body> */}
      <body
        className={`${Josefin.className} relative bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-8 py-12">
          <main className="max-w-7xl mx-auto">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
