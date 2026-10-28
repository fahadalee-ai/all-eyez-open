import { createFileRoute } from "@tanstack/react-router";
import { QueriesScreen } from "@/screens/account";

export const Route = createFileRoute("/queries")({
  component: QueriesScreen,
});
