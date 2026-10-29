import { createFileRoute } from "@tanstack/react-router";
import { SubscribeThanksScreen } from "@/screens/subscribe";

export const Route = createFileRoute("/subscribe/thanks")({
  component: SubscribeThanksScreen,
});
