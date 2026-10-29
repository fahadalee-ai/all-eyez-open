import { useState } from "react";
import { createPortal } from "react-dom";
import { Flag, Heart, MessageCircle, Plus, Bookmark } from "lucide-react";
import { categories, guidelines, reportReasons, specialists } from "@/data/content";
import { ActionSheet, Avatar, Badge, Button, Card, Chip, ContextMenu, EmptyState, Photo, SearchField, Sheet, SwitchRow, TextArea, TextField } from "@/components/ios/ui";
import { useFrame } from "@/components/ios/frame";
import { Page } from "@/components/ios/shell";
import { useGo } from "@/lib/nav";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export function CommunityScreen() {
  const app = useApp();
  const go = useGo();
  const frame = useFrame();
  const [feed, setFeed] = useState("Latest");
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [loading] = useState(false);
  let posts = app.posts.filter((p) => !app.blocked.includes(p.authorId));
  if (cat !== "All") posts = posts.filter((p) => p.category === cat);
  if (q) posts = posts.filter((p) => `${p.title} ${p.body}`.toLowerCase().includes(q.toLowerCase()));
  if (feed === "Latest") {
    const rank = (category: string) => (category === "Domestic violence" ? 0 : category === "Harassment" ? 1 : 2);
    posts = [...posts].sort((a, b) => rank(a.category) - rank(b.category));
  }
  if (feed === "Popular") posts = [...posts].sort((a, b) => b.support - a.support);
  if (feed === "Following") posts = posts.filter((p) => app.following.includes(p.authorId));
  if (feed === "Legal Q&A") posts = posts.filter((p) => p.category === "Legal" || p.requestLegal);

  return (
    <Page title="Community" large back={false}>
      <div role="tablist" aria-label="Feed" className="grid grid-cols-4 gap-1 rounded-lg bg-muted p-1">
        {[["Latest", "Latest"], ["Popular", "Popular"], ["Following", "Following"], ["Legal Q&A", "Legal"]].map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={feed === id} onClick={() => setFeed(id)} className={cn("min-h-9 rounded-lg px-1 text-[0.75rem] font-semibold", feed === id ? "bg-card text-foreground shadow-card" : "text-muted-foreground")}>{label}</button>
        ))}
      </div>
      <div className="mt-3"><SearchField value={q} onChange={setQ} placeholder="Search stories" /></div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        <Chip selected={cat === "All"} onClick={() => setCat("All")}>All</Chip>
        {categories.map((c) => <Chip key={c} selected={cat === c} onClick={() => setCat(c)}>{c}</Chip>)}
      </div>
      {app.user?.role === "Advisor" && (
        <button type="button" className="mb-3 flex w-full items-center justify-between rounded-lg bg-primary px-4 py-3 text-left text-white" onClick={() => go("/professional")}>
          <span>
            <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/80">Advisor queue</span>
            <span className="block text-[1.02rem] font-semibold">Needs a response</span>
          </span>
          <span className="text-[1.35rem] font-bold">{app.posts.filter((p) => p.requestLegal && !p.resolved).length}</span>
        </button>
      )}
      {loading ? <div className="h-40 animate-pulse rounded-2xl bg-muted" /> : posts.length === 0 ? (
        <EmptyState title={feed === "Following" ? "You’re not following anyone yet" : "Nothing in this view"} body="Try another filter, or share something that stays free of identifying details." action="Share" onAction={() => go("/community/new")} />
      ) : (
        <div className="space-y-3 pb-16">
          {posts.map((post) => (
            <ContextMenu key={post.id} items={[
              { label: app.saved.includes(post.id) ? "Unsave" : "Save", onSelect: () => app.toggleSave(post.id) },
              { label: "Share", onSelect: () => app.toast("Link copied") },
              { label: "Report", destructive: true, onSelect: () => app.report(post.id) },
              { label: "Hide", destructive: true, onSelect: () => app.block(post.authorId) },
            ]}>
              <PostCard id={post.id} />
            </ContextMenu>
          ))}
        </div>
      )}
      {frame && createPortal(
        <button type="button" aria-label="Share" className="absolute bottom-24 right-4 z-10 grid h-14 w-14 place-items-center rounded-lg bg-primary text-white shadow-card" onClick={() => go("/community/new")}>
          <Plus />
        </button>,
        frame,
      )}
      <div className="pb-2 text-center"><button type="button" className="min-h-11 text-[0.9375rem] font-semibold text-link" onClick={() => go("/guidelines")}>Community guidelines</button></div>
    </Page>
  );
}

function PostCard({ id }: { id: string }) {
  const app = useApp();
  const go = useGo();
  const post = app.posts.find((p) => p.id === id);
  const [reveal, setReveal] = useState(false);
  if (!post) return null;
  const advocate = post.comments.find((c) => c.role === "lawyer" || c.role === "counselor");
  const reported = app.reported.includes(post.id);
  if (reported) return <Card className="p-4"><p className="font-semibold">Content under review</p><p className="mt-1 text-[0.875rem] leading-snug text-muted-foreground">Thanks for the report. This post is hidden while moderators look.</p></Card>;
  return (
    <Card className="overflow-hidden p-0" onClick={() => go(`/community/${post.id}`)} label={post.title}>
      <div className="p-4">
        <div className="flex items-center gap-2.5">
          <Avatar name={post.author} anonymous={post.anonymous} photoName={post.avatar} />
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{post.anonymous ? "Anonymous" : post.author}</p>
            <p className="text-[0.75rem] text-muted-foreground">{post.time}</p>
          </div>
          <Badge>{post.category}</Badge>
        </div>
        <p className="mt-3 text-[1.05rem] font-semibold leading-snug">{post.title}</p>
        {post.trigger && !reveal ? (
          <span role="button" tabIndex={0} className="mt-2 block text-[0.9375rem] font-semibold text-link" onClick={(e) => { e.stopPropagation(); setReveal(true); }} onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); setReveal(true); } }}>Tap to view · this post mentions a hard week</span>
        ) : (
          <p className="mt-1.5 line-clamp-3 text-[0.9rem] leading-snug text-muted-foreground">{post.body}</p>
        )}
      </div>
      <div className="flex items-center gap-4 border-t border-divider px-4 py-2.5 text-[0.8125rem] font-medium text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Heart size={15} className="text-primary" /> {post.support}</span>
        <span>{post.metoo} Me too</span>
        <span className="inline-flex items-center gap-1"><MessageCircle size={15} /> {post.comments.length}</span>
      </div>
      {advocate && <p className="bg-primary-50 px-4 py-2 text-[0.8125rem] font-semibold text-link">Advocate {advocate.author.replace(/^Advocate\s+/i, "")} replied · General information, not legal advice</p>}
    </Card>
  );
}

export function PostDetailScreen({ id }: { id: string }) {
  const app = useApp();
  const go = useGo();
  const post = app.posts.find((p) => p.id === id);
  const [text, setText] = useState("");
  const [anon, setAnon] = useState(true);
  const [report, setReport] = useState(false);
  const [composer, setComposer] = useState(false);
  const [reveal, setReveal] = useState(false);
  if (!post) return <Page title="Post"><EmptyState title="Post unavailable" body="It may have been removed." action="Community" onAction={() => go("/community")} /></Page>;
  if (app.blocked.includes(post.authorId)) {
    return <Page title="Post"><EmptyState title="You blocked this person" body="Their posts stay hidden on this device." action="Community" onAction={() => go("/community")} /></Page>;
  }
  const lawyers = post.comments.filter((c) => c.role === "lawyer" || c.role === "counselor");
  const rest = post.comments.filter((c) => c.role === "community");
  return (
    <Page title="Story" footer={<Button onClick={() => setComposer(true)}>Comment</Button>}>
      <div className="rounded-lg bg-card p-4 shadow-card">
        <div className="flex items-center gap-3">
          <Avatar name={post.author} anonymous={post.anonymous} photoName={post.avatar} size={44} />
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{post.anonymous ? "Anonymous" : post.author}</p>
            <p className="text-[0.75rem] text-muted-foreground">{post.time}</p>
          </div>
          <Badge>{post.category}</Badge>
        </div>
        <h1 className="mt-3 text-[1.35rem] font-bold leading-tight">{post.title}</h1>
        {post.trigger && !reveal ? <Button variant="secondary" className="mt-3" onClick={() => setReveal(true)}>Tap to view</Button> : <p className="mt-2 text-[1.02rem] leading-relaxed">{post.body}</p>}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Chip selected onClick={() => app.react(post.id, "support")}>Support {post.support}</Chip>
        <Chip onClick={() => app.react(post.id, "metoo")}>Me too {post.metoo}</Chip>
        <button type="button" aria-label="Save" className="ml-auto grid h-11 w-11 place-items-center rounded-lg bg-card text-foreground shadow-card" onClick={() => app.toggleSave(post.id)}><Bookmark size={18} /></button>
        <button type="button" aria-label="Report" className="grid h-11 w-11 place-items-center rounded-lg bg-card text-foreground shadow-card" onClick={() => setReport(true)}><Flag size={18} /></button>
      </div>
      {!post.anonymous && <button type="button" className="mt-2 min-h-11 font-semibold text-link" onClick={() => app.toggleFollow(post.authorId)}>{app.following.includes(post.authorId) ? "Following" : "Follow"}</button>}
      <h2 className="mt-6 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Advocate responses</h2>
      {lawyers.length === 0 && <p className="mt-2 rounded-lg bg-card px-4 py-3 text-[0.9rem] text-muted-foreground shadow-card">No advocate reply yet.</p>}
      {lawyers.map((c) => {
        const advocateName = `Advocate ${c.author.replace(/^Advocate\s+/i, "")}`;
        return (
        <article key={c.id} className="mt-2 rounded-lg bg-primary-50 p-4">
          <button type="button" className="flex items-center gap-2.5" onClick={() => go(`/lawyers/${c.authorId}`)}>
            <Avatar name={c.author} photoName={specialists.find((s) => s.id === c.authorId)?.photo} />
            <span className="text-left">
              <span className="block font-semibold">{advocateName}</span>
              <Badge tone="green">{c.role === "lawyer" ? "Verified Attorney" : "Care team"}</Badge>
            </span>
          </button>
          {c.bar && <p className="mt-2 text-[0.75rem] text-muted-foreground">{c.bar} · {c.jurisdiction}</p>}
          <p className="mt-2 text-[1rem] leading-relaxed">{c.body}</p>
          <p className="mt-2 text-[0.8125rem] font-semibold">General information, not legal advice. Connect with this advocate if you want the next step in private.</p>
          <p className="text-[0.75rem] text-muted-foreground">{c.likes} found this useful · {c.time}</p>
          <button type="button" className="mt-3 min-h-11 w-full rounded-lg bg-primary text-[0.95rem] font-semibold text-white" onClick={() => go(`/lawyers/${c.authorId}`)}>Connect with {advocateName}</button>
        </article>
        );
      })}
      <h2 className="mt-6 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Community comments</h2>
      {rest.length === 0 && <p className="mt-2 text-[0.9rem] text-muted-foreground">Be the first kind reply.</p>}
      <div className="mt-2 space-y-2">
      {rest.map((c) => (
        <div key={c.id} className="rounded-lg bg-card p-4 shadow-card">
          <p className="font-semibold">{c.anonymous ? "Anonymous" : c.author} <span className="font-normal text-muted-foreground">· {c.time}</span></p>
          <p className="mt-1 text-[0.95rem] leading-snug">{c.body}</p>
          <div className="mt-2 flex gap-3">
            <span className="text-[0.8125rem] text-muted-foreground">Like · {c.likes}</span>
            <button type="button" className="text-[0.8125rem] font-semibold text-danger" onClick={() => app.report(post.id)}>Report</button>
          </div>
          {c.replies?.map((r) => (
            <div key={r.id} className="ml-3 mt-3 border-l-2 border-divider pl-3">
              <p className="font-semibold">{r.anonymous ? "Anonymous" : r.author}</p>
              <p className="text-[0.95rem] leading-snug">{r.body}</p>
            </div>
          ))}
        </div>
      ))}
      </div>
      <Sheet open={composer} onClose={() => setComposer(false)} title="Comment">
        <TextArea label="Your reply" value={text} onChange={setText} hint="Do not share an address, phone, or workplace." />
        <div className="mt-2 overflow-hidden rounded-2xl bg-muted"><SwitchRow label="Post anonymously" checked={anon} onChange={setAnon} /></div>
        <div className="mt-3"><Button onClick={() => { const next = text.trim() || "Thank you for sharing."; app.addComment(post.id, next, anon); setText(""); setComposer(false); }}>Post comment</Button></div>
      </Sheet>
      <ActionSheet open={report} onClose={() => setReport(false)} title="Report this post" message="Moderators review reports within one business day." actions={reportReasons.map((label) => ({ label, destructive: label !== "Someone is in immediate danger", onSelect: () => app.report(post.id) }))} />
    </Page>
  );
}

export function CreatePostScreen() {
  const app = useApp();
  const go = useGo();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("Healing");
  const [anonymous, setAnonymous] = useState(true);
  const [legal, setLegal] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [agree, setAgree] = useState(true);
  return (
    <Page
      title="Share"
      fallback="/community"
      footer={<Button onClick={() => {
        if (!app.user) { go("/welcome"); return; }
        const post = app.addPost({ title: title.trim() || "A question for the community", body: body.trim() || "I would like some guidance.", category, anonymous, requestLegal: legal, trigger });
        go(`/community/${post.id}`);
      }}>Post</Button>}
    >
      <p className="mb-4 rounded-lg bg-[#fff6e8] p-3.5 text-[0.9375rem] leading-snug text-[#5c4308] dark:bg-[#3a3220] dark:text-[#f3e2b0]">Leave out your address, phone, workplace, and case number. Anonymous is on by default.</p>
      <div className="space-y-4">
        <TextField label="Title" value={title} onChange={setTitle} placeholder="What do you want to understand?" />
        <div>
          <p className="mb-2 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Topic</p>
          <div className="flex flex-wrap gap-2">{categories.map((c) => <Chip key={c} selected={category === c} onClick={() => setCategory(c)}>{c}</Chip>)}</div>
        </div>
        <TextArea label="Your story" value={body} onChange={setBody} hint="What would help this week? Skip identifying details." />
        <div className="overflow-hidden rounded-lg bg-card shadow-card">
          <SwitchRow label="Post anonymously" detail="Your name and photo stay hidden." checked={anonymous} onChange={setAnonymous} />
          <SwitchRow label="Request legal guidance" detail="A verified lawyer may reply with general information." checked={legal} onChange={setLegal} />
          <SwitchRow label="Trigger warning" detail="Readers tap before the story opens." checked={trigger} onChange={setTrigger} />
          <SwitchRow label="Community guidelines" detail="Kind, confidential, and free of contact details." checked={agree} onChange={setAgree} />
        </div>
        <label className="block rounded-lg bg-card px-4 py-3 text-[0.9375rem] font-semibold shadow-card">
          Add an image
          <span className="mt-0.5 block text-[0.8125rem] font-normal text-muted-foreground">Optional. Photos stay on this device.</span>
          <input type="file" accept="image/*" className="mt-2 block w-full text-[0.8125rem] font-normal text-muted-foreground" />
        </label>
      </div>
    </Page>
  );
}

export function GuidelinesScreen() {
  return (
    <Page title="Community guidelines">
      <p className="mb-3 text-[0.95rem] leading-snug text-muted-foreground">These keep the room safe for people who are rebuilding.</p>
      <div className="overflow-hidden rounded-lg bg-card shadow-card">
        {guidelines.map((g, i) => (
          <div key={g.title} className="flex gap-3 border-b border-divider px-4 py-3.5 last:border-0">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary text-[0.8125rem] font-bold text-white">{i + 1}</span>
            <span>
              <span className="block font-semibold">{g.title}</span>
              <span className="mt-0.5 block text-[0.9rem] leading-snug text-muted-foreground">{g.text}</span>
            </span>
          </div>
        ))}
      </div>
    </Page>
  );
}

export function LawyerScreen({ id }: { id: string }) {
  const person = specialists.find((s) => s.id === id) ?? specialists[0];
  const go = useGo();
  const app = useApp();
  return (
    <Page title={`Advocate ${person.name}`} footer={<Button onClick={() => { app.patchConsult({ type: person.role === "Attorney" ? "legal" : "counseling", specialistId: person.id }); go("/consult/mode"); }}>Connect · Book a consult</Button>}>
      <div className="rounded-lg bg-card p-4 shadow-card">
        <div className="flex items-center gap-3">
          <Photo name={person.photo} alt="" className="h-20 w-20 rounded-lg" />
          <div className="min-w-0">
            <Badge tone="green">Verified</Badge>
            <p className="mt-1 text-[1.25rem] font-bold leading-tight">Advocate {person.name}</p>
            <p className="text-[0.875rem] text-muted-foreground">{person.role} · {person.years} years</p>
          </div>
        </div>
        <p className="mt-3 text-[1rem] leading-relaxed">{person.bio}</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          ["Specialty", person.specialty],
          ["Languages", person.languages],
          ["Jurisdiction", person.jurisdictions],
          ["Credential", person.bar],
          ["Rating", `${person.rating.toFixed(1)} / 5`],
          ["Responses", String(person.responses)],
          ["Next opening", person.next],
        ].map(([k, v]) => (
          <div key={k} className={cn("rounded-lg bg-card p-3 shadow-card", k === "Next opening" && "col-span-2")}>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{k}</p>
            <p className="mt-0.5 font-semibold leading-snug">{v}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-primary-50 p-3 text-[0.875rem] leading-snug">General information, not legal advice, until you engage this professional separately.</p>
    </Page>
  );
}

export function ProfessionalScreen() {
  const app = useApp();
  const go = useGo();
  const [reply, setReply] = useState("You can ask the court clerk for the local petition and a confidential clinic can sit with you while you read it.");
  const queue = app.posts.filter((p) => p.requestLegal && !p.resolved);
  if (app.user?.role !== "Advisor") {
    return (
      <Page title="Professional view">
        <EmptyState title="Advisor preview" body="Log in as jordan@alleyezopen.org to see the response queue." action="Log in" onAction={() => go("/welcome")} />
      </Page>
    );
  }
  return (
    <Page title="Needs a response">
      <p className="mb-3 text-[0.9rem] leading-snug text-muted-foreground">Replies are general information. They do not create an attorney-client relationship.</p>
      {queue.length === 0 && <EmptyState title="Queue clear" body="Every legal request in this preview has a reply." />}
      {queue.map((post) => (
        <article key={post.id} className="mb-3 rounded-lg bg-card p-4 shadow-card">
          <Badge>{post.category}</Badge>
          <p className="mt-2 text-[1.05rem] font-semibold leading-snug">{post.title}</p>
          <p className="mt-1 line-clamp-4 text-[0.9rem] leading-snug text-muted-foreground">{post.body}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Forms are available from the clerk.", "A consult can walk through the steps generally.", "Please don’t post your address here."].map((t) => (
              <Chip key={t} onClick={() => setReply(t)}>{t.slice(0, 22)}…</Chip>
            ))}
          </div>
          <div className="mt-3"><TextArea label="Response" value={reply} onChange={setReply} /></div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button onClick={() => app.lawyerReply(post.id, reply)}>Publish</Button>
            <Button variant="secondary" onClick={() => app.resolvePost(post.id)}>Mark resolved</Button>
          </div>
        </article>
      ))}
    </Page>
  );
}
