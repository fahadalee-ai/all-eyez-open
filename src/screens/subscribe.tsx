import { useEffect, useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { subscriptionPlans } from "@/data/content";
import { AppleMark, Badge, Button, Card, Celebration, EmptyState, Photo, TextField } from "@/components/ios/ui";
import { Page } from "@/components/ios/shell";
import { money } from "@/lib/haptic";
import { useGo } from "@/lib/nav";
import { useApp } from "@/lib/store";

function planOf(id: string) {
  return subscriptionPlans.find((p) => p.id === id);
}

export function SubscribeListScreen() {
  const go = useGo();
  return (
    <Page title="Subscriptions" fallback="/more">
      <div className="relative h-36 overflow-hidden rounded-lg">
        <Photo name="hero-hands" alt="" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#231f20]/85 via-[#231f20]/25 to-transparent" />
        <p className="absolute inset-x-0 bottom-0 p-3.5 text-[0.95rem] leading-snug text-white">A monthly gift, the same amount each month. Cancel anytime. This preview does not charge a card.</p>
      </div>
      <div className="mt-4 space-y-2">
        {subscriptionPlans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => go(`/subscribe/${plan.id}`)}
            className="flex w-full items-center gap-3 rounded-lg bg-card p-3 text-left shadow-card"
          >
            <Photo name={plan.image} alt="" className="h-16 w-16 rounded-lg" />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">{plan.title}</span>
              <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted-foreground">{plan.blurb}</span>
              <span className="mt-1 block text-[0.9375rem] font-semibold text-link">{money(plan.price)} / month</span>
            </span>
            <ChevronRight className="shrink-0 text-muted-foreground" size={18} aria-hidden />
          </button>
        ))}
      </div>
      <button type="button" className="mt-4 w-full rounded-lg bg-primary-50 px-4 py-3 text-left" onClick={() => go("/subscriptions")}>
        <span className="block font-semibold">My subscriptions</span>
        <span className="mt-0.5 block text-[0.8125rem] text-muted-foreground">Pause, cancel, or open a receipt.</span>
      </button>
    </Page>
  );
}

export function SubscribePlanScreen({ id }: { id: string }) {
  const go = useGo();
  const app = useApp();
  const plan = planOf(id);
  if (!plan) {
    return (
      <Page title="Plan" fallback="/subscribe">
        <EmptyState title="Plan unavailable" body="Choose another monthly gift." action="See plans" onAction={() => go("/subscribe")} />
      </Page>
    );
  }
  return (
    <Page
      title={plan.title}
      fallback="/subscribe"
      footer={<Button onClick={() => { app.patchSubscribe({ planId: plan.id }); go(`/subscribe/${plan.id}/details`); }}>Subscribe · {money(plan.price)} / month</Button>}
    >
      <div className="relative h-44 overflow-hidden rounded-lg">
        <Photo name={plan.image} alt="" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#231f20]/80 to-transparent" />
        <p className="absolute inset-x-0 bottom-0 p-3.5 text-[1.35rem] font-bold text-white">{money(plan.price)}<span className="text-[0.95rem] font-semibold"> / month</span></p>
      </div>
      <p className="mt-4 text-[1.05rem] leading-snug">{plan.detail}</p>
      <h2 className="mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Who it is for</h2>
      <p className="mt-2 text-[0.95rem] leading-snug text-muted-foreground">{plan.who}</p>
      <h2 className="mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Each month</h2>
      <ul className="mt-2 space-y-2">
        {plan.includes.map((item) => (
          <li key={item} className="flex items-start gap-2 rounded-lg bg-card px-3 py-3 shadow-card">
            <Check className="mt-0.5 shrink-0 text-primary" size={18} aria-hidden />
            <span className="text-[0.95rem] leading-snug">{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[0.8125rem] leading-snug text-muted-foreground">Renews on the same day each month. You can pause or cancel from My subscriptions. Nothing is charged in this preview.</p>
    </Page>
  );
}

export function SubscribeDetailsScreen({ id }: { id: string }) {
  const app = useApp();
  const go = useGo();
  const plan = planOf(id);
  const d = app.subscribe;
  useEffect(() => {
    const name = app.subscribe.name || app.user?.nickname || "";
    const email = app.subscribe.email || app.user?.email || "";
    if (app.subscribe.planId !== id || name !== app.subscribe.name || email !== app.subscribe.email) {
      app.patchSubscribe({ planId: id, name, email });
    }
    // Prefill once from the signed-in profile.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Page title="Your details" fallback={`/subscribe/${id}`} footer={<Button onClick={() => go(`/subscribe/${id}/pay`)}>Continue to payment</Button>}>
      <p className="mb-4 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Step 2 of 4 · {plan ? `${plan.title} · ${money(plan.price)} / month` : "Monthly gift"}</p>
      <div className="space-y-4">
        <TextField label="Name" value={d.name} onChange={(name) => app.patchSubscribe({ name })} />
        <TextField label="Email" value={d.email} onChange={(email) => app.patchSubscribe({ email })} hint="Used only for the receipt on this device." />
      </div>
    </Page>
  );
}

export function SubscribePayScreen({ id }: { id: string }) {
  const app = useApp();
  const go = useGo();
  const plan = planOf(id);
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  return (
    <Page title="Payment" fallback={`/subscribe/${id}/details`} footer={<Button onClick={() => { app.patchSubscribe({ method: "card" }); go(`/subscribe/${id}/review`); }}>Review subscription</Button>}>
      <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Step 3 of 4{plan ? ` · ${money(plan.price)} / month` : ""}</p>
      <p className="mb-4 rounded-lg bg-primary-50 p-3 text-[0.9375rem] leading-snug">Preview only. This does not charge a real card. The same amount would renew each month.</p>
      <button type="button" className="flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-lg bg-black font-semibold text-white" onClick={() => { app.patchSubscribe({ method: "apple" }); go(`/subscribe/${id}/review`); }}>
        <AppleMark /> Pay with Apple Pay
      </button>
      <p className="my-3 text-center text-[0.8125rem] text-muted-foreground">or card</p>
      <div className="space-y-3">
        <TextField label="Card number" value={card} onChange={(value) => { setCard(value); app.patchSubscribe({ method: "card" }); }} placeholder="4242 4242 4242 4242" />
        <div className="grid grid-cols-2 gap-2">
          <TextField label="Expiry" value={exp} onChange={setExp} placeholder="MM/YY" />
          <TextField label="CVC" value={cvc} onChange={setCvc} placeholder="123" />
        </div>
      </div>
    </Page>
  );
}

export function SubscribeReviewScreen({ id }: { id: string }) {
  const app = useApp();
  const go = useGo();
  const plan = planOf(id);
  const d = app.subscribe;
  return (
    <Page
      title="Review"
      fallback={`/subscribe/${id}/pay`}
      footer={<Button onClick={() => { app.confirmMembership(); go("/subscribe/thanks"); }}>{plan ? `Start · ${money(plan.price)} / month` : "Start subscription"}</Button>}
    >
      <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Step 4 of 4</p>
      <Card className="divide-y divide-divider">
        {[
          ["Plan", plan?.title ?? "Monthly gift"],
          ["Amount", plan ? `${money(plan.price)} / month` : ""],
          ["Renews", "Nov 29, 2026"],
          ["Method", d.method === "apple" ? "Apple Pay" : "Card"],
          ["Receipt", d.name || "On this device"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 px-4 py-3"><span className="text-muted-foreground">{k}</span><span className="text-right font-semibold">{v}</span></div>
        ))}
      </Card>
      <p className="mt-3 text-[0.8125rem] leading-snug text-muted-foreground">Preview membership. Nothing is charged. Pause or cancel anytime from My subscriptions.</p>
    </Page>
  );
}

export function SubscribeThanksScreen() {
  const app = useApp();
  const go = useGo();
  const membership = app.memberships.find((m) => m.id === app.lastMembershipId);
  const plan = planOf(membership?.planId ?? "");
  return (
    <Page title="You are in" back={false} footer={<Button onClick={() => go("/home")}>Back to home</Button>}>
      <Celebration image={plan?.image || "hero-hands"} kicker="Subscription started" title={plan ? `${money(plan.price)} / month` : "Thank you"} detail={plan?.blurb ?? "Your monthly gift is saved on this device."}>
        <p className="mt-3 text-[0.8rem] font-semibold tracking-[0.16em] text-link">{membership?.id ?? "RECEIPT"}</p>
        <p className="mt-1 text-[0.8125rem] text-muted-foreground">{plan?.title ?? "Monthly gift"} · Renews {membership?.renews ?? "next month"} · Saved on this device</p>
      </Celebration>
      <button type="button" className="mt-3 min-h-16 w-full rounded-lg bg-card px-3 text-center shadow-card" onClick={() => app.toast("Receipt saved on this device")}>
        <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Receipt</span>
        <span className="mt-0.5 block font-semibold text-link">Download</span>
      </button>
      {membership && (
        <button type="button" className="mt-3 w-full rounded-lg bg-primary-50 px-4 py-3 text-left" onClick={() => go(`/subscriptions/${membership.id}`)}>
          <span className="block font-semibold">Manage subscription</span>
          <span className="mt-0.5 block text-[0.8125rem] text-muted-foreground">Pause or cancel whenever you want.</span>
        </button>
      )}
    </Page>
  );
}

export function MySubscriptionsScreen() {
  const app = useApp();
  const go = useGo();
  const rows = app.myMemberships;
  return (
    <Page title="My subscriptions" fallback="/more">
      {rows.length === 0 ? (
        <EmptyState title="No subscriptions yet" body="A monthly gift repeats until you stop it." action="See plans" onAction={() => go("/subscribe")} />
      ) : (
        <div className="space-y-2">
          {rows.map((row) => {
            const plan = planOf(row.planId);
            return (
              <button key={row.id} type="button" onClick={() => go(`/subscriptions/${row.id}`)} className="flex w-full items-center gap-3 rounded-lg bg-card p-3 text-left shadow-card">
                <Photo name={plan?.image || "hero-hands"} alt="" className="h-14 w-14 rounded-lg" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">{plan?.title ?? "Monthly gift"}</span>
                    <Badge>{row.status}</Badge>
                  </span>
                  <span className="mt-0.5 block text-[0.8125rem] text-muted-foreground">{plan ? `${money(plan.price)} / month` : row.id} · {row.status === "Canceled" ? "Ended" : `Renews ${row.renews}`}</span>
                </span>
                <ChevronRight className="shrink-0 text-muted-foreground" size={18} aria-hidden />
              </button>
            );
          })}
        </div>
      )}
    </Page>
  );
}

export function ManageSubscriptionScreen({ id }: { id: string }) {
  const app = useApp();
  const go = useGo();
  const row = app.memberships.find((m) => m.id === id);
  const plan = planOf(row?.planId ?? "");
  if (!row) {
    return (
      <Page title="Subscription" fallback="/subscriptions">
        <EmptyState title="Subscription not found" body="It may belong to another sign-in on this device." action="My subscriptions" onAction={() => go("/subscriptions")} />
      </Page>
    );
  }
  return (
    <Page title="Manage" fallback="/subscriptions">
      <div className="relative h-40 overflow-hidden rounded-lg">
        <Photo name={plan?.image || "hero-hands"} alt="" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#231f20]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
          <p className="text-[1.25rem] font-bold">{plan?.title ?? "Monthly gift"}</p>
          <p className="text-[0.95rem]">{plan ? `${money(plan.price)} / month` : row.id}</p>
        </div>
      </div>
      <Card className="mt-4 divide-y divide-divider">
        {[
          ["Status", row.status],
          ["Started", row.started],
          ["Renews", row.status === "Canceled" ? "Ended" : row.renews],
          ["Method", row.method === "apple" ? "Apple Pay" : "Card"],
          ["Receipt", row.id],
          ["Name", row.name || "On this device"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 px-4 py-3"><span className="text-muted-foreground">{k}</span><span className="text-right font-semibold">{v}</span></div>
        ))}
      </Card>
      <button type="button" className="mt-3 min-h-14 w-full rounded-lg bg-card px-3 text-center shadow-card" onClick={() => app.toast("Receipt saved on this device")}>
        <span className="font-semibold text-link">Download receipt</span>
      </button>
      {row.status === "Active" && (
        <button type="button" className="mt-2 min-h-14 w-full rounded-lg bg-card px-3 text-center font-semibold shadow-card" onClick={() => app.setMembershipStatus(row.id, "Paused")}>Pause</button>
      )}
      {row.status === "Paused" && (
        <button type="button" className="mt-2 min-h-14 w-full rounded-lg bg-card px-3 text-center font-semibold text-link shadow-card" onClick={() => app.setMembershipStatus(row.id, "Active")}>Resume</button>
      )}
      {row.status !== "Canceled" && (
        <button type="button" className="mt-2 min-h-14 w-full rounded-lg bg-card px-3 text-center font-semibold text-destructive shadow-card" onClick={() => app.setMembershipStatus(row.id, "Canceled")}>Cancel subscription</button>
      )}
      {row.status === "Canceled" && <p className="mt-3 text-[0.8125rem] leading-snug text-muted-foreground">This subscription has ended. Past receipts stay on this device.</p>}
    </Page>
  );
}
