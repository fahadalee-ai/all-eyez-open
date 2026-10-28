import { createFileRoute } from "@tanstack/react-router";
import { DonationsScreen } from "@/screens/donate";

export const Route = createFileRoute("/donations")({
  component: DonationsScreen,
});
