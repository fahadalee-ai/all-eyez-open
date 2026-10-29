import { createFileRoute } from "@tanstack/react-router";
import { SubscribeDetailsScreen } from "@/screens/subscribe";

export const Route = createFileRoute("/subscribe/$id/details")({
  component: SubscribeDetailsRoute,
});

function SubscribeDetailsRoute() {
  const { id } = Route.useParams();
  return <SubscribeDetailsScreen id={id} />;
}
