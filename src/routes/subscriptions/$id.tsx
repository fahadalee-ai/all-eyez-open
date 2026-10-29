import { createFileRoute } from "@tanstack/react-router";
import { ManageSubscriptionScreen } from "@/screens/subscribe";

export const Route = createFileRoute("/subscriptions/$id")({
  component: ManageSubscriptionRoute,
});

function ManageSubscriptionRoute() {
  const { id } = Route.useParams();
  return <ManageSubscriptionScreen id={id} />;
}
