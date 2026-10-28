import { createFileRoute } from "@tanstack/react-router";
import { DonateReviewScreen } from "@/screens/donate";

export const Route = createFileRoute("/donate/review")({
  component: DonateReviewScreen,
});
