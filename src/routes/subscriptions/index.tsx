import { createFileRoute } from "@tanstack/react-router";
import { MySubscriptionsScreen } from "@/screens/subscribe";

export const Route = createFileRoute("/subscriptions/")({
  component: MySubscriptionsScreen,
});
