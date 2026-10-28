import { createFileRoute } from "@tanstack/react-router";
import { SponsorScreen } from "@/screens/donate";

export const Route = createFileRoute("/sponsor")({
  component: SponsorScreen,
});
