import { createFileRoute } from "@tanstack/react-router";
import { PostDetailScreen } from "@/screens/community";

export const Route = createFileRoute("/community/$id")({
  component: PostDetailScreenRoute,
});

function PostDetailScreenRoute() {
  const { id } = Route.useParams();
  return <PostDetailScreen id={id} />;
}
