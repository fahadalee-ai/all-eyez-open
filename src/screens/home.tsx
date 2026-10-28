import { Bell, Calendar, Heart, LayoutGrid, MessageCircle, Shield, Users } from "lucide-react";
import { ORG, impactStats, programs, quickActions, services } from "@/data/content";
import { Card, Logo, Photo, ProgressBar, Rail, SectionTitle } from "@/components/ios/ui";
import { Page } from "@/components/ios/shell";
import { haptic, money } from "@/lib/haptic";
import { useGo } from "@/lib/nav";
import { useApp } from "@/lib/store";
import { useState } from "react";

const icons = {
  calendar: Calendar,
  heart: Heart,
  grid: LayoutGrid,
  people: Users,
  chat: MessageCircle,
  shield: Shield,
};

export function HomeScreen() {
  const go = useGo();
  const app = useApp();
  const [refreshing, setRefreshing] = useState(false);
  const name = app.user?.nickname;
  const raised = ORG.raised + app.donations.filter((d) => d.date === "Oct 29, 2026").reduce((s, d) => s + d.amount, 0);
  const pct = Math.round((raised / ORG.goal) * 100);
  const unread = app.myNotices.length;

  return (
    <Page
      back={false}
      onRefresh={() => {
        setRefreshing(true);
        window.setTimeout(() => {
          setRefreshing(false);
          if (app.offline) app.toast("Couldn’t refresh", "You’re offline. Saved content is still here.");
          else app.toast("Updated");
        }, 700);
      }}
      header={
        <header className="flex items-center gap-3 pb-2 pl-4 pr-36 pt-2">
          <Logo className="h-11 w-11" label="All Eyez Open" />
          <div className="min-w-0">
            <p className="footnote text-muted-foreground">{name ? "Hello," : "Welcome"}</p>
            <h1 className="truncate text-[1.35rem] font-bold leading-tight">{name || "You are not alone"}</h1>
          </div>
          <button type="button" aria-label={`Notifications${unread ? `, ${unread} new` : ""}`} className="relative ml-auto grid h-11 w-11 place-items-center" onClick={() => go("/notifications")}>
            <Bell size={22} />
            {unread > 0 && <span className="absolute mt-[-18px] ml-4 h-2.5 w-2.5 rounded-full bg-primary" />}
          </button>
        </header>
      }
    >
      {refreshing && <p className="footnote mb-2 text-center text-muted-foreground">Refreshing…</p>}
      <Card className="overflow-hidden">
        <div className="relative h-48">
          <Photo name="hero-hands" alt="Community members holding hands in warm light" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f8f2fc]/25 via-[#782baf]/35 to-[#231f20]/88" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white/80">All Eyez Open</p>
            <h2 className="mt-1 text-[1.65rem] font-bold leading-tight">You Are Not Alone</h2>
            <p className="mt-1 text-[0.95rem] leading-snug text-white">Housing, care, work, and a community that stays with you.</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button type="button" className="min-h-11 rounded-lg bg-white font-semibold text-[#231f20]" onClick={() => go("/help")}>Get Help Now</button>
              <button type="button" className="min-h-11 rounded-lg bg-white/15 font-semibold text-white ring-1 ring-white/70" onClick={() => go("/donate")}>Donate</button>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-3 rounded-lg bg-[#fff4f4] px-3 py-3 text-[0.9375rem] leading-snug text-[#3d1212] dark:bg-[#3a2426] dark:text-[#ffe8e8]">
        <p>
          In danger? <a className="font-semibold underline" href="tel:911">Call 911</a>
          {" · "}
          Hotline <a className="font-semibold underline" href={`tel:${ORG.hotlineTel}`}>{ORG.hotline}</a>
        </p>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {quickActions.map((action) => {
          const Icon = icons[action.icon as keyof typeof icons];
          return (
            <button key={action.id} type="button" onClick={() => go(action.to)} className="flex min-h-[5.25rem] min-w-0 flex-col items-center justify-center gap-1.5 rounded-lg bg-card px-1 text-center shadow-card">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-primary-100 text-link">
                <Icon size={18} />
              </span>
              <span className="text-[0.75rem] font-semibold leading-tight">{action.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-7">
        <SectionTitle action="See all" onAction={() => go("/services")}>Our Services</SectionTitle>
        <Rail>
          {services.slice(0, 6).map((service) => (
            <button
              key={service.id}
              type="button"
              aria-label={service.title}
              onClick={() => {
                haptic(8);
                go(`/services/${service.id}`);
              }}
              className="relative h-44 w-[17.25rem] shrink-0 snap-start overflow-hidden rounded-lg text-left"
            >
              <Photo name={service.image} alt="" className="absolute inset-0 h-full w-full" />
              <span className="absolute inset-0 bg-gradient-to-t from-[#231f20] via-[#231f20]/35 to-[#231f20]/10" />
              <span className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                <span className="block text-[1.05rem] font-semibold leading-tight">{service.title}</span>
                <span className="mt-1 block line-clamp-2 text-[0.8125rem] leading-snug text-white/90">{service.summary}</span>
              </span>
            </button>
          ))}
        </Rail>
      </div>

      <div className="mt-7">
        <SectionTitle action="Calendar" onAction={() => go("/programs")}>Upcoming Programs & Classes</SectionTitle>
        <Rail>
          {programs.map((program) => (
            <button
              key={program.id}
              type="button"
              aria-label={program.title}
              onClick={() => {
                haptic(8);
                go(`/programs/${program.id}`);
              }}
              className="relative h-48 w-[18.5rem] shrink-0 snap-start overflow-hidden rounded-lg text-left"
            >
              <Photo name={program.image} alt="" className="absolute inset-0 h-full w-full" />
              <span className="absolute inset-0 bg-gradient-to-t from-[#231f20] via-[#231f20]/30 to-[#231f20]/15" />
              <span className="absolute left-3 top-3 rounded-md bg-white/92 px-2.5 py-1 text-[0.75rem] font-semibold text-[#231f20]">
                {new Date(`${program.date}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {program.time}
              </span>
              <span className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                <span className="block text-[1.05rem] font-semibold leading-tight">{program.title}</span>
                <span className="mt-1 block text-[0.9rem] font-semibold text-[#e4c6f8]">{program.seats} seats left · Register</span>
              </span>
            </button>
          ))}
        </Rail>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-1 text-center">
        {impactStats.map((stat) => (
          <div key={stat.l} className="min-w-0">
            <p className="text-[1.05rem] font-bold leading-tight text-link">{stat.n}</p>
            <p className="mt-0.5 text-[0.68rem] leading-tight text-muted-foreground">{stat.l}</p>
          </div>
        ))}
      </div>

      <button type="button" className="mt-6 w-full rounded-lg bg-card p-4 text-left shadow-card" onClick={() => go("/donate")}>
        <p className="text-[1rem] font-semibold">Monthly care goal</p>
        <p className="mt-1 text-[0.8125rem] leading-snug text-muted-foreground">{money(raised)} of {money(ORG.goal)}</p>
        <div className="mt-3">
          <ProgressBar value={pct} label="Monthly fundraising progress" />
        </div>
        <p className="mt-2 text-[0.9375rem] font-semibold text-link">{pct}% funded · Give</p>
      </button>

      <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1 pb-2 text-[0.9375rem] font-semibold text-link">
        <button type="button" className="min-h-11" onClick={() => go("/community")}>Community</button>
        <button type="button" className="min-h-11" onClick={() => go("/gallery")}>Gallery</button>
        <button type="button" className="min-h-11" onClick={() => go("/about")}>About</button>
      </div>
    </Page>
  );
}
