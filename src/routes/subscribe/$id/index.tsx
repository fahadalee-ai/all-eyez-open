import { createFileRoute } from "@tanstack/react-router";
import { SubscribePlanScreen } from "@/screens/subscribe";

export const Route = createFileRoute("/subscribe/$id/")({
  component: SubscribePlanRoute,
});

function SubscribePlanRoute() {
  const { id } = Route.useParams();
  return <SubscribePlanScreen id={id} />;
}
