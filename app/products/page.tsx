import ProductsClient from "@/components/ProductsClient";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const dbProducts = await prisma.product.findMany({
    include: {
      weightOptions: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const products = dbProducts.map((product) => ({
    ...product,
    price: `₹${product.weightOptions.find((option) => option.weight === "1kg")?.price ?? 0}/kg`,
  }));

  return <ProductsClient products={products} />;
}