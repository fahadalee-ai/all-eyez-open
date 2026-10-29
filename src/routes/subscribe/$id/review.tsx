import { createFileRoute } from "@tanstack/react-router";
import { SubscribeReviewScreen } from "@/screens/subscribe";

export const Route = createFileRoute("/subscribe/$id/review")({
  component: SubscribeReviewRoute,
});

function SubscribeReviewRoute() {
  const { id } = Route.useParams();
  return <SubscribeReviewScreen id={id} />;
}
