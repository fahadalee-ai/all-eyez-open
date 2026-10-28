import { createFileRoute } from "@tanstack/react-router";
import { ConsultDetailsScreen } from "@/screens/consult";

export const Route = createFileRoute("/consult/details")({
  component: ConsultDetailsScreen,
});
