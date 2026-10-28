import { createFileRoute } from "@tanstack/react-router";
import { ProgramDetailScreen } from "@/screens/shop";

export const Route = createFileRoute("/programs/$id/")({
  component: ProgramDetailScreenRoute,
});

function ProgramDetailScreenRoute() {
  const { id } = Route.useParams();
  return <ProgramDetailScreen id={id} />;
}
