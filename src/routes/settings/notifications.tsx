import { createFileRoute } from "@tanstack/react-router";
import { NotificationSettingsScreen } from "@/screens/account";

export const Route = createFileRoute("/settings/notifications")({
  component: NotificationSettingsScreen,
});
