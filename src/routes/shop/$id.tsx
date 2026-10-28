import { createFileRoute } from "@tanstack/react-router";
import { ProductScreen } from "@/screens/shop";

export const Route = createFileRoute("/shop/$id")({
  component: ProductScreenRoute,
});

function ProductScreenRoute() {
  const { id } = Route.useParams();
  return <ProductScreen id={id} />;
}
