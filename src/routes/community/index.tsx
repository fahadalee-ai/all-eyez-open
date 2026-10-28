import { createFileRoute } from "@tanstack/react-router";
import { CommunityScreen } from "@/screens/community";

export const Route = createFileRoute("/community/")({
  component: CommunityScreen,
});
