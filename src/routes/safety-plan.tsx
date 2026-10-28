import { createFileRoute } from "@tanstack/react-router";
import { SafetyPlanScreen } from "@/screens/account";

export const Route = createFileRoute("/safety-plan")({
  component: SafetyPlanScreen,
});
