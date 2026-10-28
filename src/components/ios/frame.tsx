import { createContext, useContext } from "react";

export const FrameCtx = createContext<HTMLDivElement | null>(null);

export function useFrame() {
  return useContext(FrameCtx);
}
