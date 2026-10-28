import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { causes, impactLine, ORG, supporters } from "@/data/content";
import { AppleMark, Button, Card, Celebration, Chip, EmptyState, Photo, ProgressBar, Segmented, SwitchRow, TextField } from "@/components/ios/ui";
import { Page } from "@/components/ios/shell";
import { isEmail, money } from "@/lib/haptic";
import { useGo } from "@/lib/nav";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

const amounts = [10, 25, 50, 100, 250];

export function DonateScreen() {
  const app = useApp();
  const go = useGo();
  const d = app.donate;
  const [customOn, setCustomOn] = useState(d.custom !== "");
  const pct = Math.round((ORG.raised / ORG.goal) * 100);
  return (
    <Page
      title="Donate"
      fallback="/home"
      footer={<Button onClick={() => go("/donate/details")}>Continue · {money(d.amount)}</Button>}
    >
      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Step 1 of 4</p>
      <div className="relative mt-3 h-36 overflow-hidden rounded-lg">
        <Photo name="hero-hands" alt="" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#231f20]/85 via-[#231f20]/25 to-transparent" />
        <p className="absolute inset-x-0 bottom-0 p-3.5 text-[0.95rem] leading-snug text-white">Gifts stay with the fund you choose. A receipt is saved on this device.</p>
      </div>
      <div className="mt-4 rounded-lg bg-card p-4 shadow-card">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <p className="text-[0.95rem] font-semibold">Monthly care goal</p>
          <p className="text-[0.8125rem] font-semibold text-link">{pct}%</p>
        </div>
        <ProgressBar value={pct} label="Monthly goal" />
        <p className="mt-2 text-[0.8125rem] text-muted-foreground">{money(ORG.raised)} of {money(ORG.goal)}</p>
      </div>
      <h2 className="mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Choose a fund</h2>
      <div className="mt-2 space-y-2">
        {causes.map((cause) => {
          const on = d.fund === cause.id;
          return (
            <button
              key={cause.id}
              type="button"
              aria-pressed={on}
              onClick={() => app.patchDonate({ fund: cause.id })}
              className={cn("flex w-full items-center gap-3 rounded-lg bg-card p-3 text-left shadow-card", on && "ring-2 ring-primary")}
            >
              <Photo name={cause.image} alt="" className="h-14 w-14 rounded-lg" />
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{cause.title}</span>
                <span className="footnote text-muted-foreground">{cause.text}</span>
              </span>
              {on && <Check className="shrink-0 text-primary" size={18} aria-hidden />}
            </button>
          );
        })}
      </div>
      <h2 className="mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">How often</h2>
      <div className="mt-2">
        <Segmented label="Frequency" value={d.frequency} onChange={(frequency) => app.patchDonate({ frequency: frequency as "One-time" | "Monthly" })} options={[{ id: "One-time", label: "One-time" }, { id: "Monthly", label: "Monthly" }]} />
      </div>
      <h2 className="mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Amount</h2>
      <div className="mt-2 flex flex-wrap gap-2">
        {amounts.map((amount) => (
          <Chip key={amount} selected={d.amount === amount && !customOn} onClick={() => { setCustomOn(false); app.patchDonate({ amount, custom: "" }); }}>{money(amount)}</Chip>
        ))}
        <Chip selected={customOn} onClick={() => setCustomOn(true)}>Custom</Chip>
      </div>
      {customOn && (
        <div className="mt-3">
          <TextField label="Custom amount" value={d.custom} onChange={(custom) => app.patchDonate({ custom, amount: Number(custom) || 0 })} placeholder="0" />
        </div>
      )}
      <p className="mt-3 text-[0.95rem] leading-snug text-muted-foreground">{impactLine(d.amount)}</p>
    </Page>
  );
}

export function DonorDetailsScreen() {
  const app = useApp();
  const go = useGo();
  const d = app.donate;
  useEffect(() => {
    const name = app.donate.name || app.user?.nickname || "";
    const email = app.donate.email || app.user?.email || "";
    if (name !== app.donate.name || email !== app.donate.email) app.patchDonate({ name, email });
    // Prefill once from the signed-in profile. Later edits stay as typed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Page title="Donor details" fallback="/donate" footer={<Button onClick={() => go("/donate/pay")}>Continue to payment</Button>}>
      <p className="mb-4 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Step 2 of 4 · {money(d.amount)} {d.frequency.toLowerCase()}</p>
      <div className="space-y-4">
        <TextField label="Name" value={d.name} onChange={(name) => app.patchDonate({ name })} />
        <TextField label="Email" value={d.email} onChange={(email) => app.patchDonate({ email })} hint="Used only for the receipt on this device." />
        <TextField label="Dedicate this gift" value={d.honor} onChange={(honor) => app.patchDonate({ honor })} hint="In honor or in memory. Optional." />
        <div className="overflow-hidden rounded-lg bg-card shadow-card">
          <SwitchRow label="Give anonymously" checked={d.anonymous} onChange={(anonymous) => app.patchDonate({ anonymous })} />
          <SwitchRow label="Cover processing (3%)" detail="So the full gift reaches the fund." checked={d.coverFees} onChange={(coverFees) => app.patchDonate({ coverFees })} />
        </div>
      </div>
    </Page>
  );
}

export function DonatePayScreen() {
  const app = useApp();
  const go = useGo();
  const d = app.donate;
  return (
    <Page
      title="Payment"
      fallback="/donate/details"
      footer={<Button onClick={() => { app.patchDonate({ method: "card" }); go("/donate/review"); }}>Review gift</Button>}
    >
      <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Step 3 of 4</p>
      <p className="mb-4 rounded-lg bg-primary-50 p-3 text-[0.9375rem] leading-snug">Preview only. This does not charge a real card.</p>
      <button type="button" className="flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-lg bg-black font-semibold text-white" onClick={() => { app.patchDonate({ method: "apple" }); go("/donate/review"); }}>
        <AppleMark /> Pay with Apple Pay
      </button>
      <p className="my-3 text-center text-[0.8125rem] text-muted-foreground">or card</p>
      <div className="space-y-3">
        <TextField label="Card number" value={d.card} onChange={(card) => app.patchDonate({ card, method: "card" })} placeholder="4242 4242 4242 4242" />
        <div className="grid grid-cols-2 gap-2">
          <TextField label="Expiry" value={d.exp} onChange={(exp) => app.patchDonate({ exp })} placeholder="MM/YY" />
          <TextField label="CVC" value={d.cvc} onChange={(cvc) => app.patchDonate({ cvc })} placeholder="123" />
        </div>
        <TextField label="Billing ZIP" value={d.zip} onChange={(zip) => app.patchDonate({ zip })} placeholder="30303" />
        <div className="overflow-hidden rounded-lg bg-card shadow-card">
          <SwitchRow label="Receipt by email" checked={d.receipt} onChange={(receipt) => app.patchDonate({ receipt })} />
        </div>
      </div>
    </Page>
  );
}

export function DonateReviewScreen() {
  const app = useApp();
  const go = useGo();
  const d = app.donate;
  const fee = d.coverFees ? Math.round(d.amount * 0.03 * 100) / 100 : 0;
  const fund = causes.find((c) => c.id === d.fund);
  return (
    <Page title="Review gift" fallback="/donate/pay" footer={<Button onClick={() => { app.confirmDonation(); go("/donate/thanks"); }}>Give {money(d.amount + fee)}</Button>}>
      <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Step 4 of 4</p>
      <Card className="divide-y divide-divider">
        {[
          ["Amount", money(d.amount)],
          ["Frequency", d.frequency],
          ["Fund", fund?.title ?? ""],
          ["Fees covered", money(fee)],
          ["Total", money(d.amount + fee)],
          ["Method", d.method === "apple" ? "Apple Pay" : "Card"],
          ["Receipt", d.anonymous ? "Anonymous" : d.name || "On this device"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 px-4 py-3"><span className="text-muted-foreground">{k}</span><span className="text-right font-semibold">{v}</span></div>
        ))}
      </Card>
      <p className="mt-3 text-[0.8125rem] leading-snug text-muted-foreground">Preview gift. Nothing is charged. Keep the receipt on this device or ask a tax advisor about a deduction.</p>
    </Page>
  );
}

export function DonateThanksScreen() {
  const app = useApp();
  const go = useGo();
  const gift = app.donations.find((d) => d.id === app.lastDonationId);
  const fund = causes.find((c) => c.id === gift?.fund);
  return (
    <Page title="Thank you" back={false} footer={<Button onClick={() => go("/home")}>Done</Button>}>
      <Celebration image={fund?.image || "hero-hands"} kicker="Gift recorded" title={gift ? money(gift.total) : "Thank you"} detail={impactLine(gift?.amount ?? 25)}>
        <p className="mt-3 text-[0.8rem] font-semibold tracking-[0.16em] text-link">{gift?.id ?? "RECEIPT"}</p>
        <p className="mt-1 text-[0.8125rem] text-muted-foreground">{fund?.title ?? "Where needed most"} · {gift?.frequency ?? "One-time"} · Saved on this device</p>
      </Celebration>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button type="button" className="min-h-16 rounded-lg bg-card px-3 text-center shadow-card" onClick={() => app.toast("Receipt saved on this device")}>
          <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Receipt</span>
          <span className="mt-0.5 block font-semibold text-link">Download</span>
        </button>
        <button type="button" className="min-h-16 rounded-lg bg-card px-3 text-center shadow-card" onClick={() => app.toast("Impact card copied")}>
          <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Share</span>
          <span className="mt-0.5 block font-semibold text-link">Impact card</span>
        </button>
      </div>
      {gift?.frequency !== "Monthly" && (
        <button type="button" className="mt-3 w-full rounded-lg bg-primary-50 px-4 py-3 text-left" onClick={() => { app.patchDonate({ frequency: "Monthly" }); go("/donate"); }}>
          <span className="block font-semibold">Become a monthly donor</span>
          <span className="mt-0.5 block text-[0.85rem] text-muted-foreground">The same gift, once a month. You can stop it anytime.</span>
        </button>
      )}
    </Page>
  );
}

export function DonationsScreen() {
  const app = useApp();
  const go = useGo();
  const rows = app.myDonations.length ? app.myDonations : app.guest ? [] : app.donations.filter((d) => d.userId === "u-ariel" && app.user?.id === "u-ariel");
  const list = app.user || app.guest ? app.myDonations : [];
  return (
    <Page title="Donation history" large fallback="/more">
      {list.length === 0 ? <EmptyState title="No gifts yet" body="When you give, receipts stay in this list." action="Donate" onAction={() => go("/donate")} /> : (
        <div className="space-y-2">
          {list.map((d) => (
            <Card key={d.id} className="p-4" onClick={() => d.recurring && go(`/donate/recurring/${d.id}`)}>
              <div className="flex justify-between"><p className="headline">{money(d.total)}</p><p className="footnote text-muted-foreground">{d.date}</p></div>
              <p className="footnote text-muted-foreground">{causes.find((c) => c.id === d.fund)?.title} · {d.frequency}</p>
              <p className="footnote mt-1 font-semibold text-link">{d.status}</p>
            </Card>
          ))}
        </div>
      )}
      <div className="mt-4"><Button variant="secondary" onClick={() => go("/supporters")}>Supporters wall</Button></div>
    </Page>
  );
}

export function RecurringScreen({ id }: { id: string }) {
  const app = useApp();
  const gift = app.donations.find((d) => d.id === id);
  const [open, setOpen] = useState(false);
  if (!gift) return <Page title="Monthly gift"><EmptyState title="Not found" body="That gift isn’t on this device." /></Page>;
  return (
    <Page title="Monthly gift">
      <Card className="p-4">
        <p className="title-2">{money(gift.amount)}</p>
        <p className="footnote text-muted-foreground">{causes.find((c) => c.id === gift.fund)?.title} · {gift.status}</p>
      </Card>
      <div className="mt-4 space-y-2">
        <Button variant="secondary" onClick={() => app.toast("Receipt saved on this device")}>Download receipt</Button>
        {gift.recurring && <Button variant="danger" onClick={() => setOpen(true)}>Stop monthly gift</Button>}
      </div>
      {open && (
        <div className="mt-3">
          <Button onClick={() => { app.cancelRecurring(gift.id); setOpen(false); }}>Confirm stop</Button>
        </div>
      )}
    </Page>
  );
}

export function SupportersScreen() {
  return (
    <Page title="Supporters" large>
      <p className="body-text text-muted-foreground">Names appear only when a donor opts in. Anonymous gifts are counted, not named.</p>
      <div className="mt-4 space-y-2">
        {supporters.map((s) => (
          <Card key={s.name + s.amount} className="flex items-center justify-between p-4">
            <span><span className="block font-semibold">{s.name}</span><span className="footnote text-muted-foreground">{s.note}</span></span>
            <span className="font-semibold text-link">{s.amount}</span>
          </Card>
        ))}
      </div>
    </Page>
  );
}

export function VolunteerScreen() {
  const app = useApp();
  const go = useGo();
  const [name, setName] = useState(app.user?.nickname ?? "");
  const [email, setEmail] = useState(app.user?.email ?? "");
  const [interest, setInterest] = useState("Pantry");
  const [done, setDone] = useState(false);
  if (done) return <Page title="Thank you" back={false} footer={<Button onClick={() => go("/home")}>Done</Button>}><Celebration image="gallery-drive" kicker="Volunteer" title="You’re on the list" detail="Andre’s team will reply with a shift that fits. You’ll see an update when they do." /></Page>;
  return (
    <Page title="Volunteer" large>
      <p className="body-text text-muted-foreground">Shifts include the pantry, clothing closet, walks, and office hosting. Training is provided.</p>
      <div className="mt-4 space-y-3">
        <TextField label="Name" value={name} onChange={setName} />
        <TextField label="Email" value={email} onChange={setEmail} />
        <div className="flex flex-wrap gap-2">{["Pantry", "Closet", "Walks", "Office"].map((item) => <Chip key={item} selected={interest === item} onClick={() => setInterest(item)}>{item}</Chip>)}</div>
        <Button onClick={() => name && isEmail(email) ? setDone(true) : app.toast("Add your name and email")}>Sign up</Button>
      </div>
    </Page>
  );
}

export function SponsorScreen() {
  const app = useApp();
  const go = useGo();
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);
  if (done) return <Page title="Inquiry sent" back={false} footer={<Button onClick={() => go("/home")}>Done</Button>}><Celebration image="gallery-ceremony" kicker="Sponsorship" title="Inquiry sent" detail="Miles on donor relations will follow up with a one-page proposal." /></Page>;
  return (
    <Page title="Corporate sponsorship" large>
      <p className="body-text text-muted-foreground">Sponsor a class series, a pantry month, or the housing fund. We’ll reply with a simple one-page proposal.</p>
      <div className="mt-4 space-y-3">
        <TextField label="Organization" value={org} onChange={setOrg} />
        <TextField label="Work email" value={email} onChange={setEmail} />
        <TextField label="What are you hoping to support?" value={note} onChange={setNote} />
        <Button onClick={() => (org && isEmail(email) ? setDone(true) : app.toast("Add the organization and email"))}>Send inquiry</Button>
      </div>
    </Page>
  );
}
