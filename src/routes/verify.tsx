import { createFileRoute } from "@tanstack/react-router";
import { OtpScreen } from "@/screens/auth";

export const Route = createFileRoute("/verify")({
  component: OtpScreen,
});
