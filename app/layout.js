import "./globals.css";

export const metadata = {
  title: "Bhavna & Devansh - Wedding Invitation",
  description: "Join us in celebrating our wedding story.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
