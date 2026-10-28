import { createFileRoute } from "@tanstack/react-router";
import { SitemapScreen } from "@/screens/account";

export const Route = createFileRoute("/index-map")({
  component: SitemapScreen,
});
