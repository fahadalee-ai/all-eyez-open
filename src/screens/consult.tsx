import { useState } from "react";
import { MessageCircle, Phone, UserRound, Video } from "lucide-react";
import { cancelReasons, consultModes, consultTypes, ORG, specialists, timeSlots } from "@/data/content";
import { ActionSheet, Badge, Button, Card, Celebration, Chip, EmptyState, MonthCalendar, Photo, Segmented, Sheet, StepDots, SwitchRow, TextArea, TextField } from "@/components/ios/ui";
import { Page } from "@/components/ios/shell";
import { downloadIcs, shareText } from "@/lib/haptic";
import { useGo } from "@/lib/nav";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

const modeIcons = { phone: Phone, video: Video, person: UserRound, chat: MessageCircle };

export function ConsultTypeScreen() {
  const app = useApp();
  const go = useGo();
  return (
    <Page title="Consultation" large fallback="/home">
      <StepDots step={1} total={6} />
      <p className="body-text text-muted-foreground">What kind of support do you want? You can change this later.</p>
      <div className="mt-4 space-y-2 pb-4">
        {consultTypes.map((type) => (
          <button key={type.id} type="button" onClick={() => { app.patchConsult({ type: type.id }); go("/consult/mode"); }} className={cn("w-full rounded-2xl bg-card p-4 text-left shadow-card", app.consult.type === type.id && "ring-2 ring-primary")}>
            <p className="headline">{type.title}</p>
            <p className="footnote mt-1 text-muted-foreground">{type.text}</p>
          </button>
        ))}
      </div>
    </Page>
  );
}

export function ConsultModeScreen() {
  const app = useApp();
  const go = useGo();
  return (
    <Page title="How should we meet?" fallback="/consult">
      <StepDots step={2} total={6} />
      <p className="body-text mb-3 text-muted-foreground">Choose what feels safest for you.</p>
      <div className="grid grid-cols-2 gap-2">
        {consultModes.map((mode) => {
          const Icon = modeIcons[mode.id as keyof typeof modeIcons];
          return (
            <button key={mode.id} type="button" className="rounded-2xl bg-card p-3 text-left shadow-card" onClick={() => { app.patchConsult({ mode: mode.id }); go("/consult/specialist"); }}>
              <Icon className="text-link" />
              <p className="headline mt-2">{mode.title}</p>
              <p className="footnote mt-1 text-muted-foreground">{mode.text}</p>
            </button>
          );
        })}
      </div>
    </Page>
  );
}

export function ConsultSpecialistScreen() {
  const app = useApp();
  const go = useGo();
  const type = app.consult.type;
  const list = specialists.filter((s) => {
    if (type === "legal") return s.role === "Attorney";
    if (type === "counseling") return s.role === "LPC";
    if (type === "housing") return s.role.includes("Housing");
    if (type === "financial") return s.role !== "Attorney" && s.role !== "LPC";
    return true;
  });
  const chat = app.consult.mode === "chat";
  const choose = (person?: (typeof specialists)[number]) => {
    app.patchConsult({ specialistId: person?.id ?? "" });
    if (chat) {
      const id = app.startConsultChat(person ? { name: person.name, role: person.role, photo: person.photo } : undefined);
      go(`/chat/${id}`);
      return;
    }
    go("/consult/when");
  };
  return (
    <Page title="Choose a specialist" fallback="/consult/mode">
      <StepDots step={3} total={chat ? 3 : 6} />
      <p className="footnote mb-3 text-muted-foreground">{chat ? "Secure chat opens right away. Pick someone, or continue with no preference." : "Optional. Verified means we checked their credential."}</p>
      <button type="button" className="mb-3 min-h-[3.25rem] w-full rounded-2xl bg-secondary font-semibold text-secondary-foreground" onClick={() => choose()}>
        No preference
      </button>
      <div className="space-y-2 pb-4">
        {list.map((person) => (
          <button key={person.id} type="button" className="flex w-full gap-3 rounded-2xl bg-card p-3 text-left shadow-card" onClick={() => choose(person)}>
            <Photo name={person.photo} alt="" className="h-14 w-14 rounded-full" />
            <span className="min-w-0">
              <span className="flex items-center gap-2"><span className="font-semibold">{person.name}</span><Badge tone="green">Verified</Badge></span>
              <span className="footnote block text-muted-foreground">{person.specialty}</span>
              <span className="footnote text-muted-foreground">{person.rating.toFixed(1)}★ · {person.languages}</span>
              <span className="footnote block text-link">{chat ? "Direct chat" : `Next: ${person.next}`}</span>
            </span>
          </button>
        ))}
      </div>
    </Page>
  );
}

export function ConsultWhenScreen() {
  const app = useApp();
  const go = useGo();
  return (
    <Page title="Date & time" fallback="/consult/specialist">
      <StepDots step={4} total={6} />
      <p className="footnote mb-3 text-muted-foreground">Times shown in Eastern Time (Atlanta).</p>
      <MonthCalendar value={app.consult.date} onChange={(date) => app.patchConsult({ date })} />
      <div className="mt-4 space-y-3 pb-4">
        {timeSlots.map((group) => (
          <div key={group.group}>
            <p className="footnote mb-2 font-semibold">{group.group}</p>
            <div className="flex flex-wrap gap-2">
              {group.times.map((time) => (
                <Chip key={time} selected={app.consult.time === time} onClick={() => app.patchConsult({ time })}>{time}</Chip>
              ))}
            </div>
          </div>
        ))}
        <Button onClick={() => go("/consult/details")}>Continue</Button>
      </div>
    </Page>
  );
}

export function ConsultDetailsScreen() {
  const app = useApp();
  const go = useGo();
  const c = app.consult;
  return (
    <Page title="Your details" fallback="/consult/when">
      <StepDots step={5} total={6} />
      {!app.user && <p className="mb-3 rounded-xl bg-primary-50 p-3 text-[0.9375rem]">You’re continuing as a guest. Create an account later to manage this booking.</p>}
      <div className="space-y-4 pb-6">
        <TextField label="Name or nickname" value={c.name} onChange={(name) => app.patchConsult({ name })} />
        <TextField label="Safe phone number" value={c.phone} onChange={(phone) => app.patchConsult({ phone })} type="tel" />
        <div className="overflow-hidden rounded-2xl bg-card shadow-card">
          <SwitchRow label="Is it safe to leave a voicemail?" checked={c.voicemail} onChange={(voicemail) => app.patchConsult({ voicemail })} />
          <SwitchRow label="Is it safe to text you?" checked={c.textOk} onChange={(textOk) => app.patchConsult({ textOk })} />
        </div>
        <div>
          <p className="mb-2 text-[0.8125rem] font-semibold">Preferred contact time</p>
          <Segmented label="Preferred contact time" value={c.contactTime} onChange={(contactTime) => app.patchConsult({ contactTime })} options={[{ id: "Morning", label: "Morning" }, { id: "Afternoon", label: "Afternoon" }, { id: "Evening", label: "Evening" }, { id: "Anytime", label: "Anytime" }]} />
        </div>
        <TextField label="Language" value={c.language} onChange={(language) => app.patchConsult({ language })} />
        <TextArea label="What do you need? (optional)" value={c.need} onChange={(need) => app.patchConsult({ need })} hint="Don’t include your address or other identifying details." />
        <div>
          <p className="mb-2 text-[0.8125rem] font-semibold">Urgency</p>
          <Segmented label="Urgency" value={c.urgency} onChange={(urgency) => app.patchConsult({ urgency })} options={[{ id: "Routine", label: "Routine" }, { id: "Soon", label: "Soon" }, { id: "Urgent", label: "Urgent" }]} />
        </div>
        {c.urgency === "Urgent" && <p className="text-[0.9375rem] text-muted-foreground">If you are in immediate danger, call 911 or {ORG.hotline}.</p>}
        <Button onClick={() => go("/consult/review")}>Review</Button>
      </div>
    </Page>
  );
}

export function ConsultReviewScreen() {
  const app = useApp();
  const go = useGo();
  const [consent, setConsent] = useState(false);
  const c = app.consult;
  const person = specialists.find((s) => s.id === c.specialistId);
  const type = consultTypes.find((t) => t.id === c.type);
  const mode = consultModes.find((m) => m.id === c.mode);
  const rows = [
    ["Type", type?.title ?? "Support", "/consult"],
    ["Mode", mode?.title ?? "", "/consult/mode"],
    ["Specialist", person?.name ?? "No preference", "/consult/specialist"],
    ["When", `${c.date} · ${c.time} ET`, "/consult/when"],
    ["Contact", `${c.name} · ${c.phone}`, "/consult/details"],
  ];
  return (
    <Page title="Review" fallback="/consult/details">
      <StepDots step={6} total={6} />
      <Card className="divide-y divide-divider">
        {rows.map(([label, value, to]) => (
          <div key={label} className="flex items-center gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="footnote text-muted-foreground">{label}</p>
              <p className="text-[1.0625rem]">{value}</p>
            </div>
            <button type="button" className="min-h-11 font-semibold text-link" onClick={() => go(to)}>Edit</button>
          </div>
        ))}
      </Card>
      <div className="mt-4 overflow-hidden rounded-2xl bg-card shadow-card">
        <SwitchRow label="I understand this is a confidential consult, not an emergency service" checked={consent} onChange={setConsent} />
      </div>
      <div className="mt-4 pb-4">
        <Button onClick={() => { app.confirmBooking(); go("/consult/done"); }}>Confirm Booking</Button>
      </div>
    </Page>
  );
}

export function ConsultDoneScreen() {
  const app = useApp();
  const go = useGo();
  const booking = app.bookings.find((b) => b.id === app.lastBookingId) ?? app.myBookings[0];
  const [discreet, setDiscreet] = useState(true);
  if (!booking) return <Page title="Booked"><EmptyState title="No booking yet" body="Start with the kind of help you want." action="Book" onAction={() => go("/consult")} /></Page>;
  return (
    <Page title="You’re booked" back={false} footer={<Button onClick={() => go("/home")}>Done</Button>}>
      <Celebration image="onboarding-sunrise" kicker="You’re booked" title={`${booking.date}`} detail={`${booking.time} ET · ${booking.id}`}>
        <p className="mt-2 text-[0.85rem] text-muted-foreground">We’ll use only the contact method you marked as safe.</p>
      </Celebration>
      <div className="mt-3 overflow-hidden rounded-lg bg-card shadow-card">
        <SwitchRow label="Discreet calendar title" detail="Saves the event as “Appointment.”" checked={discreet} onChange={setDiscreet} />
      </div>
      <div className="mt-4 space-y-2">
        <Button onClick={() => downloadIcs(discreet ? "Appointment" : "All Eyez Open consultation", booking.date, booking.time)}>Add to Calendar</Button>
        <Button variant="secondary" onClick={() => shareText("Appointment", `${booking.date} ${booking.time}`).then((r) => r === "copied" && app.toast("Copied"))}>Share</Button>
      </div>
      <Card className="mt-4 p-4">
        <p className="headline">What to expect</p>
        <p className="callout mt-1 text-muted-foreground">We’ll use the contact method you marked as safe. You can keep your camera off on video. This is not an emergency line.</p>
      </Card>
      <div className="mt-4"><Button variant="secondary" onClick={() => go(`/consultations/${booking.id}`)}>Reschedule</Button></div>
    </Page>
  );
}

export function ConsultationsScreen() {
  const app = useApp();
  const go = useGo();
  const [tab, setTab] = useState("Upcoming");
  const rows = app.myBookings.filter((b) => (tab === "Upcoming" ? b.status === "upcoming" : b.status !== "upcoming"));
  return (
    <Page title="My consultations" large fallback="/more">
      <Segmented label="Consultations" value={tab} onChange={setTab} options={[{ id: "Upcoming", label: "Upcoming" }, { id: "Past", label: "Past" }]} />
      <div className="mt-4 space-y-2">
        {rows.length === 0 && <EmptyState title={tab === "Upcoming" ? "Nothing scheduled" : "No past consults"} body="Book a time that feels safe. You can use a nickname." action="Book a consultation" onAction={() => go("/consult")} />}
        {rows.map((b) => (
          <Card key={b.id} className="p-4" onClick={() => go(`/consultations/${b.id}`)}>
            <div className="flex justify-between"><p className="headline">{consultTypes.find((t) => t.id === b.type)?.title}</p><Badge tone={b.status === "cancelled" ? "warning" : "purple"}>{b.status}</Badge></div>
            <p className="footnote mt-1 text-muted-foreground">{b.date} · {b.time} · {b.id}</p>
          </Card>
        ))}
      </div>
    </Page>
  );
}

export function ConsultationDetailScreen({ id }: { id: string }) {
  const app = useApp();
  const go = useGo();
  const booking = app.bookings.find((b) => b.id === id);
  const [sheet, setSheet] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [date, setDate] = useState(booking?.date ?? "");
  const [time, setTime] = useState(booking?.time ?? "");
  const [remind, setRemind] = useState(true);
  if (!booking) return <Page title="Consultation"><EmptyState title="Not found" body="That booking isn’t on this device." action="All consultations" onAction={() => go("/consultations")} /></Page>;
  const person = specialists.find((s) => s.id === booking.specialistId);
  return (
    <Page title={booking.id} footer={booking.mode === "video" && booking.status === "upcoming" ? <Button onClick={() => go(`/call/${booking.id}`)}>Join Video Call</Button> : undefined}>
      <Card className="p-4">
        <p className="headline">{consultTypes.find((t) => t.id === booking.type)?.title}</p>
        <p className="callout mt-1">{booking.date} · {booking.time} ET</p>
        <p className="footnote mt-1 text-muted-foreground">{consultModes.find((m) => m.id === booking.mode)?.title} · {person?.name ?? "First available specialist"}</p>
        <Badge>{booking.status}</Badge>
      </Card>
      <div className="mt-4 overflow-hidden rounded-2xl bg-card shadow-card">
        <SwitchRow label="Discreet reminder" detail="Notification text stays “You have a new update.”" checked={remind} onChange={setRemind} />
      </div>
      {booking.status === "upcoming" && (
        <div className="mt-4 space-y-2">
          <Button variant="secondary" onClick={() => setSheet(true)}>Reschedule</Button>
          <Button variant="danger" onClick={() => setCancel(true)}>Cancel consultation</Button>
        </div>
      )}
      {booking.status === "past" && (
        <div className="mt-4"><Button onClick={() => go(`/rate/${booking.id}`)}>{booking.rating ? "Update rating" : "Rate this session"}</Button></div>
      )}
      <Sheet open={sheet} onClose={() => setSheet(false)} title="Reschedule">
        <MonthCalendar value={date} onChange={setDate} />
        <div className="mt-3 flex flex-wrap gap-2">
          {timeSlots.flatMap((g) => g.times).map((slot) => <Chip key={slot} selected={time === slot} onClick={() => setTime(slot)}>{slot}</Chip>)}
        </div>
        <div className="mt-4"><Button onClick={() => { app.reschedule(booking.id, date, time); setSheet(false); }}>Save time</Button></div>
      </Sheet>
      <ActionSheet open={cancel} onClose={() => setCancel(false)} title="Cancel this consultation?" message="Your specialist will be notified with the reason you choose." actions={cancelReasons.map((reason) => ({ label: reason, destructive: true, onSelect: () => app.cancelBooking(booking.id, reason) }))} />
    </Page>
  );
}

export function CallScreen({ id }: { id: string }) {
  const go = useGo();
  const booking = useApp().bookings.find((b) => b.id === id);
  const person = specialists.find((s) => s.id === booking?.specialistId);
  return (
    <Page title="Video call" fallback={`/consultations/${id}`}>
      <div className="flex h-80 flex-col items-center justify-center rounded-3xl bg-[#231f20] text-white">
        <Photo name={person?.photo} alt="" className="h-24 w-24 rounded-full" />
        <p className="headline mt-3">{person?.name ?? "Specialist"}</p>
        <p className="footnote text-white/70">Camera is off until you turn it on. This preview does not connect a live call.</p>
      </div>
      <p className="footnote mt-3 text-muted-foreground">End-to-end private in the full app. In an emergency call 911.</p>
      <div className="mt-4"><Button variant="danger" onClick={() => go(`/consultations/${id}`)}>Leave call</Button></div>
    </Page>
  );
}

export function RateScreen({ id }: { id: string }) {
  const app = useApp();
  const go = useGo();
  const [stars, setStars] = useState(5);
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <Page title="Thank you" back={false} footer={<Button onClick={() => go("/reviews")}>Write a public review</Button>}>
        <Celebration image="service-therapy" kicker="Session" title="Thank you" detail="Your note helps the care team. It isn’t posted publicly unless you also write a review." />
      </Page>
    );
  }
  return (
    <Page title="How was the session?" fallback="/consultations">
      <div className="flex justify-center"><span className="origin-left scale-110"><button type="button" className="sr-only">Stars</button></span></div>
      <div className="flex justify-center py-4">
        <StarPicker value={stars} onChange={setStars} />
      </div>
      <TextArea label="Comment (optional)" value={text} onChange={setText} hint="Skip graphic detail. A sentence is enough." />
      <div className="mt-4"><Button onClick={() => { app.rateBooking(id, stars, text); setDone(true); }}>Submit</Button></div>
    </Page>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" aria-label={`${n} stars`} className="grid h-12 w-12 place-items-center text-[1.6rem]" onClick={() => onChange(n)}>
          <span className={n <= value ? "text-[#8a6200]" : "text-divider"}>★</span>
        </button>
      ))}
    </div>
  );
}
