import { createFileRoute } from "@tanstack/react-router";
import { GuidelinesScreen } from "@/screens/community";

export const Route = createFileRoute("/guidelines")({
  component: GuidelinesScreen,
});
