import ProductCard from "./ProductCard";
import SectionTitle from "./SectionTitle";
import { prisma } from "@/lib/prisma";

export default async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
    },
    include: {
      weightOptions: true,
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 3,
  });

  const formattedProducts = products.map((product) => ({
  ...product,
  badge: product.badge ?? undefined,
  price: `₹${
    product.weightOptions.find((option) => option.weight === "1kg")?.price ?? 0
  }/kg`,
}));

  return (
    <section id="sweets" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Our Special Sweets"
          subtitle="Freshly prepared every day using premium ingredients and traditional recipes."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {formattedProducts.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}