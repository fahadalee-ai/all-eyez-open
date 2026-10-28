import { createFileRoute } from "@tanstack/react-router";
import { AskQuestionScreen } from "@/screens/account";

export const Route = createFileRoute("/qa/ask")({
  component: AskQuestionScreen,
});
