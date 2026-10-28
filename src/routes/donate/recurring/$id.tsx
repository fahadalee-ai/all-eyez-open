import { createFileRoute } from "@tanstack/react-router";
import { RecurringScreen } from "@/screens/donate";

export const Route = createFileRoute("/donate/recurring/$id")({
  component: RecurringScreenRoute,
});

function RecurringScreenRoute() {
  const { id } = Route.useParams();
  return <RecurringScreen id={id} />;
}
