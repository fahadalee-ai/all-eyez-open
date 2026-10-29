import { createContext, useContext, useEffect, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import {
  demoUsers,
  safetyDefaults,
  seedBookings,
  seedDonations,
  seedNotices,
  seedOrders,
  seedPosts,
  seedQuestions,
  seedReviews,
  seedThreads,
  type ChatMessage,
  type Post,
  type Role,
  type Thread,
  type User,
} from "@/data/content";
import { uid } from "@/lib/haptic";

const KEY = "aeo-v1";

export type Settings = {
  theme: "light" | "dark" | "system";
  discreet: boolean;
  disguise: "weather" | "notes";
  appLock: boolean;
  pin: string;
  biometrics: boolean;
  textSize: "default" | "large" | "xl" | "xxl";
  reduceMotion: boolean;
  highContrast: boolean;
  language: "en" | "es";
  hideNotificationContent: boolean;
  quickExitSeen: boolean;
  notifConsult: boolean;
  notifCommunity: boolean;
  notifOrders: boolean;
  notifEvents: boolean;
  notifDonations: boolean;
};

export type Booking = {
  id: string;
  userId: string;
  type: string;
  mode: string;
  specialistId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  voicemail: boolean;
  textOk: boolean;
  contactTime: string;
  language: string;
  need: string;
  urgency: string;
  status: "upcoming" | "past" | "cancelled";
  rating?: number;
  review?: string;
  cancelReason?: string;
};

export type Donation = {
  id: string;
  userId: string;
  amount: number;
  fee: number;
  total: number;
  fund: string;
  frequency: string;
  date: string;
  anonymous: boolean;
  honor: string;
  status: string;
  recurring?: boolean;
};

export type CartLine = { productId: string; qty: number; variant: string };
export type OrderItem = { productId: string; title: string; qty: number; price: number; variant: string };
export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "Placed" | "Packed" | "Shipped" | "Delivered" | "Return requested";
  placed: string;
  address: string;
  discreet: boolean;
  timeline: string[];
  returnReason?: string;
};

export type Registration = { id: string; userId: string; programId: string; name: string; email: string; code: string; mode?: string };
export type Question = { id: string; userId: string; name: string; email: string; category: string; question: string; answer?: string; status: "Answered" | "Pending" };
export type Review = { id: string; name: string; stars: number; title: string; text: string; date: string; verified: boolean; area: string; photo: boolean; userId?: string };
export type Query = { id: string; name: string; email: string; phone: string; topic: string; message: string; safeCall: boolean; safeText: boolean; status: string };
export type Notice = { id: string; userId: string; type: string; title: string; body: string; time: string; group: string };
export type SafetyPlan = typeof safetyDefaults;
export type ConsultDraft = {
  type: string;
  mode: string;
  specialistId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  voicemail: boolean;
  textOk: boolean;
  contactTime: string;
  language: string;
  need: string;
  urgency: string;
};
export type DonateDraft = {
  fund: string;
  frequency: "One-time" | "Monthly";
  amount: number;
  custom: string;
  name: string;
  email: string;
  honor: string;
  anonymous: boolean;
  coverFees: boolean;
  method: "apple" | "card";
  card: string;
  exp: string;
  cvc: string;
  zip: string;
  receipt: boolean;
};

export type Toast = { id: number; title: string; body?: string };

const defaultSettings: Settings = {
  theme: "system",
  discreet: false,
  disguise: "weather",
  appLock: false,
  pin: "",
  biometrics: true,
  textSize: "default",
  reduceMotion: false,
  highContrast: false,
  language: "en",
  hideNotificationContent: true,
  quickExitSeen: false,
  notifConsult: true,
  notifCommunity: true,
  notifOrders: true,
  notifEvents: true,
  notifDonations: true,
};

export const emptyConsult = (): ConsultDraft => ({
  type: "",
  mode: "",
  specialistId: "",
  date: "",
  time: "",
  name: "",
  phone: "",
  voicemail: false,
  textOk: false,
  contactTime: "Afternoon",
  language: "English",
  need: "",
  urgency: "Routine",
});

export type Membership = {
  id: string;
  userId: string;
  planId: string;
  name: string;
  email: string;
  status: "Active" | "Paused" | "Canceled";
  started: string;
  renews: string;
  method: "apple" | "card";
};

export type SubscribeDraft = {
  planId: string;
  name: string;
  email: string;
  method: "apple" | "card";
};

export const emptySubscribe = (): SubscribeDraft => ({
  planId: "",
  name: "",
  email: "",
  method: "apple",
});

export const emptyDonate = (): DonateDraft => ({
  fund: "general",
  frequency: "One-time",
  amount: 25,
  custom: "",
  name: "",
  email: "",
  honor: "",
  anonymous: false,
  coverFees: false,
  method: "apple",
  card: "",
  exp: "",
  cvc: "",
  zip: "",
  receipt: true,
});

type State = {
  booted: boolean;
  users: User[];
  sessionId: string | null;
  guest: boolean;
  onboarded: boolean;
  settings: Settings;
  disguised: boolean;
  unlocked: boolean;
  bookings: Booking[];
  donations: Donation[];
  memberships: Membership[];
  subscribe: SubscribeDraft;
  posts: Post[];
  reacted: string[];
  cart: CartLine[];
  promo: string;
  orders: Order[];
  registrations: Registration[];
  threads: Thread[];
  questions: Question[];
  reviews: Review[];
  queries: Query[];
  notices: Notice[];
  safety: SafetyPlan;
  following: string[];
  blocked: string[];
  saved: string[];
  reported: string[];
  consult: ConsultDraft;
  donate: DonateDraft;
  pendingUserId: string | null;
  resetEmail: string;
  toasts: Toast[];
  offline: boolean;
  modules: Record<string, boolean>;
  lastBookingId: string;
  lastDonationId: string;
  lastMembershipId: string;
  lastOrderId: string;
};

function seedState(): State {
  return {
    booted: false,
    users: demoUsers,
    sessionId: null,
    guest: false,
    onboarded: false,
    settings: defaultSettings,
    disguised: false,
    unlocked: true,
    bookings: seedBookings as Booking[],
    donations: seedDonations.map((d) => ({ ...d, recurring: false })),
    memberships: [
      {
        id: "SUB-1001",
        userId: "u-ariel",
        planId: "neighbor",
        name: "Ariel",
        email: "ariel@alleyezopen.org",
        status: "Active",
        started: "Sep 29, 2026",
        renews: "Nov 29, 2026",
        method: "card",
      },
    ],
    subscribe: emptySubscribe(),
    posts: seedPosts,
    reacted: [],
    cart: [],
    promo: "",
    orders: seedOrders as Order[],
    registrations: [],
    threads: seedThreads,
    questions: seedQuestions as Question[],
    reviews: seedReviews,
    queries: [],
    notices: seedNotices,
    safety: safetyDefaults,
    following: [],
    blocked: [],
    saved: [],
    reported: [],
    consult: emptyConsult(),
    donate: emptyDonate(),
    pendingUserId: null,
    resetEmail: "",
    toasts: [],
    offline: false,
    modules: {},
    lastBookingId: "",
    lastDonationId: "",
    lastMembershipId: "",
    lastOrderId: "",
  };
}

type Store = ReturnType<typeof buildApi>;

const Ctx = createContext<Store | null>(null);

function buildApi(state: State, set: Dispatch<SetStateAction<State>>) {
  const user = state.users.find((u) => u.id === state.sessionId) ?? null;
  const owner = user?.id ?? (state.guest ? "guest" : "");

  const patch = (partial: Partial<State>) => set((s) => ({ ...s, ...partial }));

  const toast = (title: string, body?: string) => {
    const id = Date.now() + Math.random();
    set((s) => ({ ...s, toasts: [...s.toasts, { id, title, body }] }));
    setTimeout(() => set((s) => ({ ...s, toasts: s.toasts.filter((t) => t.id !== id) })), 3200);
  };

  return {
    ...state,
    user,
    locked: state.settings.appLock && !state.unlocked,
    myBookings: owner ? state.bookings.filter((b) => b.userId === owner) : [],
    myDonations: owner ? state.donations.filter((d) => d.userId === owner) : [],
    myMemberships: owner
      ? state.memberships.filter((m) => m.userId === owner)
      : state.memberships.filter((m) => m.userId === "guest"),
    myOrders: owner ? state.orders.filter((o) => o.userId === owner) : [],
    myQuestions: owner ? state.questions.filter((q) => q.userId === owner) : [],
    myNotices: state.notices.filter((n) => !owner || n.userId === owner || n.userId === "all"),
    unreadChat: state.threads.reduce((sum, t) => sum + t.unread, 0),
    toast,
    dismissToast: (id: number) => set((s) => ({ ...s, toasts: s.toasts.filter((t) => t.id !== id) })),
    setDisguised: (disguised: boolean) => patch({ disguised }),
    markOnboarded: () => patch({ onboarded: true }),
    markQuickExitSeen: () => set((s) => ({ ...s, settings: { ...s.settings, quickExitSeen: true } })),
    updateSettings: (partial: Partial<Settings>) => set((s) => ({ ...s, settings: { ...s.settings, ...partial } })),
    unlock: (pin?: string) => {
      if (pin && pin !== state.settings.pin) return false;
      sessionStorage.setItem("aeo-unlocked", "1");
      patch({ unlocked: true });
      return true;
    },
    enableLock: (pin: string) => {
      sessionStorage.setItem("aeo-unlocked", "1");
      set((s) => ({ ...s, unlocked: true, settings: { ...s.settings, appLock: true, pin } }));
      toast("App Lock is on");
    },
    login: (email: string, password: string) => {
      const found = state.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      if (!found || found.password !== password) return { ok: false as const };
      sessionStorage.setItem("aeo-unlocked", "1");
      patch({ sessionId: found.id, guest: false, onboarded: true, unlocked: true });
      return { ok: true as const };
    },
    loginApple: () => {
      let found = state.users.find((u) => u.email === "apple.user@alleyezopen.org");
      if (!found) {
        found = {
          id: uid("u"),
          name: "A. Rivera",
          nickname: "A.",
          email: "apple.user@alleyezopen.org",
          phone: "",
          password: "apple",
          role: "Survivor",
          language: "English",
        };
        set((s) => ({ ...s, users: [...s.users, found!], sessionId: found!.id, guest: false, onboarded: true, unlocked: true }));
      } else {
        patch({ sessionId: found.id, guest: false, onboarded: true, unlocked: true });
      }
      sessionStorage.setItem("aeo-unlocked", "1");
      return found;
    },
    continueAsGuest: () => {
      patch({ guest: true, sessionId: null, onboarded: true, unlocked: true });
    },
    register: (input: { name: string; nickname: string; email: string; phone: string; password: string; role: Role }) => {
      if (state.users.some((u) => u.email.toLowerCase() === input.email.trim().toLowerCase())) return { ok: false as const, reason: "exists" as const };
      const created: User = {
        id: uid("u"),
        name: input.name.trim(),
        nickname: (input.nickname || input.name).trim(),
        email: input.email.trim().toLowerCase(),
        phone: input.phone.trim(),
        password: input.password,
        role: input.role,
        language: "English",
      };
      set((s) => ({ ...s, users: [...s.users, created], pendingUserId: created.id, onboarded: true }));
      return { ok: true as const, email: created.email };
    },
    verifyOtp: () => {
      const id = state.pendingUserId;
      if (!id) return true;
      sessionStorage.setItem("aeo-unlocked", "1");
      patch({ sessionId: id, pendingUserId: null, guest: false, unlocked: true });
      return true;
    },
    requestReset: (email: string) => {
      const found = state.users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      patch({ resetEmail: email.trim().toLowerCase() });
      return found;
    },
    resetPassword: (password: string) => {
      set((s) => ({
        ...s,
        users: s.users.map((u) => (u.email === s.resetEmail ? { ...u, password } : u)),
      }));
      toast("Password updated");
    },
    logout: () => {
      sessionStorage.removeItem("aeo-unlocked");
      patch({ sessionId: null, guest: false, unlocked: !state.settings.appLock });
    },
    updateProfile: (partial: Partial<User>) => {
      if (!user) return;
      set((s) => ({ ...s, users: s.users.map((u) => (u.id === user.id ? { ...u, ...partial } : u)) }));
      toast("Profile saved");
    },
    patchConsult: (partial: Partial<ConsultDraft>) => set((s) => ({ ...s, consult: { ...s.consult, ...partial } })),
    confirmBooking: () => {
      const id = `AEO-${Math.floor(2000 + Math.random() * 7000)}`;
      const booking: Booking = {
        ...state.consult,
        id,
        userId: owner || "guest",
        specialistId: state.consult.specialistId || "none",
        status: "upcoming",
      };
      set((s) => ({
        ...s,
        bookings: [booking, ...s.bookings],
        lastBookingId: id,
        notices: [{ id: uid("n"), userId: booking.userId, type: "consult", title: "You have a new update", body: "A consultation is on your calendar.", time: "Just now", group: "Today" }, ...s.notices],
      }));
      toast("Consultation booked", "You have a new update.");
      return booking;
    },
    cancelBooking: (id: string, reason: string) => {
      set((s) => ({ ...s, bookings: s.bookings.map((b) => (b.id === id ? { ...b, status: "cancelled", cancelReason: reason } : b)) }));
      toast("Consultation cancelled");
    },
    reschedule: (id: string, date: string, time: string) => {
      set((s) => ({ ...s, bookings: s.bookings.map((b) => (b.id === id ? { ...b, date, time, status: "upcoming" } : b)) }));
      toast("Time updated");
    },
    rateBooking: (id: string, rating: number, review: string) => {
      set((s) => ({ ...s, bookings: s.bookings.map((b) => (b.id === id ? { ...b, rating, review } : b)) }));
      toast("Thank you for the feedback");
    },
    patchSubscribe: (partial: Partial<SubscribeDraft>) => set((s) => ({ ...s, subscribe: { ...s.subscribe, ...partial } })),
    confirmMembership: () => {
      const id = `SUB-${Math.floor(2000 + Math.random() * 7000)}`;
      const membership: Membership = {
        id,
        userId: owner || "guest",
        planId: state.subscribe.planId,
        name: state.subscribe.name,
        email: state.subscribe.email,
        status: "Active",
        started: "Oct 29, 2026",
        renews: "Nov 29, 2026",
        method: state.subscribe.method,
      };
      set((s) => ({ ...s, memberships: [membership, ...s.memberships], lastMembershipId: id }));
      toast("Subscription started", "A receipt is saved on this device.");
      return membership;
    },
    setMembershipStatus: (id: string, status: Membership["status"]) => {
      set((s) => ({ ...s, memberships: s.memberships.map((m) => (m.id === id ? { ...m, status } : m)) }));
      toast(status === "Paused" ? "Subscription paused" : status === "Canceled" ? "Subscription canceled" : "Subscription active");
    },
    patchDonate: (partial: Partial<DonateDraft>) => set((s) => ({ ...s, donate: { ...s.donate, ...partial } })),
    confirmDonation: () => {
      const amount = state.donate.amount;
      const fee = 0;
      const donation: Donation = {
        id: `DN-${Math.floor(3000 + Math.random() * 6000)}`,
        userId: owner || "guest",
        amount,
        fee,
        total: amount + fee,
        fund: state.donate.fund,
        frequency: state.donate.frequency,
        date: "Oct 29, 2026",
        anonymous: state.donate.anonymous,
        honor: state.donate.honor,
        status: "Receipt ready",
        recurring: state.donate.frequency === "Monthly",
      };
      set((s) => ({ ...s, donations: [donation, ...s.donations], lastDonationId: donation.id }));
      toast("You have a new update", "A receipt is ready on this device.");
      return donation;
    },
    cancelRecurring: (id: string) => {
      set((s) => ({ ...s, donations: s.donations.map((d) => (d.id === id ? { ...d, recurring: false, status: "Monthly gift stopped" } : d)) }));
      toast("Monthly gift stopped");
    },
    addPost: (input: { title: string; body: string; category: string; anonymous: boolean; requestLegal: boolean; trigger: boolean }) => {
      const post: Post = {
        id: uid("p"),
        author: input.anonymous || !user ? "Anonymous" : user.nickname,
        authorId: user?.id ?? "guest",
        anonymous: input.anonymous || !user,
        time: "Just now",
        category: input.category,
        title: input.title,
        body: input.body,
        support: 0,
        metoo: 0,
        trigger: input.trigger,
        requestLegal: input.requestLegal,
        resolved: false,
        comments: [],
      };
      set((s) => ({ ...s, posts: [post, ...s.posts] }));
      toast("Posted", "Your words are in the community.");
      return post;
    },
    react: (postId: string, kind: "support" | "metoo") => {
      const key = `${postId}:${kind}`;
      if (state.reacted.includes(key)) return;
      set((s) => ({
        ...s,
        reacted: [...s.reacted, key],
        posts: s.posts.map((p) => (p.id === postId ? { ...p, [kind]: p[kind] + 1 } : p)),
      }));
    },
    addComment: (postId: string, body: string, anonymous: boolean) => {
      const comment = {
        id: uid("c"),
        author: anonymous || !user ? "Anonymous" : user.nickname,
        authorId: user?.id ?? "guest",
        anonymous: anonymous || !user,
        role: "community" as const,
        body,
        time: "Just now",
        likes: 0,
      };
      set((s) => ({
        ...s,
        posts: s.posts.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p)),
      }));
    },
    lawyerReply: (postId: string, body: string) => {
      const spec = state.users.find((u) => u.id === state.sessionId);
      const comment = {
        id: uid("c"),
        author: spec?.name ?? "Jordan Hale",
        authorId: spec?.advisorId ?? "sp-jordan",
        role: "lawyer" as const,
        body: `${body} General information, not legal advice. This does not create an attorney-client relationship.`,
        time: "Just now",
        likes: 0,
        bar: "GA Bar 482917",
        jurisdiction: "Georgia",
      };
      set((s) => ({
        ...s,
        posts: s.posts.map((p) => (p.id === postId ? { ...p, resolved: true, comments: [comment, ...p.comments] } : p)),
      }));
      toast("Response published");
    },
    resolvePost: (postId: string) => set((s) => ({ ...s, posts: s.posts.map((p) => (p.id === postId ? { ...p, resolved: true } : p)) })),
    report: (postId: string) => {
      set((s) => ({ ...s, reported: [...s.reported, postId] }));
      toast("Report received", "Our team reviews reports within one business day.");
    },
    block: (authorId: string) => {
      set((s) => ({ ...s, blocked: [...s.blocked, authorId] }));
      toast("Person blocked");
    },
    toggleSave: (postId: string) => {
      set((s) => ({
        ...s,
        saved: s.saved.includes(postId) ? s.saved.filter((id) => id !== postId) : [...s.saved, postId],
      }));
    },
    toggleFollow: (authorId: string) => {
      set((s) => ({
        ...s,
        following: s.following.includes(authorId) ? s.following.filter((id) => id !== authorId) : [...s.following, authorId],
      }));
    },
    addToCart: (productId: string, variant: string) => {
      set((s) => {
        const found = s.cart.find((l) => l.productId === productId && l.variant === variant);
        const cart = found
          ? s.cart.map((l) => (l === found ? { ...l, qty: l.qty + 1 } : l))
          : [...s.cart, { productId, qty: 1, variant }];
        return { ...s, cart };
      });
      toast("Added to cart");
    },
    setQty: (productId: string, variant: string, qty: number) => {
      set((s) => ({
        ...s,
        cart: qty <= 0 ? s.cart.filter((l) => !(l.productId === productId && l.variant === variant)) : s.cart.map((l) => (l.productId === productId && l.variant === variant ? { ...l, qty } : l)),
      }));
    },
    applyPromo: (code: string) => {
      if (code.trim().toUpperCase() !== "WELCOME10") return false;
      patch({ promo: "WELCOME10" });
      toast("Code applied", "10% off this order.");
      return true;
    },
    placeOrder: (input: { address: string; discreet: boolean; items: OrderItem[]; total: number }) => {
      const id = `AEO-${Math.floor(2100 + Math.random() * 7000)}`;
      const order: Order = {
        id,
        userId: owner || "guest",
        items: input.items,
        total: input.total,
        status: "Placed",
        placed: "Oct 29, 2026",
        address: input.address,
        discreet: input.discreet,
        timeline: ["Placed"],
      };
      set((s) => ({ ...s, orders: [order, ...s.orders], cart: [], promo: "", lastOrderId: id }));
      toast("Order placed", "You have a new update.");
      return order;
    },
    requestReturn: (id: string, reason: string) => {
      set((s) => ({
        ...s,
        orders: s.orders.map((o) => (o.id === id ? { ...o, status: "Return requested", returnReason: reason, timeline: [...o.timeline, "Return requested"] } : o)),
      }));
      toast("Return requested");
    },
    reorder: (id: string) => {
      const order = state.orders.find((o) => o.id === id);
      if (!order) return;
      set((s) => ({
        ...s,
        cart: order.items.map((item) => ({ productId: item.productId, qty: item.qty, variant: item.variant })),
      }));
      toast("Items added to cart");
    },
    registerProgram: (programId: string, name: string, email: string, mode?: string) => {
      const reg: Registration = { id: uid("rg"), userId: owner || "guest", programId, name, email, code: uid("TK").slice(0, 8).toUpperCase(), mode };
      set((s) => ({ ...s, registrations: [reg, ...s.registrations] }));
      toast("You're registered");
      return reg;
    },
    sendMessage: (threadId: string, text: string) => {
      const message: ChatMessage = { id: uid("m"), from: "me", text, time: "Now" };
      set((s) => ({
        ...s,
        threads: s.threads.map((t) => (t.id === threadId ? { ...t, unread: 0, messages: [...t.messages, message] } : t)),
      }));
    },
    receiveMessage: (threadId: string, text: string) => {
      const message: ChatMessage = { id: uid("m"), from: "them", text, time: "Now" };
      set((s) => ({
        ...s,
        threads: s.threads.map((t) => (t.id === threadId ? { ...t, messages: [...t.messages, message] } : t)),
      }));
    },
    startThread: (topic: string) => {
      const id = uid("th");
      const thread: Thread = {
        id,
        title: "Support Team",
        role: topic,
        photo: "avatar-ruth",
        online: true,
        unread: 0,
        disappearing: false,
        messages: [{ id: uid("m"), from: "them", text: `I'm here. You selected “${topic}.” Share only what feels safe.`, time: "Now" }],
      };
      set((s) => ({ ...s, threads: [thread, ...s.threads] }));
      return id;
    },
    startConsultChat: (person?: { name: string; role: string; photo?: string }) => {
      const id = uid("th");
      const title = person?.name ?? "Care team";
      const intro = person
        ? `You are chatting with ${person.name}, ${person.role}. Typically reply within business hours.`
        : "You are chatting with the care team. No preference was selected. Typically reply within business hours.";
      const thread: Thread = {
        id,
        title,
        role: person ? `${person.role} · Secure chat` : "No preference · Secure chat",
        photo: person?.photo ?? "avatar-ruth",
        online: false,
        unread: 0,
        disappearing: false,
        messages: [{ id: uid("m"), from: "them", text: intro, time: "Now" }],
      };
      set((s) => ({ ...s, threads: [thread, ...s.threads] }));
      return id;
    },
    deleteThread: (id: string) => set((s) => ({ ...s, threads: s.threads.filter((t) => t.id !== id) })),
    toggleDisappearing: (id: string) => set((s) => ({ ...s, threads: s.threads.map((t) => (t.id === id ? { ...t, disappearing: !t.disappearing } : t)) })),
    clearThread: (id: string) => set((s) => ({ ...s, threads: s.threads.map((t) => (t.id === id ? { ...t, messages: [] } : t)) })),
    markThreadRead: (id: string) => set((s) => ({ ...s, threads: s.threads.map((t) => (t.id === id ? { ...t, unread: 0 } : t)) })),
    askQuestion: (input: { name: string; email: string; category: string; question: string }) => {
      const q: Question = { id: uid("q"), userId: owner || "guest", ...input, status: "Pending" };
      set((s) => ({ ...s, questions: [q, ...s.questions] }));
      toast("Question sent", "You have a new update when we reply.");
      return q;
    },
    addReview: (input: { stars: number; title: string; text: string; anonymous: boolean; area: string }) => {
      const review: Review = {
        id: uid("r"),
        name: input.anonymous || !user ? "Anonymous" : user.nickname,
        stars: input.stars,
        title: input.title,
        text: input.text,
        date: "Oct 29, 2026",
        verified: Boolean(user),
        area: input.area,
        photo: false,
        userId: owner,
      };
      set((s) => ({ ...s, reviews: [review, ...s.reviews] }));
      toast("Review shared");
    },
    submitQuery: (input: Omit<Query, "id" | "status">) => {
      const query: Query = { ...input, id: uid("qy"), status: "Open" };
      set((s) => ({ ...s, queries: [query, ...s.queries] }));
      toast("Message sent");
      return query;
    },
    dismissNotice: (id: string) => set((s) => ({ ...s, notices: s.notices.filter((n) => n.id !== id) })),
    updateSafety: (safety: SafetyPlan) => patch({ safety }),
    toggleModule: (id: string) => set((s) => ({ ...s, modules: { ...s.modules, [id]: !s.modules[id] } })),
    clearData: () => {
      const next = { ...seedState(), booted: true, onboarded: true, settings: { ...defaultSettings, quickExitSeen: true } };
      patch(next);
      toast("On-device data cleared");
    },
    deleteAccount: () => {
      const id = state.sessionId;
      sessionStorage.removeItem("aeo-unlocked");
      set((s) => ({
        ...seedState(),
        booted: true,
        onboarded: true,
        users: demoUsers.filter((u) => u.id !== id).concat(s.users.filter((u) => u.id !== id && !demoUsers.some((d) => d.id === u.id))),
        sessionId: null,
        guest: false,
        settings: { ...defaultSettings, quickExitSeen: true },
      }));
      toast("Account deleted on this device");
    },
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(seedState);
  const api = useMemo(() => buildApi(state, setState), [state]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<State>;
        const appLock = parsed.settings?.appLock;
        const unlocked = !appLock || sessionStorage.getItem("aeo-unlocked") === "1";
        setState((s) => ({ ...s, ...parsed, booted: true, disguised: false, toasts: [], offline: !navigator.onLine, unlocked }));
      } else {
        setState((s) => ({ ...s, booted: true, offline: !navigator.onLine }));
      }
    } catch {
      setState((s) => ({ ...s, booted: true }));
    }
  }, []);

  useEffect(() => {
    if (!state.booted) return;
    const { booted, disguised, toasts, offline, ...rest } = state;
    localStorage.setItem(KEY, JSON.stringify(rest));
    localStorage.setItem("aeo-settings", JSON.stringify(rest.settings));
  }, [state]);

  useEffect(() => {
    const root = document.documentElement;
    const theme = state.settings.theme;
    const apply = (dark: boolean) => root.classList.toggle("dark", dark);
    if (theme === "dark") apply(true);
    else if (theme === "light") apply(false);
    else apply(window.matchMedia("(prefers-color-scheme: dark)").matches);
    root.dataset.text = state.settings.textSize;
    root.classList.toggle("reduce-motion", state.settings.reduceMotion);
    root.classList.toggle("contrast", state.settings.highContrast);
    root.lang = state.settings.language === "es" ? "es" : "en";
    document.title = state.settings.discreet ? "Notes" : "All Eyez Open";
  }, [state.settings, state.booted]);

  useEffect(() => {
    const on = () => setState((s) => ({ ...s, offline: !navigator.onLine }));
    window.addEventListener("online", on);
    window.addEventListener("offline", on);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", on);
    };
  }, []);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

