import { createFileRoute } from "@tanstack/react-router";
import { SocialScreen } from "@/screens/account";

export const Route = createFileRoute("/social")({
  component: SocialScreen,
});
