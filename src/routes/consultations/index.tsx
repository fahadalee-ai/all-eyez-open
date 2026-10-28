import { createFileRoute } from "@tanstack/react-router";
import { ConsultationsScreen } from "@/screens/consult";

export const Route = createFileRoute("/consultations/")({
  component: ConsultationsScreen,
});
