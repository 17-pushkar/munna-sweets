import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const [totalProducts, totalOrders, totalCustomers, revenueData] =
    await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.customer.count(),
      prisma.order.aggregate({
        _sum: {
          totalAmount: true,
        },
      }),
    ]);

  const totalRevenue = revenueData._sum.totalAmount || 0;

  return (
    <main className="min-h-screen bg-zinc-100 px-6 py-24">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-zinc-900">Admin Dashboard</h1>
        <p className="mt-3 text-zinc-600">
          Manage products, orders, and customers for Munna Sweets.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-md">
            <p className="text-sm font-medium text-zinc-500">Total Products</p>
            <h2 className="mt-3 text-3xl font-bold text-zinc-900">
              {totalProducts}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <p className="text-sm font-medium text-zinc-500">Total Orders</p>
            <h2 className="mt-3 text-3xl font-bold text-zinc-900">
              {totalOrders}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <p className="text-sm font-medium text-zinc-500">Customers</p>
            <h2 className="mt-3 text-3xl font-bold text-zinc-900">
              {totalCustomers}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <p className="text-sm font-medium text-zinc-500">Total Revenue</p>
            <h2 className="mt-3 text-3xl font-bold text-green-700">
              ₹{totalRevenue}
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Link
            href="/admin/products"
            className="rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h2 className="text-2xl font-bold text-zinc-900">Products</h2>
            <p className="mt-2 text-zinc-600">Add, edit, and delete sweets.</p>
          </Link>

          <Link
            href="/admin/orders"
            className="rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h2 className="text-2xl font-bold text-zinc-900">Orders</h2>
            <p className="mt-2 text-zinc-600">View customer orders.</p>
          </Link>

          <div className="rounded-3xl bg-white p-6 shadow-md opacity-70">
            <h2 className="text-2xl font-bold text-zinc-900">Customers</h2>
            <p className="mt-2 text-zinc-600">
              Customer management coming soon.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}