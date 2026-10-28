import { createFileRoute } from "@tanstack/react-router";
import { RateScreen } from "@/screens/consult";

export const Route = createFileRoute("/rate/$id")({
  component: RateScreenRoute,
});

function RateScreenRoute() {
  const { id } = Route.useParams();
  return <RateScreen id={id} />;
}
