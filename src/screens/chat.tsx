import { useState } from "react";
import { Paperclip } from "lucide-react";
import { ActionSheet, Avatar, Button, EmptyState, SearchField, Sheet } from "@/components/ios/ui";
import { Page } from "@/components/ios/shell";
import { useGo } from "@/lib/nav";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ChatListScreen() {
  const app = useApp();
  const go = useGo();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const threads = app.threads.filter((t) => t.title.toLowerCase().includes(q.toLowerCase()) || t.role.toLowerCase().includes(q.toLowerCase()));
  return (
    <Page title="Chat" large back={false}>
      <p className="mb-3 rounded-xl bg-primary-50 p-3 text-[0.9375rem] leading-snug">End-to-end private. In an emergency call 911.</p>
      <SearchField value={q} onChange={setQ} placeholder="Search conversations" />
      <div className="mt-3 overflow-hidden rounded-2xl bg-card shadow-card">
        {threads.length === 0 && <EmptyState title="No conversations" body="Start with the support team. You can delete a chat later." action="New chat" onAction={() => setOpen(true)} />}
        {threads.map((thread) => (
          <button key={thread.id} type="button" className="flex w-full items-center gap-3 border-b border-divider px-3 py-3 text-left last:border-0" onClick={() => { app.markThreadRead(thread.id); go(`/chat/${thread.id}`); }}>
            <span className="relative">
              <Avatar name={thread.title} photoName={thread.photo} size={48} />
              {thread.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-[#1f7a52]" aria-label="Online" />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex justify-between"><span className="font-semibold">{thread.title}</span>{thread.unread > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[0.75rem] text-white">{thread.unread}</span>}</span>
              <span className="footnote block truncate text-muted-foreground">{thread.role} · {thread.messages.at(-1)?.text}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="mt-4"><Button onClick={() => setOpen(true)}>Start a new chat</Button></div>
      <Sheet open={open} onClose={() => setOpen(false)} title="What do you need?" detent="medium">
        {["General support", "Housing", "Counseling", "Legal information", "Orders & donations"].map((topic) => (
          <button key={topic} type="button" className="min-h-12 w-full border-b border-divider text-left text-[1.0625rem]" onClick={() => { const id = app.startThread(topic); setOpen(false); go(`/chat/${id}`); }}>{topic}</button>
        ))}
      </Sheet>
    </Page>
  );
}

export function ChatThreadScreen({ id }: { id: string }) {
  const app = useApp();
  const thread = app.threads.find((t) => t.id === id);
  const [text, setText] = useState("");
  const [menu, setMenu] = useState(false);
  const go = useGo();

  if (!thread) return <Page title="Chat"><EmptyState title="Conversation closed" body="Start a new one with the support team." action="All chats" onAction={() => go("/chat")} /></Page>;

  const send = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    app.sendMessage(id, trimmed);
    setText("");
  };

  return (
    <Page
      title={thread.title}
      fallback="/chat"
      right={<button type="button" className="min-h-11 px-2 text-[0.9375rem] font-semibold text-link" onClick={() => setMenu(true)}>More</button>}
      footer={
        <form className="flex items-end gap-2" onSubmit={(e) => { e.preventDefault(); send(text); }}>
            <label className="grid h-11 w-11 place-items-center text-link">
              <Paperclip size={18} />
              <span className="sr-only">Attach</span>
              <input type="file" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) app.sendMessage(id, `Attached: ${file.name}`); }} />
            </label>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Message" aria-label="Message" className="min-h-11 flex-1 rounded-lg border border-divider bg-card px-4 text-[1.0625rem]" />
            <button type="submit" className="min-h-11 rounded-lg px-3 font-semibold text-link">Send</button>
          </form>
      }
    >
      <p className="mb-3 rounded-xl bg-primary-50 p-3 text-[0.8125rem] leading-snug">End-to-end private. In an emergency call 911.</p>
      {thread.role.includes("Secure chat") && (
        <div className="mb-3 rounded-lg bg-card px-4 py-3 shadow-card">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">You are chatting with</p>
          <p className="mt-1 text-[1.05rem] font-semibold">{thread.title}</p>
          <p className="mt-0.5 text-[0.9rem] text-muted-foreground">{thread.role.replace(" · Secure chat", "")}</p>
          <p className="mt-2 text-[0.95rem] leading-snug">Typically reply within business hours.</p>
        </div>
      )}
      <div className="space-y-2">
        {thread.messages.map((message) => (
          <div key={message.id} className={cn("flex", message.from === "me" ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[80%] rounded-2xl px-3 py-2", message.from === "me" ? "rounded-br-md bg-primary text-white" : "rounded-bl-md bg-muted text-foreground")}>
              <p className="text-[1.0625rem] leading-snug">{message.text}</p>
              <p className={cn("mt-1 text-[0.75rem]", message.from === "me" ? "text-white/75" : "text-muted-foreground")}>{message.time}</p>
            </div>
          </div>
        ))}
      </div>
      <ActionSheet
        open={menu}
        onClose={() => setMenu(false)}
        title={thread.title}
        actions={[{ label: "Delete conversation", destructive: true, onSelect: () => { app.deleteThread(thread.id); go("/chat"); } }]}
      />
    </Page>
  );
}
