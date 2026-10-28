import { createFileRoute } from "@tanstack/react-router";
import { ImpactScreen } from "@/screens/account";

export const Route = createFileRoute("/impact")({
  component: ImpactScreen,
});
