import { createFileRoute } from "@tanstack/react-router";
import { ShopScreen } from "@/screens/shop";

export const Route = createFileRoute("/shop/")({
  component: ShopScreen,
});
