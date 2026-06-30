import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteProductButton from "@/components/DeleteProductButton";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; stock?: string }>;
}) {
  const { search, stock } = await searchParams;
 const products = await prisma.product.findMany({
  where: {
  ...(search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { category: { contains: search, mode: "insensitive" as const } },
          { slug: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {}),
  ...(stock === "low"
    ? {
        stock: {
          lte: 10,
        },
      }
    : {}),
},
    include: {
      weightOptions: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-20 sm:px-6 sm:py-24">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
  <div>
    <p className="font-semibold uppercase tracking-wide text-orange-500">
      Admin Panel
    </p>

    <h1 className="mt-2 text-4xl font-bold text-zinc-900">
      Products
    </h1>

    <p className="mt-2 text-zinc-600">
      Manage all sweets products.
    </p>
  </div>

  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
   <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
  <form action="/admin/products">
    <input
      type="text"
      name="search"
      defaultValue={search ?? ""}
      placeholder="🔍 Search products..."
      className="w-full sm:w-72 rounded-xl border border-orange-200 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
    />
  </form>

  {(search || stock) && (
  <Link
    href="/admin/products"
    className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-600 hover:bg-zinc-50"
  >
    Clear
  </Link>
)}

<Link
  href="/admin/products?stock=low"
  className={`rounded-xl px-4 py-3 text-sm font-semibold ${
    stock === "low"
      ? "bg-yellow-500 text-white"
      : "border border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
  }`}
>
  Low Stock
</Link>
</div>

    <Link
      href="/admin/products/new"
      className="rounded-full bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
    >
      Add Product
    </Link>
  </div>
</div>

        {products.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-8 text-center shadow-md">
            <p className="text-zinc-600">No products found.</p>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-md">
            <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1.5fr] gap-4 border-b bg-orange-50 px-6 py-4 text-sm font-bold text-zinc-700 md:grid">
              <p>Product</p>
              <p>Category</p>
              <p>1kg Price</p>
              <p>Stock</p>
              <p>Badge</p>
              <p className="text-right">Actions</p>
            </div>

            {products.map((product) => {
              const price =
                product.weightOptions.find((item) => item.weight === "1kg")
                  ?.price ?? 0;

              return (
                <div
  key={product.id}
  className="grid gap-5 border-b p-5 last:border-b-0 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1.5fr] md:items-center md:px-6"
>
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-orange-50">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h2 className="font-bold text-zinc-900">
                        {product.name}
                      </h2>
                      <p className="text-sm text-zinc-500">
                        /products/{product.slug}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-zinc-700">
                    {product.category}
                  </p>

                  <p className="text-sm font-bold text-orange-600">
                    ₹{price}
                  </p>

                  <div>
  <span
    className={`rounded-full px-3 py-1 text-xs font-bold ${
      product.stock === 0
        ? "bg-red-100 text-red-700"
        : product.stock <= 10
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    {product.stock} in stock
  </span>
</div>

                  <div>
                    {product.badge ? (
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                        {product.badge}
                      </span>
                    ) : (
                      <span className="text-sm text-zinc-400">No badge</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:justify-end">
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-full sm:w-auto rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-200"
                    >
                      View
                    </Link>

                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="w-full sm:w-auto rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-100"
                    >
                      Edit
                    </Link>

                   <DeleteProductButton
  productId={product.id}
  productName={product.name}
/>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}