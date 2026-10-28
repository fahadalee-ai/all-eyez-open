import { createFileRoute } from "@tanstack/react-router";
import { SetupSafetyScreen } from "@/screens/auth";

export const Route = createFileRoute("/setup-safety")({
  component: SetupSafetyScreen,
});
