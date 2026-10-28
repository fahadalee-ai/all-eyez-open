import { createFileRoute } from "@tanstack/react-router";
import { ChatListScreen } from "@/screens/chat";

export const Route = createFileRoute("/chat/")({
  component: ChatListScreen,
});
