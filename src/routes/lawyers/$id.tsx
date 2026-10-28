import { createFileRoute } from "@tanstack/react-router";
import { LawyerScreen } from "@/screens/community";

export const Route = createFileRoute("/lawyers/$id")({
  component: LawyerScreenRoute,
});

function LawyerScreenRoute() {
  const { id } = Route.useParams();
  return <LawyerScreen id={id} />;
}
