import { createFileRoute } from "@tanstack/react-router";
import { ConsultTypeScreen } from "@/screens/consult";

export const Route = createFileRoute("/consult/")({
  component: ConsultTypeScreen,
});
