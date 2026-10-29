import { useMemo, useState } from "react";
import { Bell, Calendar, ChevronRight, Heart, Image as ImageIcon, Info, Lock, LogOut, Mail, MapPin, MessageCircle, Moon, Package, Phone, Settings, Share2, Shield, ShoppingBag, Star, Sun, Type, User } from "lucide-react";
import {
  aboutSections,
  albums,
  careers,
  faqs,
  gallery,
  impactStats,
  ORG,
  partners,
  policies,
  safetyDefaults,
  shelters,
  sitemap,
  socials,
  staff,
} from "@/data/content";
import {
  ActionSheet,
  AlertDialog,
  Avatar,
  Badge,
  Button,
  Card,
  Celebration,
  Chip,
  EmptyState,
  Group,
  ListRow,
  Logo,
  Photo,
  SafariSheet,
  SearchField,
  Segmented,
  Sheet,
  Stars,
  SwipeRow,
  SwitchRow,
  TextArea,
  TextField,
} from "@/components/ios/ui";
import { Page } from "@/components/ios/shell";
import { shareText } from "@/lib/haptic";
import { useBack, useGo } from "@/lib/nav";
import { useApp, type SafetyPlan } from "@/lib/store";

const faqCats = ["About us", "Getting help", "Legal", "Donations", "Privacy & Safety", "Shop & Orders"];

export function QaScreen() {
  const go = useGo();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<string | null>(faqs[0].q);
  const list = faqs.filter((f) => (cat === "All" || f.category === cat) && `${f.q} ${f.a}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <Page title="Questions" large fallback="/more">
      <SearchField value={q} onChange={setQ} placeholder="Search questions" />
      <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
        <Chip selected={cat === "All"} onClick={() => setCat("All")}>All</Chip>
        {faqCats.map((c) => <Chip key={c} selected={cat === c} onClick={() => setCat(c)}>{c}</Chip>)}
      </div>
      <div className="mt-3 overflow-hidden rounded-2xl bg-card shadow-card">
        {list.length === 0 && <EmptyState title="No answers yet" body="Ask us directly and we’ll reply in My Questions." action="Ask a question" onAction={() => go("/qa/ask")} />}
        {list.map((item) => (
          <button key={item.q} type="button" className="w-full border-b border-divider px-4 py-3 text-left last:border-0" aria-expanded={open === item.q} onClick={() => setOpen(open === item.q ? null : item.q)}>
            <span className="block text-[1.0625rem] font-semibold">{item.q}</span>
            {open === item.q && <span className="mt-2 block text-[1rem] leading-snug text-muted-foreground">{item.a}</span>}
          </button>
        ))}
      </div>
      <div className="mt-4"><Button onClick={() => go("/qa/ask")}>Ask a Question</Button></div>
    </Page>
  );
}

export function AskQuestionScreen() {
  const app = useApp();
  const back = useBack("/qa");
  const [name, setName] = useState(app.user?.nickname ?? "");
  const [email, setEmail] = useState(app.user?.email ?? "");
  const [category, setCategory] = useState(faqCats[1]);
  const [question, setQuestion] = useState("");
  return (
    <Page title="Ask a question" fallback="/qa">
      <div className="space-y-3">
        <TextField label="Name (optional)" value={name} onChange={setName} />
        <TextField label="Email" value={email} onChange={setEmail} />
        <div className="flex flex-wrap gap-2">{faqCats.map((c) => <Chip key={c} selected={category === c} onClick={() => setCategory(c)}>{c}</Chip>)}</div>
        <TextArea label="Question" value={question} onChange={setQuestion} hint="Leave out addresses and case numbers." />
        <Button onClick={() => {
          app.askQuestion({ name, email, category, question });
          back();
        }}>Send</Button>
      </div>
    </Page>
  );
}

export function MyQuestionsScreen() {
  const app = useApp();
  const go = useGo();
  const list = app.myQuestions;
  return (
    <Page title="My questions" large>
      {list.length === 0 ? <EmptyState title="No questions yet" body="Answers show up here with a status." action="Ask" onAction={() => go("/qa/ask")} /> : list.map((item) => (
        <Card key={item.id} className="mb-2 p-4" onClick={() => go(`/questions/${item.id}`)}>
          <div className="flex justify-between"><Badge tone={item.status === "Answered" ? "green" : "warning"}>{item.status}</Badge><span className="footnote text-muted-foreground">{item.category}</span></div>
          <p className="headline mt-2">{item.question}</p>
        </Card>
      ))}
    </Page>
  );
}

export function QuestionDetailScreen({ id }: { id: string }) {
  const item = useApp().questions.find((q) => q.id === id);
  if (!item) return <Page title="Question"><EmptyState title="Not found" body="That question isn’t on this device." /></Page>;
  return (
    <Page title={item.status}>
      <Badge tone={item.status === "Answered" ? "green" : "warning"}>{item.status}</Badge>
      <p className="title-2 mt-3">{item.question}</p>
      <Card className="mt-4 p-4">
        <p className="footnote text-muted-foreground">Reply</p>
        <p className="body-text mt-1">{item.answer ?? "Pending. Client care usually replies within two business days. You’ll see “You have a new update.”"}</p>
      </Card>
    </Page>
  );
}

const albumMap: Record<string, string> = { events: "Events", workshops: "Workshops", drives: "Donation Drives", walks: "Awareness Walks", community: "Community" };

export function GalleryScreen() {
  const go = useGo();
  const [album, setAlbum] = useState("All");
  const items = gallery.filter((g) => album === "All" || g.album === album);
  return (
    <Page title="Gallery" large fallback="/more">
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        <Chip selected={album === "All"} onClick={() => setAlbum("All")}>All</Chip>
        {albums.map((name) => <Chip key={name} selected={album === name} onClick={() => setAlbum(name)}>{name}</Chip>)}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {items.map((item) => (
          <button key={item.id} type="button" className="aspect-square overflow-hidden rounded-lg" onClick={() => go(`/photos/${item.id}`)} aria-label={item.caption}>
            <Photo name={item.image} alt={item.caption} className="h-full w-full" />
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {Object.entries(albumMap).map(([id, label]) => (
          <button key={id} type="button" className="flex min-h-12 w-full items-center justify-between" onClick={() => go(`/gallery/${id}`)}>
            <span className="font-semibold">{label}</span><ChevronRight size={18} />
          </button>
        ))}
      </div>
    </Page>
  );
}

export function AlbumScreen({ album }: { album: string }) {
  const go = useGo();
  const label = albumMap[album] ?? album;
  const items = gallery.filter((g) => g.album === label);
  return (
    <Page title={label}>
      <p className="body-text text-muted-foreground">Photos from {label.toLowerCase()} at All Eyez Open. People gave permission to be pictured. No one is named.</p>
      <p className="footnote mt-1 text-muted-foreground">{items[0]?.date}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {items.map((item) => (
          <button key={item.id} type="button" onClick={() => go(`/photos/${item.id}`)} className="overflow-hidden rounded-2xl text-left">
            <Photo name={item.image} alt={item.caption} className="h-36 w-full" />
            <span className="mt-1 block text-[0.8125rem]">{item.caption}</span>
          </button>
        ))}
      </div>
    </Page>
  );
}

export function PhotoScreen({ id }: { id: string }) {
  const app = useApp();
  const index = Math.max(0, gallery.findIndex((g) => g.id === id));
  const [i, setI] = useState(index);
  const [scale, setScale] = useState(1);
  const item = gallery[i];
  if (!item) return <Page title="Photo"><EmptyState title="Photo missing" body="It isn’t in this album." /></Page>;
  return (
    <Page title="Photo" right={<button type="button" className="min-h-11 px-2 font-semibold text-link" onClick={() => { shareText(item.caption, item.caption); app.toast("Ready to share"); }}>Share</button>}>
      <div className="overflow-hidden rounded-2xl bg-black" onDoubleClick={() => setScale((s) => (s > 1 ? 1 : 2))}>
        <Photo name={item.image} alt={item.caption} className="h-80 w-full transition" />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <button type="button" className="min-h-11 font-semibold text-link" onClick={() => { setI((n) => Math.max(0, n - 1)); setScale(1); }}>Previous</button>
        <button type="button" className="min-h-11 font-semibold" onClick={() => setScale((s) => (s > 1 ? 1 : 2))}>{scale > 1 ? "Zoom out" : "Zoom"}</button>
        <button type="button" className="min-h-11 font-semibold text-link" onClick={() => { setI((n) => Math.min(gallery.length - 1, n + 1)); setScale(1); }}>Next</button>
      </div>
      <p className="body-text mt-3" style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>{item.caption}</p>
      <p className="footnote text-muted-foreground">{item.date} · {item.album}</p>
      <button type="button" className="mt-3 min-h-11 font-semibold text-link" onClick={() => app.toast("Saved to this device")}>Save photo</button>
    </Page>
  );
}

export function ReviewsScreen() {
  const app = useApp();
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [stars, setStars] = useState(5);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [anon, setAnon] = useState(false);
  const [thanks, setThanks] = useState(false);
  const list = app.reviews.filter((r) => {
    if (filter === "5★") return r.stars === 5;
    if (filter === "4★") return r.stars === 4;
    if (filter === "With photos") return r.photo;
    if (filter === "Services" || filter === "Shop") return r.area === filter;
    return true;
  });
  const avg = app.reviews.reduce((s, r) => s + r.stars, 0) / app.reviews.length;
  const dist = [5, 4, 3, 2, 1].map((n) => app.reviews.filter((r) => r.stars === n).length);
  return (
    <Page title="Reviews" large fallback="/more">
      <Card className="p-4">
        <p className="title-1">{avg.toFixed(1)}</p>
        <Stars value={avg} />
        <p className="footnote text-muted-foreground">{app.reviews.length} reviews</p>
        <div className="mt-3 space-y-1">
          {dist.map((count, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[0.8125rem]">
              <span className="w-6">{5 - idx}★</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted"><span className="block h-full bg-[#8a6200]" style={{ width: `${(count / app.reviews.length) * 100}%` }} /></span>
            </div>
          ))}
        </div>
      </Card>
      <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">{["All", "5★", "4★", "With photos", "Services", "Shop"].map((f) => <Chip key={f} selected={filter === f} onClick={() => setFilter(f)}>{f}</Chip>)}</div>
      <div className="mt-3 space-y-2">
        {list.map((r) => (
          <Card key={r.id} className="p-4">
            <div className="flex items-center gap-2">
              <Avatar name={r.name} anonymous={r.name === "Anonymous"} size={36} />
              <div className="flex-1"><p className="font-semibold">{r.name}</p><Stars value={r.stars} /></div>
              {r.verified && <Badge tone="green">Verified</Badge>}
            </div>
            <p className="headline mt-2">{r.title}</p>
            <p className="callout mt-1">{r.text}</p>
            <p className="footnote mt-1 text-muted-foreground">{r.date} · {r.area}</p>
          </Card>
        ))}
      </div>
      <div className="mt-4"><Button onClick={() => setOpen(true)}>Write a Review</Button></div>
      <Sheet open={open} onClose={() => setOpen(false)} title="Write a review">
        {thanks ? <p className="body-text">Thank you. Your review is on the list.</p> : (
          <div className="space-y-3">
            <Stars value={stars} onChange={setStars} />
            <TextField label="Title" value={title} onChange={setTitle} />
            <TextArea label="Review" value={text} onChange={setText} />
            <div className="overflow-hidden rounded-2xl bg-muted"><SwitchRow label="Post anonymously" checked={anon} onChange={setAnon} /></div>
            <label className="block text-[0.9375rem] font-semibold text-link">Optional photo<input type="file" accept="image/*" className="mt-1 block text-[0.8125rem]" /></label>
            <Button onClick={() => { if (title.length < 2 || text.length < 4) return; app.addReview({ stars, title, text, anonymous: anon, area: "Services" }); setThanks(true); }}>Submit</Button>
          </div>
        )}
      </Sheet>
    </Page>
  );
}

export function ContactScreen() {
  const app = useApp();
  const go = useGo();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(app.user?.email ?? "");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("General");
  const [message, setMessage] = useState("");
  const [safeCall, setSafeCall] = useState(false);
  const [safeText, setSafeText] = useState(false);
  return (
    <Page title="Contact" large fallback="/more">
      <div className="space-y-3">
        <TextField label="Name (optional)" value={name} onChange={setName} />
        <TextField label="Email" value={email} onChange={setEmail} />
        <TextField label="Phone (optional)" value={phone} onChange={setPhone} />
        <div className="flex flex-wrap gap-2">{["General", "Housing", "Donation", "Volunteer", "Press"].map((t) => <Chip key={t} selected={topic === t} onClick={() => setTopic(t)}>{t}</Chip>)}</div>
        <TextArea label="Message" value={message} onChange={setMessage} />
        <div className="overflow-hidden rounded-2xl bg-card shadow-card">
          <SwitchRow label="Safe to call" checked={safeCall} onChange={setSafeCall} />
          <SwitchRow label="Safe to text" checked={safeText} onChange={setSafeText} />
        </div>
        <Button onClick={() => {
          if (!email.includes("@") || message.trim().length < 8) { app.toast("Add an email and a message"); return; }
          app.submitQuery({ name, email, phone, topic, message, safeCall, safeText });
          go("/contact/sent");
        }}>Send</Button>
        <Button variant="secondary" onClick={() => { app.submitQuery({ name, email: email || "callback@alleyezopen.org", phone, topic: "Callback", message: message || "Please call when it is safe.", safeCall: true, safeText }); go("/contact/sent"); }}>Request a Callback</Button>
      </div>
      <div className="mt-5 space-y-2">
        <Card className="p-4"><a className="flex items-center gap-2 font-semibold text-link" href={`tel:${ORG.phone.replace(/\D/g, "")}`}><Phone size={18} /> {ORG.phone}</a><p className="footnote mt-1">{ORG.email}</p><p className="footnote">{ORG.hours}</p></Card>
        <Card className="p-4">
          <p className="inline-flex items-center gap-2 font-semibold"><MapPin size={18} /> Office</p>
          <p className="callout mt-1">{ORG.address}<br />{ORG.city}</p>
          <div className="relative mt-3 h-36 overflow-hidden rounded-xl bg-[#d9e7d4]">
            <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "linear-gradient(#c5d8bc 1px, transparent 1px), linear-gradient(90deg, #c5d8bc 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
            <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-full rounded-full bg-primary ring-4 ring-white" />
            <a className="absolute bottom-2 left-2 rounded-lg bg-white px-3 py-1 text-[0.8125rem] font-semibold" href={`https://maps.apple.com/?q=${encodeURIComponent(`${ORG.address} ${ORG.city}`)}`}>Open in Maps</a>
          </div>
        </Card>
      </div>
    </Page>
  );
}

export function ContactSentScreen() {
  const go = useGo();
  return <Page title="Message sent" back={false} footer={<Button onClick={() => go("/home")}>Done</Button>}><Celebration image="onboarding-phone" kicker="Client care" title="Message sent" detail="If you asked for a call, they’ll use only the methods you marked as safe."><button type="button" className="mt-3 font-semibold text-link" onClick={() => go("/queries")}>My queries</button></Celebration></Page>;
}

export function QueriesScreen() {
  const app = useApp();
  return (
    <Page title="My queries" large>
      {app.queries.length === 0 ? <EmptyState title="No messages yet" body="Contact notes and callback requests appear here." /> : app.queries.map((q) => (
        <Card key={q.id} className="mb-2 p-4"><Badge>{q.status}</Badge><p className="headline mt-2">{q.topic}</p><p className="callout mt-1">{q.message}</p></Card>
      ))}
    </Page>
  );
}

export function ProfileScreen() {
  const app = useApp();
  const go = useGo();
  if (!app.user) return <Page title="Profile" large back={false}><EmptyState title="You’re browsing as a guest" body="Create an account to keep consults, posts, and orders together." action="Log in or create account" onAction={() => go("/welcome")} /></Page>;
  const u = app.user;
  return (
    <Page title="Profile" large fallback="/more">
      <div className="flex items-center gap-3">
        <Avatar name={u.nickname} size={64} />
        <div><p className="title-2">{u.nickname}</p><p className="footnote text-muted-foreground">{u.role} · {u.email}</p></div>
      </div>
      <div className="mt-4"><Button variant="secondary" onClick={() => go("/profile/edit")}>Edit profile</Button></div>
      <div className="mt-4 overflow-hidden rounded-2xl bg-card shadow-card">
        <ListRow title="Saved posts" onClick={() => go("/saved")} />
        <ListRow title="My posts" onClick={() => go("/my-posts")} />
        <ListRow title="My consultations" onClick={() => go("/consultations")} />
        <ListRow title="My orders" onClick={() => go("/orders")} />
        <ListRow title="My donations" onClick={() => go("/donations")} />
        <ListRow title="My reviews" onClick={() => go("/reviews")} />
      </div>
    </Page>
  );
}

export function EditProfileScreen() {
  const app = useApp();
  const u = app.user;
  const [nickname, setNickname] = useState(u?.nickname ?? "");
  const [phone, setPhone] = useState(u?.phone ?? "");
  const [language, setLanguage] = useState(u?.language ?? "English");
  if (!u) return <Page title="Edit profile"><EmptyState title="Sign in first" body="A guest profile isn’t saved." /></Page>;
  return (
    <Page title="Edit profile">
      <div className="space-y-3">
        <TextField label="Nickname" value={nickname} onChange={setNickname} />
        <TextField label="Phone" value={phone} onChange={setPhone} />
        <TextField label="Language" value={language} onChange={setLanguage} />
        <Button onClick={() => app.updateProfile({ nickname, phone, language, name: nickname })}>Save</Button>
      </div>
    </Page>
  );
}

export function SavedScreen() {
  const app = useApp();
  const go = useGo();
  const posts = app.posts.filter((p) => app.saved.includes(p.id));
  return <Page title="Saved">{posts.length === 0 ? <EmptyState title="No saved posts" body="Use Save on a story to keep it here." action="Community" onAction={() => go("/community")} /> : posts.map((p) => <Card key={p.id} className="mb-2 p-4" onClick={() => go(`/community/${p.id}`)}><p className="headline">{p.title}</p></Card>)}</Page>;
}

export function MyPostsScreen() {
  const app = useApp();
  const go = useGo();
  const posts = app.posts.filter((p) => p.authorId === app.user?.id);
  return <Page title="My posts">{posts.length === 0 ? <EmptyState title="You haven’t posted" body="Anonymous is the default when you do." action="Share" onAction={() => go("/community/new")} /> : posts.map((p) => <Card key={p.id} className="mb-2 p-4" onClick={() => go(`/community/${p.id}`)}><p className="headline">{p.title}</p></Card>)}</Page>;
}

export function MoreScreen() {
  const app = useApp();
  const go = useGo();
  const [logout, setLogout] = useState(false);
  const person = app.user;
  const quick = [
    { to: "/help", label: "Help", icon: Phone },
    { to: "/safety-plan", label: "Safety", icon: Shield },
    { to: "/donate", label: "Donate", icon: Heart },
    { to: "/contact", label: "Contact", icon: Mail },
  ];
  const lists: { title: string; items: { to: string; label: string; icon: typeof User }[] }[] = [
    {
      title: "Community",
      items: [
        { to: "/programs", label: "Programs & classes", icon: Calendar },
        { to: "/shop", label: "Shop", icon: ShoppingBag },
        { to: "/gallery", label: "Gallery", icon: ImageIcon },
        { to: "/reviews", label: "Reviews", icon: Star },
        { to: "/qa", label: "Questions", icon: MessageCircle },
      ],
    },
    {
      title: "Account",
      items: [
        { to: "/orders", label: "Orders", icon: Package },
        { to: "/donations", label: "Donation history", icon: Heart },
        { to: "/about", label: "About All Eyez Open", icon: Info },
        { to: "/social", label: "Social", icon: Share2 },
        { to: "/settings", label: "Settings", icon: Settings },
      ],
    },
  ];
  return (
    <Page title="More" large back={false}>
      <div className="overflow-hidden rounded-lg bg-gradient-to-br from-[#782baf] to-[#3d1760] p-4 text-white shadow-card">
        <div className="flex items-center gap-3">
          <Avatar name={person?.nickname || "Guest"} size={52} />
          <div className="min-w-0">
            <p className="truncate text-[1.25rem] font-bold leading-tight">{person?.nickname || "Welcome"}</p>
            <p className="mt-0.5 text-[0.875rem] leading-snug text-white/85">{person ? `${person.role} · ${person.email}` : "Sign in to keep bookings, gifts, and your safety plan."}</p>
          </div>
        </div>
        <button type="button" onClick={() => go(person ? "/profile" : "/welcome")} className="mt-3 min-h-11 w-full rounded-lg bg-white text-[0.95rem] font-semibold text-[#231f20]">
          {person ? "View profile" : "Create an account"}
        </button>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {quick.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.to} type="button" onClick={() => go(item.to)} className="flex min-h-[4.75rem] flex-col items-center justify-center gap-1.5 rounded-lg bg-card px-1 shadow-card">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-100 text-link">
                <Icon size={18} aria-hidden />
              </span>
              <span className="text-[0.75rem] font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>

      {lists.map((section) => (
        <section key={section.title} className="mt-5">
          <h2 className="px-1 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{section.title}</h2>
          <div className="mt-2 overflow-hidden rounded-lg bg-card shadow-card">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.to} type="button" onClick={() => go(item.to)} className="flex min-h-12 w-full items-center gap-3 border-b border-divider px-3.5 text-left last:border-0">
                  <Icon size={18} className="shrink-0 text-link" aria-hidden />
                  <span className="flex-1 font-semibold">{item.label}</span>
                  <ChevronRight className="shrink-0 text-muted-foreground" size={18} aria-hidden />
                </button>
              );
            })}
          </div>
        </section>
      ))}

      {person && (
        <button type="button" onClick={() => setLogout(true)} className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg font-semibold text-danger">
          <LogOut size={18} aria-hidden /> Log out
        </button>
      )}
      <p className="mt-3 pb-2 text-center text-[0.75rem] text-muted-foreground">
        {ORG.name}
        <button type="button" className="ml-2 font-semibold text-link" onClick={() => go("/index-map")}>Screen index</button>
      </p>
      <ActionSheet open={logout} onClose={() => setLogout(false)} title="Log out of this device?" actions={[{ label: "Log out", destructive: true, onSelect: () => { app.logout(); go("/welcome"); } }]} />
    </Page>
  );
}

export function SettingsScreen() {
  const go = useGo();
  const app = useApp();
  const [del, setDel] = useState(false);
  const [out, setOut] = useState(false);
  return (
    <Page title="Settings" large>
      <Group>
        <ListRow title="Notifications" icon={<Bell size={18} />} onClick={() => go("/settings/notifications")} />
        <ListRow title="Privacy & Security" icon={<Lock size={18} />} onClick={() => go("/settings/privacy")} />
        <ListRow title="Language" subtitle={app.settings.language === "es" ? "Español" : "English"} onClick={() => app.updateSettings({ language: app.settings.language === "es" ? "en" : "es" })} />
        <ListRow title="Appearance" icon={app.settings.theme === "dark" ? <Moon size={18} /> : <Sun size={18} />} onClick={() => go("/settings/appearance")} />
        <ListRow title="Text Size" icon={<Type size={18} />} subtitle={app.settings.textSize} onClick={() => go("/settings/accessibility")} />
        <ListRow title="Accessibility" onClick={() => go("/settings/accessibility")} />
        <ListRow title="Delete Account" destructive onClick={() => setDel(true)} />
        <ListRow title="Log Out" destructive onClick={() => setOut(true)} />
      </Group>
      <ActionSheet open={del} onClose={() => setDel(false)} title="Delete this account from the device?" message="Consults, posts, and the safety plan stored here will be removed." actions={[{ label: "Delete account", destructive: true, onSelect: () => { app.deleteAccount(); go("/welcome"); } }]} />
      <ActionSheet open={out} onClose={() => setOut(false)} title="Log out?" actions={[{ label: "Log out", destructive: true, onSelect: () => { app.logout(); go("/welcome"); } }]} />
    </Page>
  );
}

export function NotificationSettingsScreen() {
  const app = useApp();
  const s = app.settings;
  const rows: Array<[keyof typeof s, string]> = [
    ["notifConsult", "Consultation reminders"],
    ["notifCommunity", "Community replies"],
    ["notifOrders", "Order updates"],
    ["notifEvents", "Event reminders"],
    ["notifDonations", "Donation receipts"],
    ["hideNotificationContent", "Hide notification content"],
  ];
  return (
    <Page title="Notifications">
      <p className="footnote mb-3 text-muted-foreground">Alerts always use generic wording such as “You have a new update.”</p>
      <Group>
        {rows.map(([key, label]) => (
          <SwitchRow key={key} label={label} checked={Boolean(s[key])} onChange={(v) => app.updateSettings({ [key]: v })} />
        ))}
      </Group>
    </Page>
  );
}

export function PrivacySettingsScreen() {
  const app = useApp();
  const [pin, setPin] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  return (
    <Page title="Privacy & Security">
      <Group>
        <SwitchRow label="App Lock" detail="Face ID or PIN" checked={app.settings.appLock} onChange={(on) => { if (!on) app.updateSettings({ appLock: false, pin: "" }); }} />
        <SwitchRow label="Discreet Mode" detail="Title becomes Notes. Switcher shows a neutral cover." checked={app.settings.discreet} onChange={(discreet) => app.updateSettings({ discreet })} />
        <div className="px-4 py-3">
          <p className="font-semibold">Quick Exit screen</p>
          <div className="mt-2"><Segmented label="Disguise" value={app.settings.disguise} onChange={(disguise) => app.updateSettings({ disguise: disguise as "weather" | "notes" })} options={[{ id: "weather", label: "Weather" }, { id: "notes", label: "Notes" }]} /></div>
        </div>
        <SwitchRow label="Biometrics" checked={app.settings.biometrics} onChange={(biometrics) => app.updateSettings({ biometrics })} />
      </Group>
      {!app.settings.appLock && (
        <div className="mt-4 space-y-2">
          <TextField label="Set a 4-digit PIN" value={pin} onChange={setPin} />
          <Button onClick={() => pin.length === 4 && app.enableLock(pin)}>Turn on App Lock</Button>
        </div>
      )}
      <div className="mt-4"><Button variant="danger" onClick={() => setConfirmClear(true)}>Clear on-device data</Button></div>
      <AlertDialog open={confirmClear} onClose={() => setConfirmClear(false)} title="Clear data?" message="This removes the safety plan, cart, and posts stored on this device." confirm="Clear" onConfirm={() => app.clearData()} />
    </Page>
  );
}

export function AppearanceScreen() {
  const app = useApp();
  return (
    <Page title="Appearance">
      <Group>
        {(["light", "dark", "system"] as const).map((theme) => (
          <ListRow key={theme} title={theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light"} trailing={app.settings.theme === theme ? <span className="text-link">On</span> : <span />} onClick={() => app.updateSettings({ theme })} />
        ))}
      </Group>
    </Page>
  );
}

export function AccessibilityScreen() {
  const app = useApp();
  const sizes = ["default", "large", "xl", "xxl"] as const;
  return (
    <Page title="Accessibility">
      <p className="footnote mb-2 text-muted-foreground">Text size follows a larger type scale, including body text.</p>
      <Group>
        {sizes.map((size) => <ListRow key={size} title={size} trailing={app.settings.textSize === size ? <span className="text-link">On</span> : <span />} onClick={() => app.updateSettings({ textSize: size })} />)}
        <SwitchRow label="Reduce motion" checked={app.settings.reduceMotion} onChange={(reduceMotion) => app.updateSettings({ reduceMotion })} />
        <SwitchRow label="Increase contrast" checked={app.settings.highContrast} onChange={(highContrast) => app.updateSettings({ highContrast })} />
      </Group>
    </Page>
  );
}

export function NotificationsScreen() {
  const app = useApp();
  const groups = ["Today", "Earlier"];
  const list = app.myNotices;
  return (
    <Page title="Notifications" large>
      {list.length === 0 && <EmptyState title="You’re caught up" body="Reminders use the wording “You have a new update.”" />}
      {groups.map((group) => {
        const rows = list.filter((n) => n.group === group);
        if (!rows.length) return null;
        return (
          <div key={group} className="mb-4">
            <p className="footnote mb-2 font-semibold text-muted-foreground">{group}</p>
            <div className="overflow-hidden rounded-2xl shadow-card">
              {rows.map((n) => (
                <SwipeRow key={n.id} onDelete={() => app.dismissNotice(n.id)}>
                  <div className="border-b border-divider bg-card px-4 py-3">
                    <p className="font-semibold">{app.settings.discreet || app.settings.hideNotificationContent ? "You have a new update" : n.title}</p>
                    <p className="footnote text-muted-foreground">{app.settings.discreet ? "Open the app to read it." : n.body}</p>
                    <p className="caption mt-1 text-muted-foreground">{n.time}</p>
                  </div>
                </SwipeRow>
              ))}
            </div>
          </div>
        );
      })}
    </Page>
  );
}

export function HelpScreen() {
  const go = useGo();
  const office = ORG.phone.replace(/\D/g, "");
  const next = [
    { title: "Safety plan", text: "A private checklist stored only on this phone.", icon: Shield, to: "/safety-plan" },
    { title: "Local shelters", text: "Call first. Street addresses are not listed.", icon: MapPin, to: "/shelters" },
    { title: "Leave this screen safely", text: "Quick Exit, then hold the city name to return.", icon: Lock, to: "/safety-tips" },
    { title: "Questions", text: "Ask the care team without sharing your address.", icon: MessageCircle, to: "/qa" },
  ];
  return (
    <Page title="Help">
      <div className="relative h-72 overflow-hidden rounded-lg">
        <Photo name="hero-hands" alt="" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#231f20] via-[#4a1d72]/72 to-[#231f20]/20" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white/80">Help & emergency</p>
          <h2 className="mt-1 text-[1.7rem] font-bold leading-tight">You are not alone</h2>
          <p className="mt-1 text-[0.95rem] leading-snug text-white/95">If you are in danger, call now. You can leave this screen in one tap.</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a href="tel:911" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white text-[0.95rem] font-semibold text-[#231f20]">Call 911</a>
            <a href={`tel:${ORG.hotlineTel}`} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white/15 text-[0.95rem] font-semibold text-white ring-1 ring-white/70">Hotline</a>
          </div>
        </div>
      </div>

      <a href={`tel:${ORG.hotlineTel}`} className="mt-3 block rounded-lg bg-card p-4 shadow-card">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">National Domestic Violence Hotline</p>
        <p className="mt-1 text-[1.45rem] font-bold leading-tight text-link">{ORG.hotline}</p>
        <p className="mt-1 text-[0.9rem] text-muted-foreground">Or text START to {ORG.sms}</p>
      </a>

      <a href={`tel:${office}`} className="mt-2 flex items-center gap-3 rounded-lg bg-card p-4 shadow-card">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary-100 text-link">
          <Phone size={18} aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block font-semibold">All Eyez Open</span>
          <span className="block text-[0.9rem] text-muted-foreground">{ORG.phone} · {ORG.hours}</span>
        </span>
        <ChevronRight className="ml-auto shrink-0 text-muted-foreground" size={18} aria-hidden />
      </a>

      <h2 className="mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Next steps</h2>
      <div className="mt-2 space-y-2">
        {next.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.to} type="button" onClick={() => go(item.to)} className="flex w-full items-center gap-3 rounded-lg bg-card p-3.5 text-left shadow-card">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary-100 text-link">
                <Icon size={18} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{item.title}</span>
                <span className="mt-0.5 block text-[0.85rem] leading-snug text-muted-foreground">{item.text}</span>
              </span>
              <ChevronRight className="shrink-0 text-muted-foreground" size={18} aria-hidden />
            </button>
          );
        })}
      </div>
    </Page>
  );
}

export function SheltersScreen() {
  return (
    <Page title="Local shelters">
      <p className="body-text text-muted-foreground">Call first. Street addresses of safe houses are not listed in the app.</p>
      <div className="mt-3 space-y-2">
        {shelters.map((s) => (
          <Card key={s.name} className="p-4">
            <p className="headline">{s.name}</p>
            <p className="footnote text-muted-foreground">{s.area}</p>
            <p className="callout mt-1">{s.note}</p>
            <a className="mt-2 inline-flex min-h-11 items-center font-semibold text-link" href={`tel:${s.phone.replace(/\D/g, "")}`}>{s.phone}</a>
          </Card>
        ))}
      </div>
    </Page>
  );
}

export function SafetyPlanScreen() {
  const app = useApp();
  const plan = app.safety;
  const update = (next: SafetyPlan) => app.updateSafety(next);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <Page title="Safety plan" large>
      <p className="body-text text-muted-foreground">Stored only on this device. Skip anything that doesn’t fit. If you are in immediate danger, call 911.</p>
      <h2 className="headline mt-4">Checklist</h2>
      <Group>
        {plan.checks.map((item) => (
          <SwitchRow key={item.id} label={item.label} checked={item.on} onChange={(on) => update({ ...plan, checks: plan.checks.map((c) => c.id === item.id ? { ...c, on } : c) })} />
        ))}
      </Group>
      <h2 className="headline mt-5">Emergency contacts</h2>
      {plan.contacts.map((c) => (
        <Card key={c.id} className="mt-2 flex items-center justify-between p-3">
          <span><span className="block font-semibold">{c.name}</span><a className="text-link" href={`tel:${c.phone.replace(/\D/g, "")}`}>{c.phone}</a></span>
          <button type="button" className="min-h-11 text-danger" onClick={() => update({ ...plan, contacts: plan.contacts.filter((x) => x.id !== c.id) })}>Remove</button>
        </Card>
      ))}
      <div className="mt-2 grid grid-cols-2 gap-2">
        <TextField label="Name" value={name} onChange={setName} />
        <TextField label="Phone" value={phone} onChange={setPhone} />
      </div>
      <Button variant="secondary" onClick={() => { if (!name || !phone) return; update({ ...plan, contacts: [...plan.contacts, { id: `c${Date.now()}`, name, phone }] }); setName(""); setPhone(""); }}>Add contact</Button>
      <h2 className="headline mt-5">Go-bag</h2>
      <Group>
        {plan.bag.map((item) => (
          <SwitchRow key={item.id} label={item.label} checked={item.on} onChange={(on) => update({ ...plan, bag: plan.bag.map((c) => c.id === item.id ? { ...c, on } : c) })} />
        ))}
      </Group>
      <p className="footnote mt-3 text-muted-foreground">Nothing in this plan is uploaded. Clear data in Privacy & Security removes it. Sample checklist inspired by common safety-planning practice, not a promise of safety.</p>
      <button type="button" className="mt-2 min-h-11 text-link" onClick={() => update(safetyDefaults)}>Reset checklist</button>
    </Page>
  );
}

export function AboutScreen() {
  const go = useGo();
  return (
    <Page title="About" large>
      <Logo className="h-28 w-28" />
      <p className="title-2 mt-3">{ORG.name}</p>
      <p className="callout text-link">{ORG.tagline}</p>
      {aboutSections.map((s) => <div key={s.title} className="mt-4"><h2 className="headline">{s.title}</h2><p className="body-text mt-1 text-muted-foreground">{s.text}</p></div>)}
      <div className="mt-4 overflow-hidden rounded-2xl bg-card shadow-card">
        <ListRow title="Impact" onClick={() => go("/impact")} />
        <ListRow title="Team" onClick={() => go("/team")} />
        <ListRow title="Volunteer" onClick={() => go("/volunteer")} />
        <ListRow title="Careers" onClick={() => go("/careers")} />
        <ListRow title="Privacy Policy" onClick={() => go("/privacy")} />
        <ListRow title="Terms of Use" onClick={() => go("/terms")} />
        <ListRow title="Confidentiality" onClick={() => go("/confidentiality")} />
        <ListRow title="Community guidelines" onClick={() => go("/guidelines")} />
        <ListRow title="Social" onClick={() => go("/social")} />
      </div>
      <p className="footnote mt-4 text-muted-foreground">Version 1.0 (preview) · {ORG.city}</p>
    </Page>
  );
}

export function ImpactScreen() {
  return (
    <Page title="Impact">
      <div className="grid grid-cols-2 gap-2">{impactStats.map((s) => <Card key={s.l} className="p-3"><p className="title-2 text-link">{s.n}</p><p className="footnote">{s.l}</p></Card>)}</div>
      <p className="body-text mt-4 text-muted-foreground">Figures are sample totals for this design preview, gathered from pantry nights, partner shelter stays, volunteer orientation, and the legal seminar roster for the past year.</p>
      <h2 className="headline mt-4">Partners</h2>
      {partners.map((p) => <p key={p} className="border-b border-divider py-3">{p}</p>)}
    </Page>
  );
}

export function TeamScreen() {
  const go = useGo();
  return (
    <Page title="Team">
      <div className="space-y-3">{staff.map((person) => (
        <Card key={person.id} className="flex gap-3 p-3">
          <Photo name={person.photo} alt="" className="h-16 w-16 rounded-full" />
          <span><span className="block font-semibold">{person.name}</span><span className="footnote text-link">{person.role}</span><span className="footnote mt-1 block text-muted-foreground">{person.bio}</span></span>
        </Card>
      ))}</div>
      <div className="mt-4"><Button variant="secondary" onClick={() => go("/lawyers/sp-jordan")}>Meet a legal advisor</Button></div>
    </Page>
  );
}

export function CareersScreen() {
  const go = useGo();
  return (
    <Page title="Careers">
      {careers.map((job) => <Card key={job.title} className="mb-3 p-4"><p className="headline">{job.title}</p><p className="footnote text-link">{job.type}</p><p className="callout mt-1">{job.text}</p></Card>)}
      <Button onClick={() => go("/contact")}>Ask about a role</Button>
    </Page>
  );
}

function Policy({ title, sections }: { title: string; sections: { title: string; text: string }[] }) {
  return (
    <Page title={title} large>
      <p className="footnote mb-3 text-muted-foreground">Sample statement for this preview. It is not a filed legal policy.</p>
      {sections.map((s) => <div key={s.title} className="mb-4"><h2 className="headline">{s.title}</h2><p className="body-text mt-1 text-muted-foreground">{s.text}</p></div>)}
    </Page>
  );
}

export function PrivacyScreen() { return <Policy title="Privacy Policy" sections={policies.privacy} />; }
export function TermsScreen() { return <Policy title="Terms of Use" sections={policies.terms} />; }
export function ConfidentialityScreen() { return <Policy title="Confidentiality" sections={policies.confidentiality} />; }

export function SocialScreen() {
  const app = useApp();
  const [link, setLink] = useState<(typeof socials)[number] | null>(null);
  return (
    <Page title="Follow us" large>
      <p className="body-text text-muted-foreground">Social links open in an in-app browser. Search results use the public name All Eyez Open.</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {socials.map((s) => (
          <button key={s.id} type="button" className="min-h-[3.25rem] rounded-2xl bg-card font-semibold shadow-card" onClick={() => setLink(s)}>{s.name}</button>
        ))}
      </div>
      <div className="mt-4"><Button variant="secondary" onClick={() => shareText("All Eyez Open", "You Are Not Alone — All Eyez Open, LLC").then(() => app.toast("Share sheet ready"))}><span className="inline-flex items-center gap-2"><Share2 size={18} /> Share the app</span></Button></div>
      <SafariSheet open={Boolean(link)} onClose={() => setLink(null)} title={link?.name ?? ""} url={link?.url ?? ""} />
    </Page>
  );
}

export function SitemapScreen() {
  const go = useGo();
  const groups = useMemo(() => sitemap, []);
  return (
    <Page title="Screen index" large>
      <p className="body-text text-muted-foreground">Every screen in this preview, with its path.</p>
      <div className="mt-3 overflow-hidden rounded-2xl bg-card shadow-card">
        {groups.map(([label, path]) => (
          <button key={path + label} type="button" className="flex min-h-12 w-full items-center justify-between border-b border-divider px-4 text-left last:border-0" onClick={() => go(path)}>
            <span>{label}</span>
            <span className="footnote text-muted-foreground">{path}</span>
          </button>
        ))}
      </div>
    </Page>
  );
}
