import { createFileRoute } from "@tanstack/react-router";
import { MyPostsScreen } from "@/screens/account";

export const Route = createFileRoute("/my-posts")({
  component: MyPostsScreen,
});
