import { createFileRoute } from "@tanstack/react-router";
import { CareersScreen } from "@/screens/account";

export const Route = createFileRoute("/careers")({
  component: CareersScreen,
});
