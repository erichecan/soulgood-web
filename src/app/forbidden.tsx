import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">403 - Forbidden</h1>
      <p className="text-muted-foreground">You don&apos;t have permission to access this page.</p>
      <Link href="/" className="text-sm font-medium text-primary hover:underline">
        Return home
      </Link>
    </div>
  );
}
