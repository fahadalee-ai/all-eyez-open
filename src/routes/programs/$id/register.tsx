import { createFileRoute } from "@tanstack/react-router";
import { ProgramRegisterScreen } from "@/screens/shop";

export const Route = createFileRoute("/programs/$id/register")({
  component: ProgramRegisterScreenRoute,
});

function ProgramRegisterScreenRoute() {
  const { id } = Route.useParams();
  return <ProgramRegisterScreen id={id} />;
}
