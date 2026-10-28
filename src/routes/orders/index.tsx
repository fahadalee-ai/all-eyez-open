import { createFileRoute } from "@tanstack/react-router";
import { OrdersScreen } from "@/screens/shop";

export const Route = createFileRoute("/orders/")({
  component: OrdersScreen,
});
