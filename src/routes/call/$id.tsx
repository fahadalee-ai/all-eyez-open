import { createFileRoute } from "@tanstack/react-router";
import { CallScreen } from "@/screens/consult";

export const Route = createFileRoute("/call/$id")({
  component: CallScreenRoute,
});

function CallScreenRoute() {
  const { id } = Route.useParams();
  return <CallScreen id={id} />;
}
