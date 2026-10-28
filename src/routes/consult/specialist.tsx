import { createFileRoute } from "@tanstack/react-router";
import { ConsultSpecialistScreen } from "@/screens/consult";

export const Route = createFileRoute("/consult/specialist")({
  component: ConsultSpecialistScreen,
});
