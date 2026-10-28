import { createFileRoute } from "@tanstack/react-router";
import { VolunteerScreen } from "@/screens/donate";

export const Route = createFileRoute("/volunteer")({
  component: VolunteerScreen,
});
