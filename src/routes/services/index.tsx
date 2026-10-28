import { createFileRoute } from "@tanstack/react-router";
import { ServicesScreen } from "@/screens/services";

export const Route = createFileRoute("/services/")({
  component: ServicesScreen,
});
