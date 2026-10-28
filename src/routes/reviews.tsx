import { createFileRoute } from "@tanstack/react-router";
import { ReviewsScreen } from "@/screens/account";

export const Route = createFileRoute("/reviews")({
  component: ReviewsScreen,
});
