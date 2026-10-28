import { createFileRoute } from "@tanstack/react-router";
import { AccessibilityScreen } from "@/screens/account";

export const Route = createFileRoute("/settings/accessibility")({
  component: AccessibilityScreen,
});
