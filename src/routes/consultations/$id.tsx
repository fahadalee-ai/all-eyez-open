import { createFileRoute } from "@tanstack/react-router";
import { ConsultationDetailScreen } from "@/screens/consult";

export const Route = createFileRoute("/consultations/$id")({
  component: ConsultationDetailScreenRoute,
});

function ConsultationDetailScreenRoute() {
  const { id } = Route.useParams();
  return <ConsultationDetailScreen id={id} />;
}
