import { createFileRoute } from "@tanstack/react-router";
import { ContactSentScreen } from "@/screens/account";

export const Route = createFileRoute("/contact/sent")({
  component: ContactSentScreen,
});
