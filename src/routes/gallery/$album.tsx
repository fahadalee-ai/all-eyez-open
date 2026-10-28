import { createFileRoute } from "@tanstack/react-router";
import { AlbumScreen } from "@/screens/account";

export const Route = createFileRoute("/gallery/$album")({
  component: AlbumScreenRoute,
});

function AlbumScreenRoute() {
  const { album } = Route.useParams();
  return <AlbumScreen album={album} />;
}
