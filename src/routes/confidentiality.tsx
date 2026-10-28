import { createFileRoute } from "@tanstack/react-router";
import { ConfidentialityScreen } from "@/screens/account";

export const Route = createFileRoute("/confidentiality")({
  component: ConfidentialityScreen,
});
