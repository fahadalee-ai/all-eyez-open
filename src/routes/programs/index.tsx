import { createFileRoute } from "@tanstack/react-router";
import { ProgramsScreen } from "@/screens/shop";

export const Route = createFileRoute("/programs/")({
  component: ProgramsScreen,
});
