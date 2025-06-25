import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "./actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/admin" className="font-bold text-lg text-primary">
            CV Shop Admin
          </Link>
          <form action={logout}>
            <Button variant="outline" size="sm">Logout</Button>
          </form>
        </div>
      </header>
      <main className="container py-8">
        {children}
      </main>
    </div>
  );
}
