import { createFileRoute } from "@tanstack/react-router";
import { DonorDetailsScreen } from "@/screens/donate";

export const Route = createFileRoute("/donate/details")({
  component: DonorDetailsScreen,
});
