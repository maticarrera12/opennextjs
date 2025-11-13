"use client";

import { useSession } from "@/lib/auth-client";
import { ThemeProvider } from "@/providers/theme-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const userTheme = (session?.user as { theme?: string } | undefined)?.theme ?? "system";

  return (
    <ThemeProvider attribute="class" defaultTheme={userTheme} enableSystem>
      {children}
    </ThemeProvider>
  );
}
