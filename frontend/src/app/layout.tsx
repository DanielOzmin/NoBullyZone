import { AuthProvider } from "@/context/AuthContext";
import { PostProvider } from "@/context/PostContext"
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <PostProvider>
          {children}
          </PostProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
