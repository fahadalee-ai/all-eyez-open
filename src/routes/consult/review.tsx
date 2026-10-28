import { createFileRoute } from "@tanstack/react-router";
import { ConsultReviewScreen } from "@/screens/consult";

export const Route = createFileRoute("/consult/review")({
  component: ConsultReviewScreen,
});
