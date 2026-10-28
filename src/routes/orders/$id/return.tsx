import { createFileRoute } from "@tanstack/react-router";
import { ReturnScreen } from "@/screens/shop";

export const Route = createFileRoute("/orders/$id/return")({
  component: ReturnScreenRoute,
});

function ReturnScreenRoute() {
  const { id } = Route.useParams();
  return <ReturnScreen id={id} />;
}
