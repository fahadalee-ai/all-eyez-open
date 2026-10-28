import { createFileRoute } from "@tanstack/react-router";
import { ProfessionalScreen } from "@/screens/community";

export const Route = createFileRoute("/professional")({
  component: ProfessionalScreen,
});
