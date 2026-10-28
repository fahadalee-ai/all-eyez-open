import { createFileRoute } from "@tanstack/react-router";
import { SheltersScreen } from "@/screens/account";

export const Route = createFileRoute("/shelters")({
  component: SheltersScreen,
});
