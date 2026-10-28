import { createFileRoute } from "@tanstack/react-router";
import { DonateThanksScreen } from "@/screens/donate";

export const Route = createFileRoute("/donate/thanks")({
  component: DonateThanksScreen,
});
