import { createFileRoute } from "@tanstack/react-router";
import { OrderDetailScreen } from "@/screens/shop";

export const Route = createFileRoute("/orders/$id/")({
  component: OrderDetailScreenRoute,
});

function OrderDetailScreenRoute() {
  const { id } = Route.useParams();
  return <OrderDetailScreen id={id} />;
}
