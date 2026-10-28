import { createFileRoute } from "@tanstack/react-router";
import { SafetyTipsScreen } from "@/screens/auth";

export const Route = createFileRoute("/safety-tips")({
  component: SafetyTipsScreen,
});
