import type { Metadata } from "next"
import "./globals.css"
import AuthSessionProvider from "./components/SessionProvider"
import NavBar from "./components/NavBar"
import { NotificationProvider } from "./components/NotificationContext"
import Notification from "./components/Notification"

export const metadata: Metadata = {
  title: "Blog app",
  description: "Full Stack Open Next.js exercises",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            <main className="flex-1">{children}</main>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
