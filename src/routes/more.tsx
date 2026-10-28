import { createFileRoute } from "@tanstack/react-router";
import { MoreScreen } from "@/screens/account";

export const Route = createFileRoute("/more")({
  component: MoreScreen,
});
