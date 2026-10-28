import { createFileRoute } from "@tanstack/react-router";
import { TeamScreen } from "@/screens/account";

export const Route = createFileRoute("/team")({
  component: TeamScreen,
});
