import { createFileRoute } from "@tanstack/react-router";
import { ChatThreadScreen } from "@/screens/chat";

export const Route = createFileRoute("/chat/$id")({
  component: ChatThreadScreenRoute,
});

function ChatThreadScreenRoute() {
  const { id } = Route.useParams();
  return <ChatThreadScreen id={id} />;
}
