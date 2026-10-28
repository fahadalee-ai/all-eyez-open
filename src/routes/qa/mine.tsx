import { createFileRoute } from "@tanstack/react-router";
import { MyQuestionsScreen } from "@/screens/account";

export const Route = createFileRoute("/qa/mine")({
  component: MyQuestionsScreen,
});
