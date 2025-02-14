import type { Metadata } from "next";
import "@/styles/globals.scss";
import "@/styles/fonts.scss";

export const metadata: Metadata = {
  title: "Home Décor & Furniture",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en"
    >
      <body>
        
        {/*  */}
        {children}
        <div id='cursor'></div>
      </body>
    </html>
  );
}
