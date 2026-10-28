import { createFileRoute } from "@tanstack/react-router";
import { DonatePayScreen } from "@/screens/donate";

export const Route = createFileRoute("/donate/pay")({
  component: DonatePayScreen,
});
