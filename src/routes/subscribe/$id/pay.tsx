import { createFileRoute } from "@tanstack/react-router";
import { SubscribePayScreen } from "@/screens/subscribe";

export const Route = createFileRoute("/subscribe/$id/pay")({
  component: SubscribePayRoute,
});

function SubscribePayRoute() {
  const { id } = Route.useParams();
  return <SubscribePayScreen id={id} />;
}
