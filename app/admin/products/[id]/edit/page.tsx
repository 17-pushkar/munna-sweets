import { prisma } from "@/lib/prisma";
import { updateProduct } from "../../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { weightOptions: true },
  });

  if (!product) {
    return <h1 className="p-10 text-3xl font-bold">Product not found</h1>;
  }

  const getPrice = (weight: string) =>
    product.weightOptions.find((item) => item.weight === weight)?.price ?? 0;

  const inputClass =
    "w-full rounded-xl border border-orange-200 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200";

  return (
    <main className="min-h-screen bg-zinc-100 px-6 py-24">
      <section className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-md">
        <h1 className="text-4xl font-bold text-zinc-900">Edit Product</h1>

        <form action={updateProduct} className="mt-8 space-y-5">
          <input type="hidden" name="id" value={product.id} />

          <input name="name" defaultValue={product.name} className={inputClass} />
          <input name="slug" defaultValue={product.slug} className={inputClass} />
          <input name="image" defaultValue={product.image} className={inputClass} />
          <input name="category" defaultValue={product.category} className={inputClass} />
          <input name="badge" defaultValue={product.badge ?? ""} className={inputClass} />

          <textarea
            name="description"
            defaultValue={product.description}
            className={inputClass}
            rows={4}
          />

          <input
            name="ingredients"
            defaultValue={product.ingredients.join(", ")}
            className={inputClass}
          />

          <h2 className="pt-4 text-2xl font-bold text-zinc-900">Weight Prices</h2>

          <input name="price250g" type="number" defaultValue={getPrice("250g")} className={inputClass} />
          <input name="price500g" type="number" defaultValue={getPrice("500g")} className={inputClass} />
          <input name="price1kg" type="number" defaultValue={getPrice("1kg")} className={inputClass} />
          <input name="price2kg" type="number" defaultValue={getPrice("2kg")} className={inputClass} />

          <button
            type="submit"
            className="rounded-full bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
          >
            Update Product
          </button>
        </form>
      </section>
    </main>
  );
}