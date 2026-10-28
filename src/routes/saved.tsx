import { createFileRoute } from "@tanstack/react-router";
import { SavedScreen } from "@/screens/account";

export const Route = createFileRoute("/saved")({
  component: SavedScreen,
});
