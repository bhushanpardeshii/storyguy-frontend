import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";

export const metadata = {
  title: "StoryGuy",
  description: "AI Story Writer",
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
