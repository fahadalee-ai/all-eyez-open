import { createFileRoute } from "@tanstack/react-router";
import { NotificationsScreen } from "@/screens/account";

export const Route = createFileRoute("/notifications")({
  component: NotificationsScreen,
});
