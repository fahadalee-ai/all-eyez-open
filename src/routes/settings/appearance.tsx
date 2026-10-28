import { createFileRoute } from "@tanstack/react-router";
import { AppearanceScreen } from "@/screens/account";

export const Route = createFileRoute("/settings/appearance")({
  component: AppearanceScreen,
});
