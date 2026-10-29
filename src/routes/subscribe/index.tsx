import { createFileRoute } from "@tanstack/react-router";
import { SubscribeListScreen } from "@/screens/subscribe";

export const Route = createFileRoute("/subscribe/")({
  component: SubscribeListScreen,
});
