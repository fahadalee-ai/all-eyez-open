import { createFileRoute } from "@tanstack/react-router";
import { PhotoScreen } from "@/screens/account";

export const Route = createFileRoute("/photos/$id")({
  component: PhotoScreenRoute,
});

function PhotoScreenRoute() {
  const { id } = Route.useParams();
  return <PhotoScreen id={id} />;
}
