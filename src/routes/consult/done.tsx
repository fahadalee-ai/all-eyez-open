import { createFileRoute } from "@tanstack/react-router";
import { ConsultDoneScreen } from "@/screens/consult";

export const Route = createFileRoute("/consult/done")({
  component: ConsultDoneScreen,
});
