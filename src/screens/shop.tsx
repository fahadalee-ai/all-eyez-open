import { useMemo, useState } from "react";
import { Calendar, Check, Clock, MapPin, ShoppingBag } from "lucide-react";
import { ORG, programs, products, shopCategories, specialists, staff } from "@/data/content";
import { AppleMark, Button, Celebration, Chip, EmptyState, Photo, ProgressBar, SearchField, Segmented, Stars, SwipeRow, SwitchRow, TextArea, TextField } from "@/components/ios/ui";
import { Page } from "@/components/ios/shell";
import { money } from "@/lib/haptic";
import { useGo } from "@/lib/nav";
import { useApp, type OrderItem } from "@/lib/store";
import { cn } from "@/lib/utils";

function eventDate(date: string) {
  const day = new Date(`${date}T12:00:00`);
  return {
    month: day.toLocaleDateString("en-US", { month: "short" }),
    day: day.getDate(),
    long: day.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
    short: day.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
  };
}

function hostOf(id: string) {
  return [...specialists, ...staff].find((person) => person.id === id);
}

export function ProgramsScreen() {
  const go = useGo();
  return (
    <Page title="Programs" fallback="/more">
      <p className="text-[0.95rem] leading-snug text-muted-foreground">November classes and community events at the Auburn Avenue center. A nickname is enough to hold a seat.</p>
      <div className="mt-4 space-y-4">
        {programs.map((program) => {
          const when = eventDate(program.date);
          const host = hostOf(program.hostId);
          const filled = Math.round(((program.total - program.seats) / program.total) * 100);
          return (
            <button key={program.id} type="button" onClick={() => go(`/programs/${program.id}`)} className="block w-full overflow-hidden rounded-lg bg-card text-left shadow-card">
              <span className="relative block h-44">
                <Photo name={program.image} alt="" className="absolute inset-0 h-full w-full" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#231f20]/80 via-[#231f20]/10 to-transparent" />
                <span className="absolute left-3 top-3 flex min-w-12 flex-col items-center rounded-lg bg-white px-2.5 py-1.5 text-[#231f20]">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.08em]">{when.month}</span>
                  <span className="text-[1.2rem] font-bold leading-none">{when.day}</span>
                </span>
                <span className="absolute right-3 top-3 rounded-lg bg-white/92 px-2.5 py-1 text-[0.75rem] font-semibold text-[#231f20]">{program.price === 0 ? "Free" : money(program.price)}</span>
                <span className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                  <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/80">{program.format}</span>
                  <span className="mt-0.5 block text-[1.2rem] font-bold leading-tight">{program.title}</span>
                </span>
              </span>
              <span className="block px-4 py-3.5">
                <span className="block text-[0.95rem] leading-snug text-muted-foreground">{program.blurb}</span>
                <span className="mt-3 grid grid-cols-2 gap-2 text-[0.8125rem]">
                  <span className="flex items-center gap-1.5 font-semibold"><Clock size={14} className="text-link" aria-hidden />{program.time}</span>
                  <span className="flex items-center gap-1.5 font-semibold"><MapPin size={14} className="shrink-0 text-link" aria-hidden />{program.place}</span>
                </span>
                <span className="mt-3 block">
                  <span className="mb-1.5 flex justify-between text-[0.75rem] font-semibold">
                    <span>{host?.name}</span>
                    <span className="text-link">{program.seats} seats left</span>
                  </span>
                  <ProgressBar value={filled} label={`${program.seats} seats left`} />
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </Page>
  );
}

export function ProgramDetailScreen({ id }: { id: string }) {
  const program = programs.find((p) => p.id === id);
  const go = useGo();
  if (!program) return <Page title="Program"><EmptyState title="Not listed" body="That class isn’t on the calendar." action="All programs" onAction={() => go("/programs")} /></Page>;
  const when = eventDate(program.date);
  const host = hostOf(program.hostId);
  const filled = Math.round(((program.total - program.seats) / program.total) * 100);
  const others = programs.filter((item) => item.id !== program.id).slice(0, 3);
  return (
    <Page title={program.title} fallback="/programs" footer={<Button onClick={() => go(`/programs/${program.id}/register`)}>{program.price === 0 ? "Register · Free" : `Register · ${money(program.price)}`}</Button>}>
      <div className="relative h-60 overflow-hidden rounded-lg">
        <Photo name={program.image} alt="" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#231f20] via-[#231f20]/45 to-[#231f20]/15" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <p className="inline-flex rounded-lg bg-white/92 px-2.5 py-1 text-[0.75rem] font-semibold text-[#231f20]">{when.short} · {program.time}</p>
          <h2 className="mt-2 text-[1.65rem] font-bold leading-tight">{program.title}</h2>
          <p className="mt-1 text-[0.95rem] leading-snug text-white/95">{program.blurb}</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {([
          { icon: Calendar, label: "Date", value: when.long },
          { icon: Clock, label: "Time", value: `${program.time} – ${program.ends}` },
          { icon: MapPin, label: "Room", value: program.place },
          { icon: Check, label: "Admission", value: program.price === 0 ? "Free" : `${money(program.price)} materials` },
        ] as const).map((fact) => (
          <div key={fact.label} className="rounded-lg bg-card px-3 py-3 shadow-card">
            <p className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              <fact.icon size={13} className="text-link" aria-hidden /> {fact.label}
            </p>
            <p className="mt-1 text-[0.92rem] font-semibold leading-snug">{fact.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-3 rounded-lg bg-card p-4 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold">{program.seats} of {program.total} seats open</p>
          <p className="text-[0.8125rem] font-semibold text-link">{program.format}</p>
        </div>
        <div className="mt-2"><ProgressBar value={filled} label="Seats filled" /></div>
        <p className="mt-3 text-[0.95rem] leading-snug text-muted-foreground">{ORG.address}, {ORG.city}</p>
      </section>

      <section className="mt-4">
        <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">About this event</h2>
        <p className="mt-2 text-[1.02rem] leading-relaxed">{program.detail}</p>
      </section>

      <section className="mt-4 rounded-lg bg-primary-50 px-4 py-3.5">
        <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-link">Who it’s for</h2>
        <p className="mt-1.5 text-[1.02rem] leading-snug">{program.who}</p>
      </section>

      {host && (
        <button type="button" onClick={() => go(host.id.startsWith("sp-") ? `/lawyers/${host.id}` : "/team")} className="mt-4 flex w-full items-center gap-3 rounded-lg bg-card p-3 text-left shadow-card">
          <Photo name={host.photo} alt="" className="h-14 w-14 rounded-full" />
          <span className="min-w-0 flex-1">
            <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Host</span>
            <span className="block font-semibold">{host.name}</span>
            <span className="block text-[0.875rem] text-muted-foreground">{host.role}</span>
          </span>
          <span className="text-[0.8125rem] font-semibold text-link">Profile</span>
        </button>
      )}

      <section className="mt-4 rounded-lg bg-card p-4 shadow-card">
        <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Schedule</h2>
        <ol className="mt-3 space-y-3">
          {program.agenda.map((item, i) => (
            <li key={item.time} className="flex gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-[0.85rem] font-bold text-white">{i + 1}</span>
              <span>
                <span className="block text-[0.75rem] font-semibold text-link">{item.time}</span>
                <span className="block font-semibold leading-snug">{item.title}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-4 overflow-hidden rounded-lg bg-card shadow-card">
        <h2 className="px-4 pt-4 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">What to know</h2>
        <ul>
          {program.bring.map((item) => (
            <li key={item} className="flex items-center gap-3 px-4 py-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary-100 text-link"><Check size={15} strokeWidth={2.5} aria-hidden /></span>
              <span className="text-[1rem] leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-lg bg-card px-4 py-3.5 shadow-card">
        <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Questions</h2>
        <a className="mt-2 flex min-h-11 items-center font-semibold text-link" href={`tel:${ORG.phone.replace(/\D/g, "")}`}>{ORG.phone}</a>
        <p className="text-[0.875rem] text-muted-foreground">{ORG.email} · {ORG.hours}</p>
      </section>

      <h2 className="mt-6 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">More in November</h2>
      <div className="mt-2 space-y-2">
        {others.map((item) => {
          const day = eventDate(item.date);
          return (
            <button key={item.id} type="button" onClick={() => go(`/programs/${item.id}`)} className="flex w-full items-center gap-3 rounded-lg bg-card p-3 text-left shadow-card">
              <Photo name={item.image} alt="" className="h-14 w-14 rounded-lg" />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold">{item.title}</span>
                <span className="block text-[0.8125rem] text-muted-foreground">{day.short} · {item.time}</span>
              </span>
              <span className="text-[0.8125rem] font-semibold text-link">{item.price === 0 ? "Free" : money(item.price)}</span>
            </button>
          );
        })}
      </div>
    </Page>
  );
}

export function ProgramRegisterScreen({ id }: { id: string }) {
  const program = programs.find((p) => p.id === id);
  const app = useApp();
  const go = useGo();
  const [name, setName] = useState(app.user?.nickname ?? "");
  const [email, setEmail] = useState(app.user?.email ?? "");
  const [note, setNote] = useState("");
  const [mode, setMode] = useState(program?.modes[0] ?? "In person");
  const [care, setCare] = useState(false);
  const [paid, setPaid] = useState(false);
  if (!program) return <Page title="Register"><EmptyState title="Missing class" body="Go back to the calendar." action="All programs" onAction={() => go("/programs")} /></Page>;
  const when = eventDate(program.date);
  const finish = () => {
    const extra = [mode, care ? "Childcare requested" : "", note.trim()].filter(Boolean).join(" · ");
    app.registerProgram(program.id, name, email, extra || undefined);
    go(`/ticket/${program.id}`);
  };
  return (
    <Page
      title="Register"
      fallback={`/programs/${id}`}
      footer={<Button onClick={finish}>{program.price === 0 ? "Confirm · Free" : `Confirm · ${money(program.price)}`}</Button>}
    >
      <button type="button" onClick={() => go(`/programs/${program.id}`)} className="flex w-full items-center gap-3 rounded-lg bg-card p-3 text-left shadow-card">
        <Photo name={program.image} alt="" className="h-16 w-16 rounded-lg" />
        <span className="min-w-0 flex-1">
          <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Your event</span>
          <span className="block font-semibold leading-tight">{program.title}</span>
          <span className="mt-0.5 block text-[0.8125rem] text-muted-foreground">{when.short} · {program.time} – {program.ends}</span>
          <span className="block text-[0.8125rem] text-muted-foreground">{program.place} · {program.price === 0 ? "Free" : money(program.price)}</span>
        </span>
      </button>

      <h2 className="mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">How you’ll join</h2>
      <div className="mt-2 flex flex-wrap gap-2">
        {program.modes.map((item) => (
          <Chip key={item} selected={mode === item} onClick={() => setMode(item)}>{item}</Chip>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        <TextField label="Name or nickname" value={name} onChange={setName} />
        <TextField label="Email for the ticket" value={email} onChange={setEmail} hint="Saved on this device with your ticket." />
        <TextArea label="Anything we should prepare?" value={note} onChange={setNote} hint="A scholarship, a seat near the door, or nothing at all." />
      </div>

      {program.childcare && (
        <div className="mt-3 overflow-hidden rounded-lg bg-card shadow-card">
          <SwitchRow label="Request childcare" detail="We’ll hold a spot in the next room. No extra form." checked={care} onChange={setCare} />
        </div>
      )}

      {program.price > 0 && (
        <section className="mt-4 rounded-lg bg-card p-4 shadow-card">
          <p className="font-semibold">Materials fee {money(program.price)}</p>
          <p className="mt-1 text-[0.9rem] leading-snug text-muted-foreground">Preview only. Nothing is charged. Ask for a scholarship in the note above, or pay at the studio.</p>
          <button type="button" className="mt-3 flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-lg bg-black font-semibold text-white" onClick={() => setPaid(true)}>
            <AppleMark /> Pay with Apple Pay
          </button>
          <button type="button" className="mt-2 min-h-11 w-full font-semibold text-link" onClick={() => setPaid(true)}>Card preview</button>
          {paid && <p className="mt-2 rounded-lg bg-primary-50 px-3 py-2 text-[0.9rem] font-semibold text-link">Payment preview accepted. Confirm to finish.</p>}
        </section>
      )}
    </Page>
  );
}

export function TicketScreen({ id }: { id: string }) {
  const app = useApp();
  const go = useGo();
  const program = programs.find((p) => p.id === id);
  const reg = app.registrations.find((r) => r.programId === id);
  const when = program ? eventDate(program.date) : null;
  const host = program ? hostOf(program.hostId) : undefined;
  return (
    <Page
      title="You’re registered"
      back={false}
      footer={
        <div className="space-y-2">
          <Button onClick={() => go("/home")}>Back to home</Button>
          <Button variant="secondary" onClick={() => app.toast("Saved to this device")}>Save ticket</Button>
        </div>
      }
    >
      <Celebration image={program?.image || "gallery-workshop"} kicker="You’re registered" title={when?.short ?? "Ticket"} detail={program ? `${program.time} – ${program.ends} · ${program.place}` : ""}>
        <p className="mt-2 text-[1.15rem] font-bold leading-tight">{program?.title ?? "Class"}</p>
        <p className="mt-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Ticket code</p>
        <p className="mt-1 text-[1.35rem] font-bold tracking-[0.18em]">{reg?.code ?? "TK-PREVIEW"}</p>
        <Qr code={reg?.code ?? "AEO"} />
        {reg?.mode && <p className="mt-2 text-[0.85rem] text-muted-foreground">{reg.mode}</p>}
      </Celebration>
      <div className="mt-3 overflow-hidden rounded-lg bg-card shadow-card">
        {[
          ["When", when ? `${when.long}, ${program?.time} – ${program?.ends}` : ""],
          ["Where", `${program?.place ?? ""} · ${ORG.address}`],
          ["Host", host?.name ?? "All Eyez Open"],
          ["Arrive", "Ten minutes early. A nickname is enough at the door."],
        ].map(([label, value]) => (
          <p key={label} className="border-b border-divider px-4 py-3 last:border-0">
            <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{label}</span>
            <span className="mt-0.5 block text-[0.95rem] leading-snug">{value}</span>
          </p>
        ))}
      </div>
      <button type="button" className="mt-3 min-h-11 w-full font-semibold text-link" onClick={() => go("/programs")}>See other events</button>
    </Page>
  );
}

function Qr({ code }: { code: string }) {
  const cells = useMemo(() => code.split("").map((ch, i) => (ch.charCodeAt(0) + i) % 2 === 0), [code]);
  return (
    <div className="mx-auto mt-3 grid w-32 grid-cols-6 gap-0.5" aria-hidden>
      {Array.from({ length: 36 }, (_, i) => (
        <span key={i} className={`h-4 w-4 ${cells[i % cells.length] ? "bg-ink" : "bg-primary-100"}`} />
      ))}
    </div>
  );
}

export function ShopScreen() {
  const go = useGo();
  const app = useApp();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("Featured");
  let list = products.filter((p) => (cat === "All" || p.category === cat) && `${p.title} ${p.blurb}`.toLowerCase().includes(q.toLowerCase()));
  if (sort === "Price") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "Rating") list = [...list].sort((a, b) => b.rating - a.rating);
  const count = app.cart.reduce((n, line) => n + line.qty, 0);
  return (
    <Page title="Shop" fallback="/more">
      <div className="flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <SearchField value={q} onChange={setQ} placeholder="Search books, kits, merch" />
        </div>
        <button
          type="button"
          aria-label={count ? `Cart, ${count} items` : "Cart"}
          onClick={() => go("/cart")}
          className="relative grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-ink text-white"
        >
          <ShoppingBag size={18} aria-hidden />
          {count > 0 && (
            <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[0.65rem] font-bold leading-none text-white">
              {count}
            </span>
          )}
        </button>
      </div>
      <p className="mt-2 text-[0.8125rem] leading-snug text-muted-foreground">Plain packaging. Every purchase supports survivor programs.</p>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        <Chip selected={cat === "All"} onClick={() => setCat("All")}>All</Chip>
        {shopCategories.map((c) => <Chip key={c} selected={cat === c} onClick={() => setCat(c)}>{c}</Chip>)}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{list.length} {list.length === 1 ? "piece" : "pieces"}</p>
        <div className="flex rounded-lg bg-muted p-1" role="tablist" aria-label="Sort">
          {["Featured", "Price", "Rating"].map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={sort === id}
              onClick={() => setSort(id)}
              className={cn("min-h-8 rounded-lg px-2.5 text-[0.75rem] font-semibold", sort === id ? "bg-card text-foreground shadow-card" : "text-muted-foreground")}
            >
              {id}
            </button>
          ))}
        </div>
      </div>
      {list.length === 0 ? <EmptyState title="No products" body="Try another category." action="Reset" onAction={() => { setQ(""); setCat("All"); }} /> : (
        <div className="mt-4 grid grid-cols-2 gap-3 pb-4">
          {list.map((product) => (
            <button key={product.id} type="button" onClick={() => go(`/shop/${product.id}`)} className="overflow-hidden rounded-lg bg-card text-left shadow-card">
              <Photo name={product.image} alt="" className="h-36 w-full" />
              <span className="block p-3">
                <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{product.category}</span>
                <span className="mt-1 block line-clamp-2 text-[0.95rem] font-semibold leading-tight">{product.title}</span>
                <span className="mt-1.5 block text-[1rem] font-bold text-link">{money(product.price)}</span>
                <span className="block text-[0.75rem] text-muted-foreground">{product.rating.toFixed(1)} · {product.reviews} reviews</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </Page>
  );
}

export function ProductScreen({ id }: { id: string }) {
  const product = products.find((p) => p.id === id);
  const app = useApp();
  const go = useGo();
  const [size, setSize] = useState(product?.sizes[0] ?? "");
  const [color, setColor] = useState(product?.colors[0] ?? "Standard");
  const [qty, setQty] = useState(1);
  if (!product) return <Page title="Product"><EmptyState title="Sold out of view" body="That item isn’t in the shop." action="Shop" onAction={() => go("/shop")} /></Page>;
  const variant = [size, color].filter(Boolean).join(" · ");
  const related = [
    ...products.filter((item) => item.id !== product.id && item.category === product.category),
    ...products.filter((item) => item.id !== product.id && item.category !== product.category),
  ].slice(0, 4);
  const shopReviews = app.reviews.filter((r) => r.area === "Shop");
  const add = () => {
    const current = app.cart.find((line) => line.productId === product.id && line.variant === variant)?.qty ?? 0;
    app.addToCart(product.id, variant);
    if (qty > 1 || current > 0) app.setQty(product.id, variant, current + qty);
    go("/cart");
  };
  return (
    <Page title={product.title} footer={<Button onClick={add}>Add to cart · {money(product.price * qty)}</Button>}>
      <div className="relative h-64 overflow-hidden rounded-lg">
        <Photo name={product.image} alt={product.title} className="absolute inset-0 h-full w-full" />
      </div>
      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{product.category}</p>
          <p className="text-[1.7rem] font-bold leading-tight text-link">{money(product.price)}</p>
        </div>
        <div className="text-right">
          <Stars value={product.rating} />
          <p className="text-[0.75rem] text-muted-foreground">{product.reviews} reviews</p>
        </div>
      </div>
      <p className="mt-3 text-[1.05rem] leading-snug">{product.blurb}</p>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{product.detail}</p>
      <div className="mt-4 overflow-hidden rounded-lg bg-card shadow-card">
        {[
          ["Proceeds", "Supports survivor programs"],
          ["Packaging", "Plain box. No organization name."],
          ["Pickup", "Auburn Avenue office, weekdays"],
        ].map(([label, value]) => (
          <p key={label} className="flex justify-between gap-3 border-b border-divider px-4 py-3 last:border-0">
            <span className="text-muted-foreground">{label}</span>
            <span className="text-right font-semibold">{value}</span>
          </p>
        ))}
      </div>
      {product.sizes.length > 0 && (
        <div className="mt-5">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Size</p>
          <div className="mt-2 grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(product.sizes.length, 3)}, minmax(0, 1fr))` }}>
            {product.sizes.map((option) => (
              <button key={option} type="button" onClick={() => setSize(option)} className={cn("min-h-11 rounded-lg border text-[0.875rem] font-semibold", size === option ? "border-primary bg-primary text-white" : "border-divider bg-card")}>{option}</button>
            ))}
          </div>
        </div>
      )}
      {product.colors.length > 0 && (
        <div className="mt-4">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Color</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.colors.map((option) => (
              <button key={option} type="button" onClick={() => setColor(option)} className={cn("min-h-11 rounded-lg border px-3 text-[0.875rem] font-semibold", color === option ? "border-primary bg-primary text-white" : "border-divider bg-card")}>{option}</button>
            ))}
          </div>
        </div>
      )}
      <div className="mt-5 flex items-center justify-between rounded-lg bg-card px-4 py-3 shadow-card">
        <span className="font-semibold">Quantity</span>
        <span className="flex items-center gap-3">
          <button type="button" className="grid h-11 w-11 place-items-center rounded-lg bg-muted text-[1.25rem]" onClick={() => setQty((n) => Math.max(1, n - 1))} aria-label="Decrease quantity">−</button>
          <span className="min-w-6 text-center text-[1.05rem] font-semibold">{qty}</span>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-lg bg-muted text-[1.25rem]" onClick={() => setQty((n) => n + 1)} aria-label="Increase quantity">+</button>
        </span>
      </div>
      <h2 className="mt-6 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Reviews</h2>
      <div className="mt-2 space-y-2">
        {shopReviews.map((review) => (
          <article key={review.id} className="rounded-lg bg-card p-4 shadow-card">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold">{review.name}</p>
              <Stars value={review.stars} />
            </div>
            <p className="mt-1 text-[0.95rem] font-semibold">{review.title}</p>
            <p className="mt-1 text-[0.9rem] leading-snug text-muted-foreground">{review.text}</p>
            <p className="mt-2 text-[0.75rem] text-muted-foreground">{review.date}{review.verified ? " · Verified purchase" : ""}</p>
          </article>
        ))}
      </div>
      <h2 className="mt-6 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Related products</h2>
      <div className="-mx-4 mt-2 flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar">
        {related.map((item) => (
          <button key={item.id} type="button" onClick={() => go(`/shop/${item.id}`)} className="w-36 shrink-0 overflow-hidden rounded-lg bg-card text-left shadow-card">
            <Photo name={item.image} alt="" className="h-24 w-full" />
            <span className="block p-2.5">
              <span className="block line-clamp-2 text-[0.85rem] font-semibold leading-tight">{item.title}</span>
              <span className="mt-1 block text-[0.9rem] font-bold text-link">{money(item.price)}</span>
            </span>
          </button>
        ))}
      </div>
    </Page>
  );
}

export function CartScreen() {
  const app = useApp();
  const go = useGo();
  const [code, setCode] = useState("");
  const lines = app.cart.map((line) => ({ ...line, product: products.find((p) => p.id === line.productId) })).filter((l) => l.product);
  const sub = lines.reduce((sum, l) => sum + l.product!.price * l.qty, 0);
  const discount = app.promo ? sub * 0.1 : 0;
  if (lines.length === 0) return <Page title="Cart" large><EmptyState title="Your cart is empty" body="Books, kits, and discreet merch send their proceeds to survivor programs." action="Browse the shop" onAction={() => go("/shop")} /></Page>;
  return (
    <Page title="Cart" footer={<Button onClick={() => go("/checkout")}>Checkout · {money(sub - discount)}</Button>}>
      <div className="space-y-2">
        {lines.map((line) => (
          <SwipeRow key={line.productId + line.variant} onDelete={() => app.setQty(line.productId, line.variant, 0)}>
            <div className="flex items-center gap-3 rounded-lg bg-card p-3 shadow-card">
              <Photo name={line.product!.image} alt="" className="h-16 w-16 rounded-lg" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold leading-tight">{line.product!.title}</p>
                <p className="text-[0.8125rem] text-muted-foreground">{line.variant}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button type="button" className="grid h-9 w-9 place-items-center rounded-lg bg-muted" onClick={() => app.setQty(line.productId, line.variant, line.qty - 1)} aria-label="Decrease">−</button>
                  <span className="min-w-4 text-center font-semibold">{line.qty}</span>
                  <button type="button" className="grid h-9 w-9 place-items-center rounded-lg bg-muted" onClick={() => app.setQty(line.productId, line.variant, line.qty + 1)} aria-label="Increase">+</button>
                </div>
              </div>
              <p className="font-bold text-link">{money(line.product!.price * line.qty)}</p>
            </div>
          </SwipeRow>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input className="min-h-11 flex-1 rounded-lg border border-divider bg-card px-3" placeholder="Promo code" value={code} onChange={(e) => setCode(e.target.value)} aria-label="Promo code" />
        <button type="button" className="min-h-11 rounded-lg bg-primary px-4 font-semibold text-white" onClick={() => app.applyPromo(code)}>Apply</button>
      </div>
      <div className="mt-4 overflow-hidden rounded-lg bg-card shadow-card">
        <p className="flex justify-between border-b border-divider px-4 py-3"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">{money(sub)}</span></p>
        <p className="flex justify-between border-b border-divider px-4 py-3"><span className="text-muted-foreground">Promo</span><span className="font-semibold">{app.promo ? `−${money(discount)}` : "—"}</span></p>
        <p className="flex justify-between px-4 py-3"><span className="font-semibold">Total</span><span className="text-[1.15rem] font-bold text-link">{money(sub - discount)}</span></p>
      </div>
      <p className="mt-2 text-[0.8125rem] text-muted-foreground">Swipe an item left to remove it. WELCOME10 takes 10% off.</p>
    </Page>
  );
}

export function CheckoutScreen() {
  const app = useApp();
  const go = useGo();
  const [name, setName] = useState(app.user?.nickname ?? "");
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("Atlanta, GA");
  const [safe, setSafe] = useState(true);
  const [discreet, setDiscreet] = useState(true);
  const [method, setMethod] = useState("Ship");
  const lines = app.cart.map((line) => ({ ...line, product: products.find((p) => p.id === line.productId) })).filter((l) => l.product);
  const sub = lines.reduce((sum, l) => sum + (l.product?.price ?? 0) * l.qty, 0);
  const total = app.promo ? sub * 0.9 : sub;
  return (
    <Page title="Checkout" fallback="/cart" footer={<Button onClick={() => place("Card")}>Place order · {money(total)}</Button>}>
      <p className="mb-3 text-[0.95rem] leading-snug text-muted-foreground">Preview only. Nothing is charged. Packaging stays plain unless you turn that off.</p>
      <div className="space-y-2">
        {lines.map((line) => (
          <div key={line.productId + line.variant} className="flex items-center gap-3 rounded-lg bg-card p-3 shadow-card">
            <Photo name={line.product!.image} alt="" className="h-12 w-12 rounded-lg" />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold">{line.product!.title}</span>
              <span className="text-[0.8125rem] text-muted-foreground">Qty {line.qty} · {line.variant}</span>
            </span>
            <span className="font-semibold">{money(line.product!.price * line.qty)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        <TextField label="Name on the delivery" value={name} onChange={setName} />
        <TextField label={safe ? "PO Box or safe address" : "Street address"} value={line1} onChange={setLine1} placeholder="PO Box or a safe address" />
        <TextField label="City and ZIP" value={city} onChange={setCity} />
        <div className="overflow-hidden rounded-lg bg-card shadow-card">
          <SwitchRow label="Safe address or PO Box" detail="Leave out a home address if that is safer." checked={safe} onChange={setSafe} />
          <SwitchRow label="Discreet packaging" detail="Plain box. No organization name on the outside." checked={discreet} onChange={setDiscreet} />
        </div>
        <Segmented label="How to receive it" value={method} onChange={setMethod} options={[{ id: "Ship", label: "Delivery" }, { id: "Pickup", label: "Office pickup" }]} />
        <button type="button" className="flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-lg bg-black font-semibold text-white" onClick={() => place("Apple Pay")}><AppleMark /> Apple Pay</button>
      </div>
    </Page>
  );

  function place(pay: string) {
    const items: OrderItem[] = lines.map((l) => ({ productId: l.productId, title: l.product!.title, qty: l.qty, price: l.product!.price, variant: l.variant }));
    const order = app.placeOrder({ address: `${line1 || "Safe address on file"}, ${city}`, discreet, items, total });
    app.toast(pay === "Apple Pay" ? "Apple Pay preview accepted" : "Card preview accepted");
    go(`/order-confirmed/${order.id}`);
  }
}

export function OrderConfirmedScreen({ id }: { id: string }) {
  const go = useGo();
  const order = useApp().orders.find((o) => o.id === id);
  return (
    <Page title="Order confirmed" back={false} footer={<Button onClick={() => go(`/orders/${id}`)}>View order</Button>}>
      <Celebration image={products.find((p) => p.id === order?.items[0]?.productId)?.image || "product-books"} kicker="Order placed" title={order ? money(order.total) : "Confirmed"} detail={order?.discreet ? "It will ship in a plain package." : "We’ll pack this shortly."}>
        <p className="mt-3 text-[0.8rem] font-semibold tracking-[0.16em] text-link">{order?.id ?? id}</p>
      </Celebration>
      {order && (
        <div className="mt-3 overflow-hidden rounded-lg bg-card shadow-card">
          {order.items.map((item) => (
            <p key={item.productId + item.variant} className="flex justify-between gap-3 border-b border-divider px-4 py-3 last:border-0">
              <span>{item.title} · {item.qty}</span>
              <span className="font-semibold">{money(item.price * item.qty)}</span>
            </p>
          ))}
        </div>
      )}
    </Page>
  );
}

const steps = ["Placed", "Packed", "Shipped", "Delivered"];

export function OrdersScreen() {
  const app = useApp();
  const go = useGo();
  const list = app.myOrders;
  if (!app.user && !app.guest) return <Page title="Orders"><EmptyState title="Sign in to see orders" body="Guest checkout still saves an order on this device after you buy." action="Log in" onAction={() => go("/welcome")} /></Page>;
  if (list.length === 0) return <Page title="My orders" large><EmptyState title="No orders yet" body="When you buy from the shop, tracking appears here." action="Shop" onAction={() => go("/shop")} /></Page>;
  return (
    <Page title="My orders" fallback="/more">
      <div className="space-y-2">
        {list.map((order) => {
          const cover = products.find((p) => p.id === order.items[0]?.productId);
          return (
            <button key={order.id} type="button" onClick={() => go(`/orders/${order.id}`)} className="flex w-full items-center gap-3 rounded-lg bg-card p-3 text-left shadow-card">
              <Photo name={cover?.image} alt="" className="h-14 w-14 rounded-lg" />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2"><span className="font-semibold">{order.id}</span><span className="font-bold text-link">{money(order.total)}</span></span>
                <span className="mt-0.5 block truncate text-[0.8125rem] text-muted-foreground">{order.items.map((item) => item.title).join(", ")}</span>
                <span className="mt-0.5 block text-[0.75rem] font-semibold text-link">{order.status} · {order.placed}</span>
              </span>
            </button>
          );
        })}
      </div>
    </Page>
  );
}

export function OrderDetailScreen({ id }: { id: string }) {
  const app = useApp();
  const go = useGo();
  const order = app.orders.find((o) => o.id === id);
  if (!order) return <Page title="Order"><EmptyState title="Order not found" body="It may be on another device." /></Page>;
  return (
    <Page
      title={order.id}
      footer={
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={() => { app.reorder(order.id); go("/cart"); }}>Reorder</Button>
          <Button onClick={() => go("/shop")}>Shop</Button>
        </div>
      }
    >
      <div className="grid grid-cols-4 gap-2">
        {steps.map((step) => {
          const on = order.timeline.includes(step);
          return (
            <div key={step} className="text-center">
              <span className={cn("mx-auto block h-1.5 rounded-lg", on ? "bg-primary" : "bg-divider")} />
              <span className={cn("mt-1 block text-[0.7rem] font-semibold", on ? "text-link" : "text-muted-foreground")}>{step}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 space-y-2">
        {order.items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return (
            <button key={item.productId + item.variant} type="button" onClick={() => product && go(`/shop/${product.id}`)} className="flex w-full items-center gap-3 rounded-lg bg-card p-3 text-left shadow-card">
              <Photo name={product?.image} alt="" className="h-14 w-14 rounded-lg" />
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{item.title}</span>
                <span className="text-[0.8125rem] text-muted-foreground">Qty {item.qty} · {item.variant}</span>
              </span>
              <span className="font-semibold">{money(item.price * item.qty)}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 rounded-lg bg-card p-4 shadow-card">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Delivery</p>
        <p className="mt-1 text-[0.95rem] leading-snug">{order.address}</p>
        <p className="mt-1 text-[0.875rem] text-muted-foreground">{order.discreet ? "Plain packaging" : "Standard mailer"} · {order.placed}</p>
        <p className="mt-3 text-[1.35rem] font-bold text-link">{money(order.total)}</p>
      </div>
      {order.status === "Delivered" && <button type="button" className="mt-3 min-h-11 font-semibold text-link" onClick={() => go(`/orders/${order.id}/return`)}>Request a return</button>}
    </Page>
  );
}

export function ReturnScreen({ id }: { id: string }) {
  const app = useApp();
  const go = useGo();
  const [reason, setReason] = useState("Changed my mind");
  const [done, setDone] = useState(false);
  if (done) return <Page title="Return requested" back={false} footer={<Button onClick={() => go("/orders")}>Back to orders</Button>}><Celebration image="product-kit" kicker="Return" title="Request received" detail="We’ll email a plain return label. You’ll see an update when it is ready." /></Page>;
  return (
    <Page title="Return request" footer={<Button onClick={() => { app.requestReturn(id, reason); setDone(true); }}>Submit return</Button>}>
      <p className="mb-3 text-[0.95rem] leading-snug text-muted-foreground">We’ll send a plain return label. You don’t need to explain more than the reason.</p>
      <div className="grid grid-cols-2 gap-2">
        {["Changed my mind", "Wrong size", "Not as expected", "Other"].map((item) => (
          <button key={item} type="button" onClick={() => setReason(item)} className={cn("min-h-12 rounded-lg border px-3 text-[0.9rem] font-semibold", reason === item ? "border-primary bg-primary text-white" : "border-divider bg-card")}>{item}</button>
        ))}
      </div>
    </Page>
  );
}
