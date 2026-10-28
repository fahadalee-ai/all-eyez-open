import { createFileRoute } from "@tanstack/react-router";
import { CartScreen } from "@/screens/shop";

export const Route = createFileRoute("/cart")({
  component: CartScreen,
});
