import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductDetailsActions from "@/components/ProductDetailsActions";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      weightOptions: true,
    },
  });

  if (!product) {
    return (
      <main className="min-h-screen px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-zinc-900">Product not found</h1>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 text-white"
        >
          Go back to products
        </Link>
      </main>
    );
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      slug: {
        not: slug,
      },
    },
    include: {
      weightOptions: true,
    },
    take: 3,
  });

  const displayPrice = `₹${
    product.weightOptions.find((option) => option.weight === "1kg")?.price ?? 0
  }/kg`;

  return (
    <main className="min-h-screen bg-orange-50 px-6 py-24">
      <section className="mx-auto grid max-w-6xl gap-10 rounded-3xl bg-white p-6 shadow-lg md:grid-cols-2 md:p-10">
        <div className="relative h-80 overflow-hidden rounded-3xl md:h-[480px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
            Munna Sweets Special
          </p>

          <h1 className="mt-3 text-4xl font-bold text-zinc-900">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-bold text-orange-600">
            {displayPrice}
          </p>

          <p className="mt-5 text-lg leading-8 text-zinc-600">
            {product.description}
          </p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-zinc-900">
              Available Quantity
            </h2>

            <div className="mt-3 flex flex-wrap gap-3">
              {product.weightOptions.map((option) => (
                <span
                  key={option.weight}
                  className="rounded-full border border-orange-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-700"
                >
                  {option.weight}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-zinc-900">
              Ingredients
            </h2>

            <div className="mt-3 flex flex-wrap gap-3">
              {product.ingredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          <ProductDetailsActions
            product={{
              name: product.name,
              slug: product.slug,
              image: product.image,
              weightOptions: product.weightOptions,
            }}
          />
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <h2 className="text-3xl font-bold text-zinc-900">Related Products</h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map((item) => {
            const itemPrice = `₹${
              item.weightOptions.find((option) => option.weight === "1kg")
                ?.price ?? 0
            }/kg`;

            return (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                className="group overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-56">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-zinc-900">
                    {item.name}
                  </h3>
                  <p className="mt-2 font-semibold text-orange-600">
                    {itemPrice}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}