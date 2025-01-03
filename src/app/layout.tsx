import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white flex justify-center w-full px-12">
        <div className="flex flex-col justify-center w-full">{children}</div>
      </body>
    </html>
  );
}
