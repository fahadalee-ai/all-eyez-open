import { createFileRoute } from "@tanstack/react-router";
import { SupportersScreen } from "@/screens/donate";

export const Route = createFileRoute("/supporters")({
  component: SupportersScreen,
});
