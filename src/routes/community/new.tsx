import { createFileRoute } from "@tanstack/react-router";
import { CreatePostScreen } from "@/screens/community";

export const Route = createFileRoute("/community/new")({
  component: CreatePostScreen,
});
