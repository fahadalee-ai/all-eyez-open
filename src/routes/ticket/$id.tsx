import { createFileRoute } from "@tanstack/react-router";
import { TicketScreen } from "@/screens/shop";

export const Route = createFileRoute("/ticket/$id")({
  component: TicketScreenRoute,
});

function TicketScreenRoute() {
  const { id } = Route.useParams();
  return <TicketScreen id={id} />;
}
