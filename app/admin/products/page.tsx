import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "./actions";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      weightOptions: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-100 px-6 py-24">
      <section className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900">Products</h1>
            <p className="mt-2 text-zinc-600">Manage all sweets products.</p>
          </div>

          <Link
            href="/admin/products/new"
            className="rounded-full bg-orange-600 px-6 py-3 font-semibold text-white"
          >
            Add Product
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-md">
          {products.map((product) => {
            const price =
              product.weightOptions.find((item) => item.weight === "1kg")
                ?.price ?? 0;

            return (
              <div
                key={product.id}
                className="flex items-center justify-between border-b p-5 last:border-b-0"
              >
                <div>
                  <h2 className="text-xl font-bold text-zinc-900">
                    {product.name}
                  </h2>
                  <p className="text-zinc-600">₹{price}/kg</p>
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-sm font-semibold text-orange-600"
                  >
                    View
                  </Link>
                  <Link
  href={`/admin/products/${product.id}/edit`}
  className="text-sm font-semibold text-blue-600"
>
  Edit
</Link>

                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />

                    <button
                      type="submit"
                      className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}