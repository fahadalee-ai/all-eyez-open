export function haptic(ms = 12) {
  if (typeof navigator === "undefined") return;
  if (document.documentElement.classList.contains("reduce-motion")) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  navigator.vibrate?.(ms);
}

export function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function uid(prefix: string) {
  return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function shareText(title: string, text: string) {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, text });
      return "shared" as const;
    } catch {
      return "cancel" as const;
    }
  }
  try {
    await navigator.clipboard.writeText(`${title}\n${text}`);
    return "copied" as const;
  } catch {
    return "cancel" as const;
  }
}

export function downloadIcs(title: string, date: string, time: string) {
  const start = toStamp(date, time);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//All Eyez Open//Consult//EN",
    "BEGIN:VEVENT",
    `SUMMARY:${title}`,
    `DTSTART:${start}`,
    "DURATION:PT1H",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "appointment.ics";
  a.click();
  URL.revokeObjectURL(url);
}

function toStamp(date: string, time: string) {
  const day = date.replace(/-/g, "");
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  let h = match ? Number(match[1]) : 9;
  const m = match ? match[2] : "00";
  const ap = match?.[3]?.toUpperCase();
  if (ap === "PM" && h < 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return `${day}T${String(h).padStart(2, "0")}${m}00`;
}

export function passwordScore(value: string) {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value) || value.length >= 12) score += 1;
  return score;
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
