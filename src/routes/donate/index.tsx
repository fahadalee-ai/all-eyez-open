import { createFileRoute } from "@tanstack/react-router";
import { DonateScreen } from "@/screens/donate";

export const Route = createFileRoute("/donate/")({
  component: DonateScreen,
});
