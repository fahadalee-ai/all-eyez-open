import type { ReactNode } from "react";
import { MobileRoot } from "./ios/shell";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell mx-auto h-dvh overflow-hidden bg-background text-foreground">
      <MobileRoot>{children}</MobileRoot>
    </div>
  );
}
