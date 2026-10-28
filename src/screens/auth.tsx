import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, Shield, VenetianMask } from "lucide-react";
import { AppleMark, Button, CheckMark, Field, Photo, Sheet, Switch, SwitchRow, TextField, fieldClass } from "@/components/ios/ui";
import { Page } from "@/components/ios/shell";
import { onboarding, policies, type Role } from "@/data/content";
import logoW from "@/img/logo-w.png";
import { isEmail, passwordScore } from "@/lib/haptic";
import { useBack, useGo } from "@/lib/nav";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

function Wordmark({ className }: { className?: string }) {
  return (
    <img
      src={logoW}
      alt="All Eyez Open, LLC. You Are Not Alone."
      className={cn("h-auto w-[min(88%,340px)] mix-blend-screen", className)}
    />
  );
}

export function SplashScreen() {
  const app = useApp();
  const go = useGo();
  const left = useRef(false);

  useEffect(() => {
    if (!app.booted || left.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches || app.settings.reduceMotion;
    const timer = window.setTimeout(() => {
      left.current = true;
      go("/onboarding");
    }, reduce ? 400 : 2500);
    return () => window.clearTimeout(timer);
  }, [app.booted, app.settings.reduceMotion, go]);

  return (
    <div className="relative flex h-full flex-col overflow-hidden text-white">
      <Photo name="hero-hands" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8f2fc]/70 via-[#b98adf]/42 to-[#3d1760]/92" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(35,31,32,0.62)_0%,rgba(74,29,114,0.28)_46%,transparent_72%)]" />
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="[animation:logo-in_0.9s_cubic-bezier(0.22,1,0.36,1)_both]">
          <Wordmark className="w-[min(92%,360px)]" />
        </div>
        <p className="anim-fade mt-1 max-w-[18rem] text-[1.0625rem] font-medium leading-snug text-white drop-shadow-[0_2px_10px_rgba(35,31,32,0.7)]">
          Confidential care for survivors, families, and the community that stands with them.
        </p>
        <div className="mt-8 flex gap-2" aria-label="Loading">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_1px_4px_rgba(35,31,32,0.45)]" style={{ animation: `dot 1s ease ${i * 0.15}s infinite` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function OnboardingScreen() {
  const go = useGo();
  const app = useApp();
  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const slide = onboarding[index];
  const last = index === onboarding.length - 1;

  const next = () => {
    if (last) {
      app.markOnboarded();
      go("/safety-tips");
    } else setIndex((n) => n + 1);
  };

  return (
    <div
      className="relative h-full overflow-hidden text-white"
      onPointerDown={(e) => {
        startX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        const dx = e.clientX - startX.current;
        if (dx < -40 && !last) setIndex((n) => n + 1);
        if (dx > 40 && index > 0) setIndex((n) => n - 1);
      }}
    >
      <Photo name={slide.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#140e18] via-[#140e18]/82 to-[#140e18]/10" />
      <div className="relative flex h-full flex-col">
        <div className="flex justify-start px-4 pt-2">
          <button
            type="button"
            className="min-h-11 rounded-lg bg-black/40 px-4 text-[1rem] font-semibold text-white shadow-[0_2px_10px_rgba(0,0,0,0.25)] backdrop-blur-md"
            onClick={() => {
              app.markOnboarded();
              go("/safety-tips");
            }}
          >
            Skip
          </button>
        </div>
        <div className="mt-auto px-6 pb-8">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white/85">All Eyez Open, LLC</p>
          <h1 className="mt-2 text-[2rem] font-bold leading-[1.15] text-white">{slide.title}</h1>
          <p className="mt-3 text-[1.0625rem] leading-snug text-white">{slide.text}</p>
          <div className="mt-5 flex gap-2" aria-label="Page">
            {onboarding.map((item, i) => (
              <span key={item.title} className={cn("h-2 rounded-full", i === index ? "w-7 bg-white" : "w-2 bg-white/45")} />
            ))}
          </div>
          <div className="mt-6">
            <Button onClick={next}>{last ? "Get Started" : "Next"}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthShell({
  title,
  subtitle,
  back = false,
  fallback = "/welcome",
  children,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
  fallback?: string;
  children: ReactNode;
}) {
  const goBack = useBack(fallback);
  return (
    <Page
      back={false}
      header={
        <header className="relative overflow-hidden">
          <Photo name="onboarding-sunrise" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#231f20]/50 via-[#4a1d72]/78 to-[var(--background)]" />
          <div className="relative px-4 pb-1 pt-1">
            <div className="flex h-11 items-center">
              {back ? (
                <button type="button" aria-label="Back" className="grid h-11 w-11 place-items-center rounded-full bg-black/35 text-white backdrop-blur-md" onClick={goBack}>
                  <ChevronLeft size={26} />
                </button>
              ) : (
                <span className="h-11 w-11" />
              )}
            </div>
            <div className="flex justify-center pb-2">
              <Wordmark className="w-[min(68%,250px)]" />
            </div>
          </div>
        </header>
      }
    >
      <div className="pb-8">
        <h1 className="title-1 text-center">{title}</h1>
        {subtitle && <p className="mt-1 text-center text-[1.02rem] leading-snug text-muted-foreground">{subtitle}</p>}
        <div className="mt-5 space-y-4">{children}</div>
      </div>
    </Page>
  );
}

export function SafetyTipsScreen() {
  const go = useGo();
  const tips = [
    { title: "Quick Exit", text: "The pill at the top right instantly shows a weather or notes screen.", icon: Shield },
    { title: "Discreet Mode", text: "Renames the preview to Notes and keeps notification text generic.", icon: VenetianMask },
  ];
  return (
    <AuthShell title="Your safety" subtitle="These tools are optional. Turn them on now, or later in Settings.">
      {tips.map(({ title, text, icon: Icon }) => (
        <div key={title} className="flex gap-3 rounded-2xl bg-card p-4 shadow-card">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-100 text-primary">
            <Icon size={20} aria-hidden />
          </span>
          <div className="min-w-0">
            <h2 className="headline">{title}</h2>
            <p className="mt-1 text-[1rem] leading-snug text-foreground">{text}</p>
          </div>
        </div>
      ))}
      <Button onClick={() => go("/setup-safety")}>Set up now</Button>
      <Button variant="secondary" onClick={() => go("/welcome")}>Later</Button>
    </AuthShell>
  );
}

export function WelcomeScreen() {
  return <LoginForm />;
}

export function LoginScreen() {
  return <LoginForm />;
}

function LoginForm() {
  const app = useApp();
  const go = useGo();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    const result = app.login(email, password);
    if (!result.ok) app.continueAsGuest();
    go("/home");
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to All Eyez Open, LLC">
      <TextField label="Email or phone" value={email} onChange={setEmail} autoComplete="username" placeholder="you@email.com" />
      <TextField label="Password" type="password" value={password} onChange={setPassword} autoComplete="current-password" />
      <button type="button" className="min-h-11 text-[1rem] font-semibold text-link" onClick={() => go("/forgot")}>Forgot password?</button>
      <Button onClick={submit}>Log In</Button>
      <button type="button" className="flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl bg-black text-[1.0625rem] font-semibold text-white" onClick={() => { app.loginApple(); go("/home"); }}>
        <AppleMark /> Sign in with Apple
      </button>
      <div className="flex items-center gap-3 text-[0.8125rem] text-muted-foreground">
        <span className="h-px flex-1 bg-divider" /> or <span className="h-px flex-1 bg-divider" />
      </div>
      <Button variant="secondary" onClick={() => { app.continueAsGuest(); go("/home"); }}>Continue as Guest</Button>
      <p className="text-center text-[0.8125rem] leading-snug text-muted-foreground">Guest access includes services, donations, and the hotline.</p>
      <button type="button" className="min-h-11 w-full text-center text-[1.0625rem]" onClick={() => go("/register")}>
        New here? <span className="font-semibold text-link">Create account</span>
      </button>
      <p className="rounded-2xl bg-card px-3 py-3 text-[0.8125rem] leading-snug text-muted-foreground shadow-card">
        Preview: ariel@alleyezopen.org · Safety2026
        <br />
        Advisor view: jordan@alleyezopen.org · Advisor2026
      </p>
      <p className="rounded-2xl bg-primary-50 px-4 py-3 text-[0.9375rem] leading-snug text-foreground">Your safety matters. Use Quick Exit anytime.</p>
    </AuthShell>
  );
}

export function RegisterScreen() {
  const app = useApp();
  const go = useGo();
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [useNick, setUseNick] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("Survivor");
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [conf, setConf] = useState(false);
  const [policy, setPolicy] = useState<null | "terms" | "privacy" | "confidentiality">(null);
  const roles: Role[] = ["Survivor", "Supporter", "Donor", "Volunteer"];
  const policyCopy = policy ? policies[policy] : [];
  const policyTitle = policy === "terms" ? "Terms of Use" : policy === "privacy" ? "Privacy Policy" : "Confidentiality Statement";
  const score = passwordScore(password);
  const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];

  const submit = () => {
    const result = app.register({
      name: (useNick ? nickname : name).trim() || "Friend",
      nickname: (nickname || name).trim() || "Friend",
      email: email.trim() || `guest.${Date.now()}@alleyezopen.org`,
      phone,
      password,
      role,
    });
    if (!result.ok) {
      const signedIn = app.login(email, password);
      if (!signedIn.ok) app.continueAsGuest();
      go("/home");
      return;
    }
    go("/verify");
  };

  return (
    <AuthShell title="Create account" subtitle="A nickname is enough. Share only what feels safe." back fallback="/welcome">
      <div className="space-y-4">
        <SwitchRow label="Use a nickname instead" detail="You can stay anonymous in the community either way." checked={useNick} onChange={setUseNick} />
        {useNick ? (
          <TextField label="Nickname" value={nickname} onChange={setNickname} placeholder="What should we call you?" />
        ) : (
          <TextField label="Full name" value={name} onChange={setName} autoComplete="name" />
        )}
        <TextField label="Email" value={email} onChange={setEmail} type="email" autoComplete="email" />
        <TextField label="Phone" value={phone} onChange={setPhone} type="tel" hint="Optional. Used only if you say contact is safe." />
        <TextField label="Password" type="password" value={password} onChange={setPassword} />
        <div className="flex gap-1" aria-label={`Password strength ${labels[score]}`}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={cn("h-1.5 flex-1 rounded-full", i < score ? "bg-primary" : "bg-divider")} />
          ))}
        </div>
        <p className="footnote text-muted-foreground">{labels[score]}</p>
        <div>
          <p className="mb-2 text-[0.8125rem] font-semibold">I am a</p>
          <div role="radiogroup" aria-label="I am a" className="grid grid-cols-2 gap-2">
            {roles.map((item) => {
              const on = role === item;
              return (
                <button
                  key={item}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setRole(item)}
                  className={cn(
                    "min-h-12 rounded-lg border px-3 text-[0.9375rem] font-semibold",
                    on ? "border-primary bg-primary text-white" : "border-divider bg-card text-foreground",
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-divider bg-card">
          <AgreeRow title="Terms of Use" checked={terms} onChange={setTerms} onRead={() => setPolicy("terms")} />
          <AgreeRow title="Privacy Policy" checked={privacy} onChange={setPrivacy} onRead={() => setPolicy("privacy")} />
          <AgreeRow title="Confidentiality Statement" checked={conf} onChange={setConf} onRead={() => setPolicy("confidentiality")} />
        </div>
        <Sheet
          open={policy !== null}
          onClose={() => setPolicy(null)}
          title={policyTitle}
        >
          <div className="space-y-4">
            {policyCopy.map((section) => (
              <section key={section.title}>
                <h3 className="text-[1.0625rem] font-semibold">{section.title}</h3>
                <p className="mt-1 text-[1rem] leading-snug text-foreground">{section.text}</p>
              </section>
            ))}
            <Button
              onClick={() => {
                if (policy === "terms") setTerms(true);
                if (policy === "privacy") setPrivacy(true);
                if (policy === "confidentiality") setConf(true);
                setPolicy(null);
              }}
            >
              I have read this
            </Button>
          </div>
        </Sheet>
        <Button onClick={submit}>Create Account</Button>
      </div>
    </AuthShell>
  );
}

export function OtpScreen() {
  const app = useApp();
  const go = useGo();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [seconds, setSeconds] = useState(30);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [seconds]);

  const submit = () => {
    app.verifyOtp();
    go("/setup-safety");
  };

  return (
    <AuthShell title="Verify email" subtitle="Enter the 4-digit code from your email." back fallback="/register">
      <div className="mx-auto grid w-full max-w-[16.5rem] grid-cols-4 gap-3">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            inputMode="numeric"
            maxLength={1}
            aria-label={`Digit ${i + 1}`}
            className="h-16 w-full rounded-lg border border-divider bg-card text-center text-[1.75rem] font-semibold text-foreground outline-none focus:border-primary"
            value={d}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "").slice(-1);
              const next = [...digits];
              next[i] = v;
              setDigits(next);
              if (v && i < 3) refs.current[i + 1]?.focus();
            }}
          />
        ))}
      </div>
      <button type="button" disabled={seconds > 0} className="min-h-11 font-semibold text-link disabled:text-muted-foreground" onClick={() => setSeconds(30)}>
        {seconds > 0 ? `Resend code in ${seconds}s` : "Resend code"}
      </button>
      <Button onClick={submit}>Verify</Button>
    </AuthShell>
  );
}

function AgreeRow({
  title,
  checked,
  onChange,
  onRead,
}: {
  title: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  onRead: () => void;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-divider px-4 py-3 last:border-0">
      <button type="button" className="min-w-0 flex-1 py-1 text-left" onClick={onRead}>
        <span className="block text-[1.02rem] font-semibold text-link">{title}</span>
        <span className="mt-0.5 block text-[0.8125rem] leading-snug text-foreground">Tap to read, then agree.</span>
      </button>
      <Switch checked={checked} onChange={onChange} label={title} />
    </div>
  );
}

export function ForgotScreen() {
  const app = useApp();
  const go = useGo();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  return (
    <AuthShell title="Forgot password" subtitle="We’ll confirm this address and let you choose a new password. In this preview the next screen opens immediately." back fallback="/welcome">
      <div className="space-y-4">
        <TextField label="Email" value={email} onChange={setEmail} error={error} />
        <Button
          onClick={() => {
            if (!isEmail(email)) {
              setError("Enter the email on the account.");
              return;
            }
            app.requestReset(email);
            go("/reset");
          }}
        >
          Send reset link
        </Button>
      </div>
    </AuthShell>
  );
}

export function ResetScreen() {
  const app = useApp();
  const go = useGo();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <AuthShell title="Password updated" subtitle="You can log in with the new password.">
        <CheckMark />
        <Button onClick={() => go("/welcome")}>Back to log in</Button>
      </AuthShell>
    );
  }
  return (
    <AuthShell title="Reset password" subtitle={`Resetting ${app.resetEmail || "your account"}.`} back fallback="/forgot">
      <div className="space-y-4">
        <TextField label="New password" type="password" value={password} onChange={setPassword} />
        <TextField label="Confirm password" type="password" value={confirm} onChange={setConfirm} error={error} />
        <Button
          onClick={() => {
            if (passwordScore(password) < 2) {
              setError("Use at least 8 characters with mixed case or a number.");
              return;
            }
            if (password !== confirm) {
              setError("Those passwords don’t match yet.");
              return;
            }
            app.resetPassword(password);
            setDone(true);
          }}
        >
          Update password
        </Button>
      </div>
    </AuthShell>
  );
}

export function SetupSafetyScreen() {
  const app = useApp();
  const go = useGo();
  const [pin, setPin] = useState("");
  const [lock, setLock] = useState(app.settings.appLock);
  const [discreet, setDiscreet] = useState(app.settings.discreet);
  const next = app.user ? "/home" : "/welcome";
  return (
    <AuthShell title="Set up safety" subtitle="Choose what should be on before you continue. You can change this anytime." back fallback="/safety-tips">
      <div className="mt-4 w-full min-w-0 overflow-hidden rounded-2xl bg-card shadow-card">
        <SwitchRow label="App Lock" detail="Face ID, Touch ID, or a 4-digit PIN." checked={lock} onChange={setLock} />
        <SwitchRow label="Discreet Mode" detail="Shows Notes in the title and app switcher, and keeps alerts generic." checked={discreet} onChange={setDiscreet} />
      </div>
      {lock && (
        <div className="mt-4">
          <Field label="4-digit PIN" hint="You’ll use this if biometrics aren’t available.">
            <input className={fieldClass} inputMode="numeric" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))} aria-label="PIN" />
          </Field>
        </div>
      )}
      <div className="mt-6 space-y-2 pb-6">
        <Button
          onClick={() => {
            if (lock) {
              if (pin.length !== 4) return;
              app.enableLock(pin);
            } else app.updateSettings({ appLock: false });
            app.updateSettings({ discreet });
            go(next);
          }}
        >
          Save and continue
        </Button>
        <Button variant="tertiary" className="w-full" onClick={() => go(next)}>Skip for now</Button>
      </div>
    </AuthShell>
  );
}
