import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Exiros",
  description: "Earn on Base",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
