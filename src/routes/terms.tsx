import { createFileRoute } from "@tanstack/react-router";
import { TermsScreen } from "@/screens/account";

export const Route = createFileRoute("/terms")({
  component: TermsScreen,
});
