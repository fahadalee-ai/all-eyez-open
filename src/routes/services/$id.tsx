import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailScreen } from "@/screens/services";

export const Route = createFileRoute("/services/$id")({
  component: ServiceDetailScreenRoute,
});

function ServiceDetailScreenRoute() {
  const { id } = Route.useParams();
  return <ServiceDetailScreen id={id} />;
}
