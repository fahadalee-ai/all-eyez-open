import { createFileRoute } from "@tanstack/react-router";
import { ConsultModeScreen } from "@/screens/consult";

export const Route = createFileRoute("/consult/mode")({
  component: ConsultModeScreen,
});
