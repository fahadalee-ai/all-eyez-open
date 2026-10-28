import { createFileRoute } from "@tanstack/react-router";
import { CheckoutScreen } from "@/screens/shop";

export const Route = createFileRoute("/checkout")({
  component: CheckoutScreen,
});
