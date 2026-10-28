import { createFileRoute } from "@tanstack/react-router";
import { OrderConfirmedScreen } from "@/screens/shop";

export const Route = createFileRoute("/order-confirmed/$id")({
  component: OrderConfirmedScreenRoute,
});

function OrderConfirmedScreenRoute() {
  const { id } = Route.useParams();
  return <OrderConfirmedScreen id={id} />;
}
