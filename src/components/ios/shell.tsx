import { useRouterState } from "@tanstack/react-router";
import {
  ChevronLeft,
  CircleEllipsis,
  CloudSun,
  House,
  LayoutGrid,
  MessagesSquare,
  Shield,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { FrameCtx } from "./frame";
import { Button } from "./ui";
import { useApp } from "@/lib/store";
import { useBack, useGo } from "@/lib/nav";
import { haptic } from "@/lib/haptic";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/home", label: "Home", es: "Inicio", icon: House },
  { to: "/services", label: "Services", es: "Servicios", icon: LayoutGrid },
  { to: "/community", label: "Community", es: "Comunidad", icon: Users },
  { to: "/chat", label: "Chat", es: "Chat", icon: MessagesSquare },
  { to: "/more", label: "More", es: "Más", icon: CircleEllipsis },
];

export function MobileRoot({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const app = useApp();
  const frame = useRef<HTMLDivElement>(null);
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const [covered, setCovered] = useState(false);
  const router = useRouterState({ select: (s) => s });
  const showTabs = TABS.some((tab) => tab.to === path);
  const es = app.settings.language === "es";

  useEffect(() => setNode(frame.current), []);

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "hidden" && app.settings.discreet) setCovered(true);
      if (document.visibilityState === "visible") setCovered(false);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [app.settings.discreet]);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    let x0 = 0;
    let y0 = 0;
    let tracking = false;
    const down = (e: PointerEvent) => {
      if (e.clientX > 28 || path === "/") return;
      tracking = true;
      x0 = e.clientX;
      y0 = e.clientY;
    };
    const up = (e: PointerEvent) => {
      if (!tracking) return;
      tracking = false;
      if (e.clientX - x0 > 72 && Math.abs(e.clientY - y0) < 80 && window.history.length > 1) {
        haptic(8);
        window.history.back();
      }
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointerup", up);
    };
  }, [path]);

  const showTip = app.booted && !app.settings.quickExitSeen && !app.disguised && !app.locked && path !== "/";

  return (
    <FrameCtx.Provider value={node}>
      <div ref={frame} className="relative flex h-full min-h-0 w-full min-w-0 flex-col bg-background">
        <div className={cn("flex min-h-0 w-full min-w-0 flex-1 flex-col", (app.locked || app.disguised) && "hidden")}>{children}</div>
        {showTabs && !app.disguised && !app.locked && <TabBar path={path} es={es} badge={app.unreadChat} />}
        {!app.disguised && <QuickExit es={es} />}
        {showTip && (
          <div className="absolute right-3 top-[4.25rem] z-30 w-64 rounded-2xl bg-ink p-3 text-white shadow-card">
            <p className="text-[0.9375rem] font-semibold leading-snug">
              {es ? "Salida rápida" : "Quick Exit"}
            </p>
            <p className="mt-1 text-[0.8125rem] leading-snug text-white/80">
              {es
                ? "Un toque cierra esta vista y muestra una pantalla neutra. Mantén pulsado el nombre de la ciudad para volver."
                : "One tap closes this view and shows a neutral screen. Press and hold the city name, or the Notes title, to come back."}
            </p>
            <button type="button" className="mt-2 min-h-11 text-[0.9375rem] font-semibold text-[#e4c6f8]" onClick={() => app.markQuickExitSeen()}>
              {es ? "Entendido" : "Got it"}
            </button>
          </div>
        )}
        {app.disguised && <Disguise />}
        {app.locked && !app.disguised && <LockScreen />}
        {app.offline && !app.disguised && (
          <div className="absolute inset-x-0 top-0 z-20 bg-ink px-4 py-2 text-center text-[0.8125rem] font-semibold text-white">
            You’re offline. Saved content is still available.
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 top-2 z-30 flex flex-col items-center gap-2">
          {app.toasts.map((t) => (
            <button
              key={t.id}
              type="button"
              className="pointer-events-auto rounded-lg bg-ink/95 px-4 py-2 text-center text-white shadow-card"
              onClick={() => app.dismissToast(t.id)}
            >
              <span className="block text-[0.9375rem] font-semibold">{t.title}</span>
              {t.body && <span className="block text-[0.75rem] text-white/75">{t.body}</span>}
            </button>
          ))}
        </div>
        {covered && <NotesCover />}
        <span className="sr-only">{router.location.href}</span>
      </div>
    </FrameCtx.Provider>
  );
}

function TabBar({ path, es, badge }: { path: string; es: boolean; badge: number }) {
  const go = useGo();
  return (
    <nav className="grid w-full min-w-0 shrink-0 grid-cols-5 bg-card px-2 pt-2.5 pb-[max(0.85rem,env(safe-area-inset-bottom))] shadow-[0_-1px_0_var(--divider),0_-10px_24px_rgba(35,31,32,0.07)]" aria-label="Tabs">
      {TABS.map((tab) => {
        const on = path === tab.to;
        const Icon = tab.icon;
        return (
          <button
            key={tab.to}
            type="button"
            aria-current={on ? "page" : undefined}
            onClick={() => go(tab.to)}
            className="flex min-h-[3.6rem] min-w-0 flex-col items-center justify-center gap-1 py-1"
          >
            <span className="relative">
              <span className={cn("grid h-8 w-14 place-items-center rounded-lg", on ? "bg-primary-100 text-link" : "text-muted-foreground")}>
                <Icon size={20} strokeWidth={on ? 2.4 : 1.8} fill={on ? "currentColor" : "none"} aria-hidden />
              </span>
              {tab.to === "/chat" && badge > 0 && (
                <span className="absolute -right-1 -top-1 grid h-[1.05rem] min-w-[1.05rem] place-items-center rounded-full bg-danger px-1 text-[0.65rem] font-bold text-white">
                  {badge}
                </span>
              )}
            </span>
            <span className={cn("text-[0.72rem] font-semibold leading-none", on ? "text-link" : "text-muted-foreground")}>
              {es ? tab.es : tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function QuickExit({ es }: { es: boolean }) {
  const app = useApp();
  return (
    <button
      type="button"
      onClick={() => {
        haptic(20);
        app.setDisguised(true);
      }}
      className="quick-exit inline-flex min-h-11 items-center gap-1 rounded-lg bg-ink px-3 text-[0.75rem] font-semibold leading-none text-white shadow-card"
    >
      <Shield size={14} aria-hidden />
      {es ? "Salir" : "Quick Exit"}
    </button>
  );
}

function Disguise() {
  const app = useApp();
  const hold = useRef<number | null>(null);
  const back = () => {
    haptic(12);
    app.setDisguised(false);
  };
  const start = () => {
    hold.current = window.setTimeout(back, 900);
  };
  const stop = () => {
    if (hold.current) window.clearTimeout(hold.current);
  };
  if (app.settings.disguise === "notes") {
    return (
      <div className="flex h-full flex-col bg-[#f7f3ea] px-5 pt-16 text-[#1c1c1e]">
        <h1 className="text-[2.125rem] font-bold" onPointerDown={start} onPointerUp={stop} onPointerLeave={stop}>
          Notes
        </h1>
        <ul className="mt-6 divide-y divide-black/10">
          {["Milk, oats, bananas", "Thursday pickup window", "Call the dentist", "Library book due Friday"].map((note) => (
            <li key={note} className="py-3 text-[1.0625rem]">{note}</li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#6ea7e8] to-[#d7e8f8] px-5 pt-14 text-[#102033]">
      <p className="text-[1.0625rem] font-medium" onPointerDown={start} onPointerUp={stop} onPointerLeave={stop}>
        Atlanta
      </p>
      <p className="mt-2 text-[5rem] font-light leading-none">72°</p>
      <p className="text-[1.25rem]">Partly cloudy</p>
      <div className="mt-8 flex justify-between rounded-2xl bg-white/45 p-3 text-center text-[0.8125rem] font-semibold">
        {[
          ["Now", "72°"],
          ["1 PM", "74°"],
          ["2 PM", "75°"],
          ["3 PM", "73°"],
          ["4 PM", "70°"],
        ].map(([h, t]) => (
          <span key={h}>
            <CloudSun className="mx-auto mb-1" size={16} />
            {h}
            <br />
            {t}
          </span>
        ))}
      </div>
      <div className="mt-3 space-y-2 rounded-2xl bg-white/45 p-3 text-[1rem]">
        {[
          ["Friday", "68° / 75°"],
          ["Saturday", "64° / 73°"],
          ["Sunday", "61° / 70°"],
        ].map(([d, t]) => (
          <div key={d} className="flex justify-between">
            <span>{d}</span>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LockScreen() {
  const app = useApp();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const discreet = app.settings.discreet;
  const press = (n: string) => {
    const next = (pin + n).slice(0, 4);
    setPin(next);
    setError("");
    if (next.length === 4) {
      if (!app.unlock(next)) {
        setError("That PIN doesn’t match.");
        setPin("");
      }
    }
  };
  return (
    <div className="flex h-full flex-col items-center bg-background px-6 pt-16 text-center">
      <p className="headline">{discreet ? "Notes is locked" : "All Eyez Open is locked"}</p>
      <p className="footnote mt-1 text-muted-foreground">Use Face ID or your 4-digit PIN.</p>
      <div className="mt-6 flex gap-3" aria-label="PIN">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={cn("h-3 w-3 rounded-full border border-foreground", pin.length > i && "bg-foreground")} />
        ))}
      </div>
      {error && <p className="mt-3 text-[0.8125rem] text-danger">{error}</p>}
      <div className="mt-6 grid w-full max-w-[16rem] grid-cols-3 gap-3">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"].map((key) =>
          key === "" ? (
            <span key="blank" />
          ) : (
            <button
              key={key}
              type="button"
              className="grid h-14 place-items-center rounded-full bg-muted text-[1.35rem] font-semibold"
              onClick={() => (key === "del" ? setPin((p) => p.slice(0, -1)) : press(key))}
            >
              {key === "del" ? "⌫" : key}
            </button>
          ),
        )}
      </div>
      <div className="mt-6 w-full max-w-xs">
        <Button
          disabled={busy}
          onClick={() => {
            if (!app.settings.biometrics) return;
            setBusy(true);
            window.setTimeout(() => {
              app.unlock();
              setBusy(false);
            }, 700);
          }}
        >
          {busy ? "Checking Face ID…" : "Unlock with Face ID"}
        </Button>
      </div>
    </div>
  );
}

function NotesCover() {
  return (
    <div className="absolute inset-0 z-40 bg-[#f7f3ea] px-5 pt-16 text-[#1c1c1e]">
      <h1 className="text-[2rem] font-bold">Notes</h1>
      <p className="mt-4 text-[1.0625rem]">No new notes</p>
    </div>
  );
}

export function Page({
  title,
  large,
  back = true,
  fallback = "/home",
  right,
  header,
  children,
  footer,
  onRefresh,
}: {
  title?: string;
  large?: boolean;
  back?: boolean;
  fallback?: string;
  right?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  onRefresh?: () => void;
}) {
  const goBack = useBack(fallback);
  const scroller = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  const [pull, setPull] = useState(0);
  const startY = useRef(0);

  const showInline = Boolean(title) && (!large || compact);

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col bg-background">
      {header ?? (
        <header className={cn("shrink-0", back || !large ? "border-b border-divider bg-card" : "px-4")}>
          {back || !large ? (
            <div className="relative h-16">
              <div className="flex h-full items-center">
                {back ? (
                  <button
                    type="button"
                    onClick={() => {
                      haptic(8);
                      goBack();
                    }}
                    className="relative z-10 inline-flex h-full items-center gap-0.5 pl-1 pr-2 text-link active:opacity-55"
                  >
                    <ChevronLeft size={28} strokeWidth={2.25} aria-hidden />
                    <span className="text-[1.0625rem]">Back</span>
                  </button>
                ) : (
                  <span />
                )}
                <div className="relative z-10 ml-auto flex h-full items-center pr-36">{right}</div>
              </div>
              {showInline ? (
                <h1 className="pointer-events-none absolute inset-0 flex items-center justify-center px-[7.5rem]">
                  <span className="truncate text-[1.0625rem] font-semibold">{title}</span>
                </h1>
              ) : null}
            </div>
          ) : (
            <div className="flex h-14 items-center pr-36">
              <span className="flex-1" />
              <div className="flex items-center">{right}</div>
            </div>
          )}
          {large && !compact && title && <h1 className={cn("large-title pb-3", back || !large ? "px-4" : "pr-2")}>{title}</h1>}
        </header>
      )}
      <div
        ref={scroller}
        className="min-h-0 w-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-4 pb-8"
        onScroll={(e) => setCompact(e.currentTarget.scrollTop > 24)}
        onPointerDown={(e) => {
          if (scroller.current && scroller.current.scrollTop <= 0) startY.current = e.clientY;
        }}
        onPointerMove={(e) => {
          if (!onRefresh || !scroller.current || scroller.current.scrollTop > 0) return;
          setPull(Math.max(0, Math.min(72, e.clientY - startY.current)));
        }}
        onPointerUp={() => {
          if (pull > 56 && onRefresh) onRefresh();
          setPull(0);
        }}
      >
        {onRefresh && pull > 8 && <p className="pb-2 text-center footnote text-muted-foreground">{pull > 56 ? "Release to refresh" : "Pull to refresh"}</p>}
        {children}
      </div>
      {footer && (
        <div className="shrink-0 bg-card px-4 pt-3 pb-[max(0.9rem,env(safe-area-inset-bottom))] shadow-[0_-1px_0_var(--divider),0_-10px_24px_rgba(35,31,32,0.07)]">{footer}</div>
      )}
    </div>
  );
}

export function StickyActions({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-2">{children}</div>;
}
