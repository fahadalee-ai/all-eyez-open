import { useCanGoBack, useNavigate, useRouter } from "@tanstack/react-router";
import { haptic } from "./haptic";

type LooseNavigate = (opts: { to: string }) => void;

export function useGo() {
  const navigate = useNavigate();
  return (to: string) => {
    haptic();
    (navigate as unknown as LooseNavigate)({ to });
  };
}

export function useBack(fallback = "/home") {
  const router = useRouter();
  const can = useCanGoBack();
  const go = useGo();
  return () => {
    haptic();
    if (can) router.history.back();
    else go(fallback);
  };
}
