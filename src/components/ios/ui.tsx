import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Search,
  Star,
  X,
} from "lucide-react";
import logo from "@/img/logo.png";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/haptic";
import { photo } from "@/lib/photos";
import { useFrame } from "./frame";

export function Logo({
  className,
  label = "All Eyez Open, LLC",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span className={cn("inline-flex overflow-hidden rounded-2xl bg-black", className)}>
      <img src={logo} alt={label} className="h-full w-full object-cover object-[center_30%]" />
    </span>
  );
}

export function Photo({
  name,
  alt,
  className,
}: {
  name?: string;
  alt: string;
  className?: string;
}) {
  const src = name ? photo(name) : undefined;
  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("bg-gradient-to-br from-primary via-[#5a237f] to-ink", className)}
      />
    );
  }
  return <img src={src} alt={alt} className={cn("max-w-full object-cover", className)} />;
}

export function Button({
  children,
  variant = "primary",
  type = "button",
  disabled,
  onClick,
  className,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={() => {
        haptic();
        onClick?.();
      }}
      className={cn(
        "inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl px-4 text-center text-[1.0625rem] font-semibold leading-tight transition active:scale-[0.985] disabled:opacity-45",
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "secondary" && "bg-secondary text-secondary-foreground",
        variant === "tertiary" && "min-h-11 w-auto bg-transparent text-link",
        variant === "danger" && "bg-transparent text-danger",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function IconButton({
  label,
  onClick,
  children,
  className,
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        haptic(8);
        onClick?.();
      }}
      className={cn(
        "grid h-11 w-11 shrink-0 place-items-center rounded-full text-foreground active:bg-muted",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Card({
  children,
  className,
  onClick,
  label,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  label?: string;
}) {
  const cls = cn("rounded-2xl bg-card text-left shadow-card", className);
  if (!onClick) return <div className={cls}>{children}</div>;
  return (
    <button type="button" aria-label={label} onClick={() => { haptic(8); onClick(); }} className={cn(cls, "block w-full")}>
      {children}
    </button>
  );
}

export function Chip({
  children,
  selected,
  onClick,
}: {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => {
        haptic(8);
        onClick?.();
      }}
      className={cn(
        "min-h-11 shrink-0 rounded-lg px-4 text-[0.9375rem] font-semibold",
        selected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function Rail({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 no-scrollbar snap-x", className)}>
      {children}
    </div>
  );
}

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.8125rem] font-semibold text-foreground">{label}</span>
      {children}
      {error ? (
        <span className="mt-1.5 block text-[0.8125rem] font-medium text-danger" role="alert">
          {error}
        </span>
      ) : hint ? (
        <span className="mt-1.5 block text-[0.8125rem] leading-snug text-muted-foreground">{hint}</span>
      ) : null}
    </label>
  );
}

export const fieldClass =
  "min-h-[3.25rem] w-full rounded-xl border border-divider bg-card px-3.5 text-[1.0625rem] text-foreground outline-none placeholder:text-muted-foreground focus:border-primary";

export function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  hint,
  error,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  autoComplete?: string;
}) {
  const [show, setShow] = useState(false);
  const secret = type === "password";
  return (
    <Field label={label} hint={hint} error={error}>
      <span className="relative block">
        <input
          className={cn(fieldClass, secret && "pr-12")}
          value={value}
          type={secret && show ? "text" : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
        />
        {secret && (
          <button
            type="button"
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-1 top-1 grid h-11 w-11 place-items-center text-muted-foreground"
            onClick={() => setShow((v) => !v)}
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </span>
    </Field>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  hint,
  error,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  rows?: number;
}) {
  return (
    <Field label={label} hint={hint} error={error}>
      <textarea
        className={cn(fieldClass, "min-h-28 resize-none py-3")}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

export function Segmented({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { id: string; label: string }[];
  label: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${Math.max(options.length, 1)}, minmax(0, 1fr))` }}
    >
      {options.map((option) => {
        const on = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => {
              haptic(8);
              onChange(option.id);
            }}
            className={cn(
              "min-h-12 rounded-lg border px-1 text-center text-[0.8125rem] font-semibold leading-tight",
              on ? "border-primary bg-primary text-white" : "border-divider bg-card text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => {
        haptic(10);
        onChange(!checked);
      }}
      className={cn(
        "relative grid h-[31px] w-[51px] shrink-0 rounded-full p-[2px] transition-colors",
        checked ? "justify-items-end bg-primary" : "justify-items-start bg-[#d8d0de] dark:bg-[#564e56]",
      )}
    >
      <span className="h-[27px] w-[27px] rounded-full bg-white shadow-[0_1px_3px_rgba(35,31,32,0.28)] transition-transform" />
    </button>
  );
}

export function SwitchRow({
  label,
  detail,
  checked,
  onChange,
}: {
  label: string;
  detail?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex w-full min-w-0 items-center gap-3 px-4 py-3">
      <span className="min-w-0 flex-1">
        <span className="block text-[1.0625rem] leading-snug">{label}</span>
        {detail && <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted-foreground">{detail}</span>}
      </span>
      <Switch checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

export function ListRow({
  title,
  subtitle,
  icon,
  trailing,
  onClick,
  destructive,
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  trailing?: ReactNode;
  onClick?: () => void;
  destructive?: boolean;
}) {
  const inner = (
    <>
      {icon && (
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-100 text-link">{icon}</span>
      )}
      <span className="min-w-0 flex-1 text-left">
        <span className={cn("block text-[1.0625rem]", destructive && "text-danger")}>{title}</span>
        {subtitle && <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted-foreground">{subtitle}</span>}
      </span>
      {trailing ?? (onClick ? <ChevronRight size={18} className="shrink-0 text-muted-foreground" /> : null)}
    </>
  );
  const cls = "flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left";
  if (!onClick) return <div className={cls}>{inner}</div>;
  return (
    <button type="button" onClick={() => { haptic(8); onClick(); }} className={cn(cls, "active:bg-muted")}>
      {inner}
    </button>
  );
}

export function Group({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("divide-y divide-divider overflow-hidden rounded-2xl bg-card shadow-card", className)}>
      {children}
    </div>
  );
}

export function SectionTitle({ children, action, onAction }: { children: ReactNode; action?: string; onAction?: () => void }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <h2 className="title-2">{children}</h2>
      {action && (
        <button type="button" onClick={onAction} className="min-h-11 text-[0.9375rem] font-semibold text-link">
          {action}
        </button>
      )}
    </div>
  );
}

export function Badge({
  children,
  tone = "purple",
}: {
  children: ReactNode;
  tone?: "purple" | "green" | "neutral" | "warning";
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center gap-1 rounded-lg px-2 text-[0.75rem] font-semibold",
        tone === "purple" && "bg-primary-100 text-link",
        tone === "green" && "bg-[#e5f6ec] text-[#146c43] dark:bg-[#1d3b2e] dark:text-[#b6f0cf]",
        tone === "neutral" && "bg-muted text-muted-foreground",
        tone === "warning" && "bg-[#fff4d6] text-[#7a5600] dark:bg-[#3d3420] dark:text-[#f3d48a]",
      )}
    >
      {children}
    </span>
  );
}

export function Avatar({
  name,
  photoName,
  size = 40,
  anonymous,
}: {
  name: string;
  photoName?: string;
  size?: number;
  anonymous?: boolean;
}) {
  const src = photoName ? photo(photoName) : undefined;
  const initials = anonymous
    ? "?"
    : name
        .split(" ")
        .slice(0, 2)
        .map((p) => p[0])
        .join("")
        .toUpperCase();
  return (
    <span
      className="inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-primary-100 font-semibold text-link"
      style={{ width: size, height: size, fontSize: size < 36 ? 12 : 15 }}
      aria-hidden={anonymous ? undefined : true}
    >
      {src && !anonymous ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </span>
  );
}

export function Stars({
  value,
  onChange,
  label = "Rating",
}: {
  value: number;
  onChange?: (value: number) => void;
  label?: string;
}) {
  return (
    <span className="inline-flex" role={onChange ? "radiogroup" : "img"} aria-label={`${label}: ${value} of 5`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= Math.round(value);
        const icon = <Star size={onChange ? 28 : 14} className={filled ? "fill-[#8a6200] text-[#8a6200]" : "text-divider"} />;
        if (!onChange) return <span key={n}>{icon}</span>;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            className="grid h-11 w-11 place-items-center"
            onClick={() => {
              haptic(8);
              onChange(n);
            }}
          >
            {icon}
          </button>
        );
      })}
    </span>
  );
}

export function SearchField({
  value,
  onChange,
  placeholder = "Search",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex min-h-11 items-center gap-2 rounded-xl bg-muted px-3">
      <Search size={18} className="text-muted-foreground" aria-hidden />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-11 w-full bg-transparent text-[1.0625rem] outline-none placeholder:text-muted-foreground"
      />
      {value && (
        <button type="button" aria-label="Clear search" className="grid h-11 w-11 place-items-center" onClick={() => onChange("")}>
          <X size={16} />
        </button>
      )}
    </label>
  );
}

export function ProgressBar({ value, label }: { value: number; label: string }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div>
      <div className="h-2 overflow-hidden rounded-full bg-primary-100" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  body,
  action,
  onAction,
}: {
  title: string;
  body: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="px-6 py-10 text-center">
      <EmptyArt />
      <h2 className="title-2 mt-4">{title}</h2>
      <p className="body-text mx-auto mt-2 max-w-xs text-muted-foreground">{body}</p>
      {action && onAction && (
        <div className="mx-auto mt-5 max-w-xs">
          <Button onClick={onAction}>{action}</Button>
        </div>
      )}
    </div>
  );
}

function EmptyArt() {
  return (
    <svg viewBox="0 0 160 120" className="mx-auto h-28 w-40" aria-hidden>
      <rect x="18" y="28" width="124" height="74" rx="18" fill="var(--primary-100)" />
      <circle cx="58" cy="58" r="14" fill="var(--primary)" opacity="0.85" />
      <path d="M84 50h36M84 64h28M84 78h20" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" opacity="0.55" />
      <path d="M46 92c10-12 22-12 32 0" fill="none" stroke="var(--link)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-muted", className)} />;
}

export function ErrorState({ title, body, onRetry }: { title: string; body: string; onRetry?: () => void }) {
  return (
    <div className="px-6 py-10 text-center" role="alert">
      <h2 className="title-2">{title}</h2>
      <p className="body-text mx-auto mt-2 max-w-xs text-muted-foreground">{body}</p>
      {onRetry && (
        <div className="mx-auto mt-5 max-w-xs">
          <Button onClick={onRetry}>Try again</Button>
        </div>
      )}
    </div>
  );
}

function usePortalTarget() {
  const frame = useFrame();
  return frame;
}

export function Sheet({
  open,
  onClose,
  title,
  children,
  detent = "large",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  detent?: "medium" | "large";
}) {
  const target = usePortalTarget();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open || !target) return null;
  return createPortal(
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      <button type="button" aria-label="Dismiss" className="absolute inset-0 bg-[var(--overlay)]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal
        aria-label={title}
        className={cn(
          "anim-sheet relative flex w-full flex-col rounded-t-3xl bg-card pb-[max(1rem,env(safe-area-inset-bottom))] shadow-card",
          detent === "medium" ? "max-h-[58%]" : "max-h-[92%]",
        )}
      >
        <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-divider" />
        {title && (
          <div className="flex items-center justify-between px-4 py-2">
            <h2 className="headline">{title}</h2>
            <IconButton label="Close" onClick={onClose}>
              <X size={18} />
            </IconButton>
          </div>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">{children}</div>
      </div>
    </div>,
    target,
  );
}

export function ActionSheet({
  open,
  onClose,
  title,
  message,
  actions,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  actions: { label: string; destructive?: boolean; onSelect: () => void }[];
}) {
  const target = usePortalTarget();
  if (!open || !target) return null;
  return createPortal(
    <div className="absolute inset-0 z-50 flex flex-col justify-end p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <button type="button" aria-label="Dismiss" className="absolute inset-0 bg-[var(--overlay)]" onClick={onClose} />
      <div role="dialog" aria-modal aria-label={title} className="anim-sheet relative space-y-2">
        <div className="overflow-hidden rounded-2xl bg-card text-center">
          <div className="px-4 py-3">
            <p className="footnote text-muted-foreground">{title}</p>
            {message && <p className="footnote mt-1 text-muted-foreground">{message}</p>}
          </div>
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              className={cn(
                "min-h-[3.25rem] w-full border-t border-divider text-[1.125rem]",
                action.destructive ? "font-semibold text-danger" : "text-link",
              )}
              onClick={() => {
                haptic();
                action.onSelect();
                onClose();
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
        <button type="button" className="min-h-[3.25rem] w-full rounded-2xl bg-card text-[1.125rem] font-semibold text-link" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>,
    target,
  );
}

export function AlertDialog({
  open,
  title,
  message,
  confirm,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  message: string;
  confirm: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const target = usePortalTarget();
  if (!open || !target) return null;
  return createPortal(
    <div className="absolute inset-0 z-50 grid place-items-center bg-[var(--overlay)] p-8">
      <div role="alertdialog" aria-modal aria-labelledby="alert-title" className="anim-pop w-full max-w-[17rem] overflow-hidden rounded-2xl bg-card text-center">
        <div className="px-4 py-4">
          <h2 id="alert-title" className="headline">{title}</h2>
          <p className="footnote mt-1 text-muted-foreground">{message}</p>
        </div>
        <div className="grid grid-cols-2 border-t border-divider">
          <button type="button" className="min-h-12 border-r border-divider text-link" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="min-h-12 font-semibold text-link"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirm}
          </button>
        </div>
      </div>
    </div>,
    target,
  );
}

export function MonthCalendar({ value, onChange }: { value: string; onChange: (iso: string) => void }) {
  const today = useMemo(() => new Date(2026, 9, 29), []);
  const selected = value ? new Date(`${value}T12:00:00`) : undefined;
  const [cursor, setCursor] = useState(() => selected ?? new Date(2026, 10, 1));
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const startPad = first.getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const label = first.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const cells: Array<number | null> = [...Array(startPad).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];

  return (
    <div className="rounded-2xl bg-card p-3 shadow-card">
      <div className="mb-2 flex items-center justify-between">
        <IconButton label="Previous month" onClick={() => setCursor(new Date(year, month - 1, 1))}>
          <ChevronLeft size={20} />
        </IconButton>
        <p className="headline">{label}</p>
        <IconButton label="Next month" onClick={() => setCursor(new Date(year, month + 1, 1))}>
          <ChevronRight size={20} />
        </IconButton>
      </div>
      <div className="grid grid-cols-7 text-center text-[0.75rem] font-semibold text-muted-foreground">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={`${d}${i}`} className="py-1">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (!day) return <span key={`e${i}`} />;
          const date = new Date(year, month, day);
          const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const past = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const on = value === iso;
          return (
            <button
              key={iso}
              type="button"
              disabled={past}
              aria-pressed={on}
              aria-label={date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
              onClick={() => onChange(iso)}
              className={cn(
                "mx-auto my-0.5 grid h-11 w-11 place-items-center rounded-full text-[1rem]",
                on && "bg-primary font-semibold text-primary-foreground",
                past && "text-muted-foreground/50",
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CheckMark() {
  return (
    <svg viewBox="0 0 72 72" className="anim-pop mx-auto h-20 w-20" aria-hidden>
      <circle cx="36" cy="36" r="34" fill="var(--primary-100)" />
      <path d="M22 37.5 31.5 47 51 26" fill="none" stroke="var(--primary)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Celebration({
  image = "hero-hands",
  kicker,
  title,
  detail,
  children,
}: {
  image?: string;
  kicker: string;
  title: string;
  detail?: string;
  children?: ReactNode;
}) {
  return (
    <div>
      <div className="relative h-44 overflow-hidden rounded-lg">
        <Photo name={image} alt="" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#231f20] via-[#4a1d72]/72 to-[#231f20]/20" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/80">{kicker}</p>
          <p className="mt-1 text-[1.65rem] font-bold leading-tight">{title}</p>
        </div>
      </div>
      <div className="relative z-10 -mt-8 rounded-lg bg-card px-4 pb-5 pt-4 text-center shadow-card">
        <CheckMark />
        {detail && <p className="mt-2 text-[0.95rem] leading-snug text-muted-foreground">{detail}</p>}
        {children}
      </div>
    </div>
  );
}

export function Confetti() {
  const bits = [
    "#782baf",
    "#efe3f7",
    "#2e9e6b",
    "#e0a100",
    "#231f20",
    "#c9a0e8",
  ];
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden" aria-hidden>
      {bits.map((color, i) => (
        <span
          key={color}
          className="absolute top-0 h-2.5 w-2.5 rounded-sm"
          style={{
            left: `${12 + i * 14}%`,
            background: color,
            animation: `confetti 1.1s ease-in ${i * 0.08}s both`,
          }}
        />
      ))}
    </div>
  );
}

export function ContextMenu({
  items,
  children,
}: {
  items: { label: string; destructive?: boolean; onSelect: () => void }[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 16, y: 80 });
  const timer = useRef<number | null>(null);
  const target = usePortalTarget();

  const show = (x: number, y: number) => {
    setPos({ x: Math.min(x, 220), y: Math.max(80, y - 20) });
    setOpen(true);
    haptic(15);
  };

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        show(e.clientX, e.clientY);
      }}
      onPointerDown={() => {
        timer.current = window.setTimeout(() => show(80, 180), 550);
      }}
      onPointerUp={() => {
        if (timer.current) window.clearTimeout(timer.current);
      }}
      onPointerLeave={() => {
        if (timer.current) window.clearTimeout(timer.current);
      }}
    >
      {children}
      {open && target &&
        createPortal(
          <div className="absolute inset-0 z-50" onClick={() => setOpen(false)}>
            <div
              role="menu"
              className="absolute w-56 overflow-hidden rounded-xl bg-card py-1 shadow-card"
              style={{ left: pos.x, top: pos.y }}
              onClick={(e) => e.stopPropagation()}
            >
              {items.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  role="menuitem"
                  className={cn("block min-h-11 w-full px-4 text-left text-[1.0625rem]", item.destructive && "text-danger")}
                  onClick={() => {
                    item.onSelect();
                    setOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>,
          target,
        )}
    </div>
  );
}

export function SwipeRow({ onDelete, children }: { onDelete: () => void; children: ReactNode }) {
  const [dx, setDx] = useState(0);
  const start = useRef(0);
  return (
    <div className="relative overflow-hidden">
      <button
        type="button"
        className="absolute inset-y-0 right-0 w-24 bg-danger font-semibold text-white"
        onClick={onDelete}
      >
        Delete
      </button>
      <div
        className="relative bg-card"
        style={{ transform: `translateX(${dx}px)` }}
        onPointerDown={(e) => {
          start.current = e.clientX;
        }}
        onPointerMove={(e) => {
          const next = Math.min(0, e.clientX - start.current);
          if (next < 0) setDx(Math.max(next, -96));
        }}
        onPointerUp={() => setDx((v) => (v < -48 ? -96 : 0))}
      >
        {children}
      </div>
    </div>
  );
}

export function AppleMark() {
  return (
    <svg viewBox="0 0 18 22" className="h-5 w-4" aria-hidden>
      <path
        fill="currentColor"
        d="M14.7 11.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-.1 2.9-2.2c.7-1 1.2-2.1 1.5-3.2-3.9-1.5-3.8-5.5-3.8-5.3zM12.5 4.8c.6-.8 1.1-1.9.9-3-1 .1-2.1.6-2.8 1.4-.6.7-1.2 1.8-.1 3.4 1.1.1 2-.5 2-1.8z"
      />
    </svg>
  );
}

export function VerifiedDot() {
  return (
    <span className="inline-flex items-center gap-1 text-[0.75rem] font-semibold text-[#146c43] dark:text-[#b6f0cf]">
      <Check size={12} aria-hidden /> Verified
    </span>
  );
}

export function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-3 flex gap-1.5" aria-label={`Step ${step} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={cn("h-1 flex-1 rounded-full", i < step ? "bg-primary" : "bg-divider")} />
      ))}
    </div>
  );
}

export function SafariSheet({
  open,
  onClose,
  url,
  title,
}: {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
}) {
  return (
    <Sheet open={open} onClose={onClose} title={title} detent="large">
      <div className="mb-3 truncate rounded-lg bg-muted px-3 py-2 text-center text-[0.8125rem] text-muted-foreground">{url}</div>
      <p className="body-text text-muted-foreground">
        This in-app browser preview opens {title} for All Eyez Open, LLC. Follow the organization to see events, classes, and community updates.
      </p>
      <div className="mt-4">
        <Button
          onClick={() => {
            window.open(url, "_blank", "noopener,noreferrer");
          }}
        >
          Open in browser
        </Button>
      </div>
    </Sheet>
  );
}
