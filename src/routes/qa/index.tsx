import { createFileRoute } from "@tanstack/react-router";
import { QaScreen } from "@/screens/account";

export const Route = createFileRoute("/qa/")({
  component: QaScreen,
});
