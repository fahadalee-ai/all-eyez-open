import { useEffect, useState } from "react";
import { Check, ChevronDown, Clock, Phone } from "lucide-react";
import { modules, ORG, programs, services, specialists } from "@/data/content";
import { Button, Card, Chip, EmptyState, Photo, SearchField, Sheet, TextArea, TextField } from "@/components/ios/ui";
import { Page, StickyActions } from "@/components/ios/shell";
import { haptic } from "@/lib/haptic";
import { useGo } from "@/lib/nav";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

const chips = ["All", "Basics", "Care", "Growth", "Legal"];

export function ServicesScreen() {
  const go = useGo();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(t);
  }, []);
  const list = services.filter((s) => (cat === "All" || s.category === cat) && `${s.title} ${s.summary}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <Page title="Services" large back={false}>
      <SearchField value={q} onChange={setQ} placeholder="Search services" />
      <div className="mt-3 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {chips.map((chip) => (
          <Chip key={chip} selected={cat === chip} onClick={() => setCat(chip)}>{chip}</Chip>
        ))}
      </div>
      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => <div key={i} className="h-52 animate-pulse rounded-lg bg-muted" />)}
        </div>
      ) : list.length === 0 ? (
        <EmptyState title="No matching services" body="Try another word, or browse all categories." action="Clear search" onAction={() => { setQ(""); setCat("All"); }} />
      ) : (
        <div className="space-y-3 pb-4">
          {list.map((service) => (
            <button
              key={service.id}
              type="button"
              aria-label={service.title}
              onClick={() => {
                haptic(8);
                go(`/services/${service.id}`);
              }}
              className="relative h-52 w-full overflow-hidden rounded-lg text-left"
            >
              <Photo name={service.image} alt="" className="absolute inset-0 h-full w-full" />
              <span className="absolute inset-0 bg-gradient-to-t from-[#231f20] via-[#231f20]/40 to-[#231f20]/10" />
              <span className="absolute left-3 top-3 rounded-md bg-white/92 px-2.5 py-1 text-[0.75rem] font-semibold text-[#231f20]">{service.category}</span>
              <span className="absolute inset-x-0 bottom-0 p-4 text-white">
                <span className="block text-[1.25rem] font-bold leading-tight">{service.title}</span>
                <span className="mt-1 block line-clamp-2 text-[0.875rem] leading-snug text-white/90">{service.summary}</span>
                <span className="mt-2 block text-[0.9rem] font-semibold text-[#e4c6f8]">View details</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </Page>
  );
}

export function ServiceDetailScreen({ id }: { id: string }) {
  const service = services.find((s) => s.id === id);
  const go = useGo();
  const app = useApp();
  const [open, setOpen] = useState<number | null>(0);
  const [sheet, setSheet] = useState<string | null>(null);
  const [formNote, setFormNote] = useState("");
  const [size, setSize] = useState("M");
  if (!service) {
    return (
      <Page title="Service">
        <EmptyState title="Service unavailable" body="That page isn’t in this preview." action="All services" onAction={() => go("/services")} />
      </Page>
    );
  }
  return (
    <Page
      title={service.title}
      footer={
        <StickyActions>
          <Button onClick={() => { app.patchConsult({ type: service.id === "legal" ? "legal" : service.id === "therapy" ? "counseling" : service.id === "housing" ? "housing" : service.id === "finance" || service.id === "jobs" ? "financial" : "general" }); go("/consult"); }}>Book</Button>
          <Button variant="secondary" onClick={() => go("/qa/ask")}>Ask a Question</Button>
        </StickyActions>
      }
    >
      <div className="relative h-60 overflow-hidden rounded-lg">
        <Photo name={service.image} alt="" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#231f20] via-[#231f20]/40 to-[#231f20]/10" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <p className="inline-flex rounded-lg bg-white/92 px-2.5 py-1 text-[0.75rem] font-semibold text-[#231f20]">{service.category}</p>
          <h2 className="mt-2 text-[1.7rem] font-bold leading-tight">{service.title}</h2>
          <p className="mt-1 text-[0.95rem] leading-snug text-white/95">{service.summary}</p>
        </div>
      </div>
      <section className="mt-4 rounded-lg bg-primary-50 px-4 py-3.5">
        <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-link">Who it’s for</h2>
        <p className="mt-1.5 text-[1.05rem] leading-snug">{service.who}</p>
      </section>
      <section className="mt-4 overflow-hidden rounded-lg bg-card shadow-card">
        <h2 className="px-4 pt-4 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">What we offer</h2>
        <ul>
          {service.offer.map((item) => (
            <li key={item} className="flex items-center gap-3 px-4 py-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary-100 text-link">
                <Check size={15} strokeWidth={2.5} aria-hidden />
              </span>
              <span className="text-[1.02rem] leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-4 rounded-lg bg-card p-4 shadow-card">
        <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">How it works</h2>
        <ol className="mt-3 space-y-4">
          {service.steps.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-[0.9375rem] font-bold text-white">{i + 1}</span>
              <span>
                <span className="block font-semibold">{step.title}</span>
                <span className="block text-[1rem] leading-snug text-foreground">{step.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-4 grid grid-cols-1 gap-3">
        <div className="rounded-lg bg-card px-4 py-3.5 shadow-card">
          <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Eligibility</h2>
          <p className="mt-1.5 text-[1rem] leading-snug">{service.eligibility}</p>
        </div>
        <div className="rounded-lg bg-card px-4 py-3.5 shadow-card">
          <h2 className="flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <Clock size={13} aria-hidden /> Hours
          </h2>
          <p className="mt-1.5 text-[1rem] leading-snug">{service.hours}</p>
        </div>
      </section>
      <ServiceExtra id={service.id} onOpen={setSheet} />
      <h2 className="headline mt-5">FAQs</h2>
      <div className="mt-2 overflow-hidden rounded-2xl bg-card shadow-card">
        {service.faqs.map((faq, i) => (
          <button key={faq.q} type="button" className="w-full border-b border-divider px-4 py-3 text-left last:border-0" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            <span className="flex items-center justify-between gap-3">
              <span className="text-[1.0625rem] font-semibold">{faq.q}</span>
              <ChevronDown className={cn("shrink-0 transition", open === i && "rotate-180")} size={18} />
            </span>
            {open === i && <span className="mt-2 block text-[1rem] leading-snug text-muted-foreground">{faq.a}</span>}
          </button>
        ))}
      </div>
      <Card className="mt-5 p-4">
        <p className="headline">Talk with client care</p>
        <p className="footnote mt-1 text-muted-foreground">{ORG.hours}</p>
        <a className="mt-3 flex min-h-11 items-center gap-2 font-semibold text-link" href={`tel:${ORG.phone.replace(/\D/g, "")}`}>
          <Phone size={18} /> {ORG.phone}
        </a>
        <p className="footnote text-muted-foreground">{ORG.email}</p>
      </Card>
      <h2 className="headline mt-5">Related</h2>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {service.related.map((rid) => {
          const rel = services.find((s) => s.id === rid);
          if (!rel) return null;
          return <Chip key={rid} onClick={() => go(`/services/${rid}`)}>{rel.title}</Chip>;
        })}
      </div>
      <Sheet open={sheet !== null} onClose={() => setSheet(null)} title={sheet === "clothes" ? "Request clothing" : sheet === "job" ? "Apply for program" : "Request received"}>
        {sheet === "done" ? (
          <p className="body-text">We saved this request on this device and client care will follow the contact method you marked as safe.</p>
        ) : (
          <div className="space-y-3">
            {sheet === "clothes" && (
              <label className="block">
                <span className="mb-1 block text-[0.8125rem] font-semibold">Size</span>
                <select className="min-h-[3.25rem] w-full rounded-xl border border-divider bg-card px-3" value={size} onChange={(e) => setSize(e.target.value)}>
                  {["XS", "S", "M", "L", "XL", "2XL", "Child 4", "Child 8"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
            )}
            <TextArea label="What should we prepare?" value={formNote} onChange={setFormNote} hint="Leave out your address. Tell us sizes, pickup day, or a goal." />
            <Button onClick={() => { app.toast("Request saved"); setSheet("done"); }}>Submit</Button>
          </div>
        )}
      </Sheet>
      <div className="h-2" />
    </Page>
  );
}

function ServiceExtra({ id, onOpen }: { id: string; onOpen: (s: string) => void }) {
  const app = useApp();
  const go = useGo();
  if (id === "food") {
    const slots = ["Tue 11:00 AM", "Tue 4:00 PM", "Thu 11:00 AM", "Thu 4:30 PM"];
    return (
      <div className="mt-5">
        <h2 className="headline">Pickup time slots</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {slots.map((slot) => (
            <Chip key={slot} onClick={() => app.toast("Slot noted", slot)}>{slot}</Chip>
          ))}
        </div>
      </div>
    );
  }
  if (id === "clothing") {
    return <div className="mt-5"><Button variant="secondary" onClick={() => onOpen("clothes")}>Request clothing</Button></div>;
  }
  if (id === "defense") {
    const cls = programs.find((p) => p.id === "pr-defense");
    return (
      <Card className="mt-5 p-4">
        <p className="headline">Next class</p>
        <p className="footnote mt-1 text-muted-foreground">{cls?.title} · Nov 12 · {cls?.time} · {cls?.seats} seats left</p>
        <div className="mt-3"><Button onClick={() => go("/programs/pr-defense")}>Register</Button></div>
      </Card>
    );
  }
  if (id === "therapy") {
    return (
      <div className="mt-5 space-y-2">
        <h2 className="headline">Therapists</h2>
        {specialists.filter((s) => s.role !== "Attorney").slice(0, 3).map((s) => (
          <button key={s.id} type="button" className="flex w-full items-center gap-3 rounded-2xl bg-card p-3 text-left shadow-card" onClick={() => go(`/lawyers/${s.id}`)}>
            <Photo name={s.photo} alt="" className="h-12 w-12 rounded-full" />
            <span>
              <span className="block font-semibold">{s.name}</span>
              <span className="footnote text-muted-foreground">{s.specialty} · {s.rating.toFixed(1)}★</span>
            </span>
          </button>
        ))}
      </div>
    );
  }
  if (id === "classes") {
    return <div className="mt-5"><Button variant="secondary" onClick={() => go("/programs")}>Open the calendar</Button></div>;
  }
  if (id === "jobs") {
    return <div className="mt-5"><Button variant="secondary" onClick={() => onOpen("job")}>Apply for program</Button></div>;
  }
  if (id === "finance") {
    const done = Object.values(app.modules).filter(Boolean).length;
    return (
      <div className="mt-5">
        <h2 className="headline">Course modules</h2>
        <p className="footnote mb-2 text-muted-foreground">{done} of {modules.length} complete · saved on this device</p>
        <div className="overflow-hidden rounded-2xl bg-card shadow-card">
          {modules.map((mod) => (
            <button key={mod.id} type="button" className="flex w-full items-start gap-3 border-b border-divider px-4 py-3 text-left last:border-0" onClick={() => app.toggleModule(mod.id)}>
              <span className={cn("mt-1 h-5 w-5 rounded-full border-2", app.modules[mod.id] ? "border-primary bg-primary" : "border-divider")} />
              <span>
                <span className="block font-semibold">{mod.title}</span>
                <span className="footnote text-muted-foreground">{mod.detail}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }
  if (id === "legal") {
    return <p className="mt-5 rounded-2xl bg-primary-50 p-3 text-[0.9375rem] leading-snug">Informational only. A conversation here is not a lawyer-client relationship until you engage that lawyer separately.</p>;
  }
  if (id === "safety") {
    return <div className="mt-5"><Button onClick={() => go("/safety-plan")}>Open safety plan</Button></div>;
  }
  return null;
}
