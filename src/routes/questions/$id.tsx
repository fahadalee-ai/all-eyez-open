import { createFileRoute } from "@tanstack/react-router";
import { QuestionDetailScreen } from "@/screens/account";

export const Route = createFileRoute("/questions/$id")({
  component: QuestionDetailScreenRoute,
});

function QuestionDetailScreenRoute() {
  const { id } = Route.useParams();
  return <QuestionDetailScreen id={id} />;
}
