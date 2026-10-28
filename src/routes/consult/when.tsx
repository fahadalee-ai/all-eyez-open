import { createFileRoute } from "@tanstack/react-router";
import { ConsultWhenScreen } from "@/screens/consult";

export const Route = createFileRoute("/consult/when")({
  component: ConsultWhenScreen,
});
