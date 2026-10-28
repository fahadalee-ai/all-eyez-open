import { createFileRoute } from "@tanstack/react-router";
import { PrivacySettingsScreen } from "@/screens/account";

export const Route = createFileRoute("/settings/privacy")({
  component: PrivacySettingsScreen,
});
