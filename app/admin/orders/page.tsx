export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { updateOrderStatus } from "./actions";

const statuses = ["Pending", "Preparing", "Ready", "Delivered"];
function getStatusClass(status: string) {
  if (status === "Pending") {
    return "bg-yellow-100 text-yellow-700";
  }

  if (status === "Preparing") {
    return "bg-blue-100 text-blue-700";
  }

  if (status === "Ready") {
    return "bg-purple-100 text-purple-700";
  }

  if (status === "Delivered") {
    return "bg-green-100 text-green-700";
  }

  return "bg-zinc-100 text-zinc-700";
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  const orders = await prisma.order.findMany({
  where: search
    ? {
        customer: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
            { address: { contains: search, mode: "insensitive" } },
          ],
        },
      }
    : undefined,
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-100 px-6 py-24">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
  <div>
    <p className="font-semibold uppercase tracking-wide text-orange-500">
      Admin Panel
    </p>

    <h1 className="mt-2 text-4xl font-bold text-zinc-900">Orders</h1>

    <p className="mt-2 text-zinc-600">
      View and manage customer orders.
    </p>
  </div>

  <div className="flex items-center gap-3">
    <form action="/admin/orders">
      <input
        type="text"
        name="search"
        defaultValue={search ?? ""}
        placeholder="🔍 Search orders..."
        className="w-72 rounded-xl border border-orange-200 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
      />
    </form>

    {search && (
      <a
        href="/admin/orders"
        className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-600 hover:bg-zinc-50"
      >
        Clear
      </a>
    )}
  </div>
</div>

        {orders.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-8 text-center shadow-md">
            <p className="text-zinc-600">No orders yet.</p>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="rounded-3xl bg-white p-6 shadow-md">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-5">
                  <div>
                    <h2 className="text-2xl font-bold text-zinc-900">
                      {order.customer.name}
                    </h2>

                    <p className="mt-1 text-zinc-600">
                      📞 {order.customer.phone}
                    </p>

                    <p className="mt-1 text-zinc-600">
                      📍 {order.customer.address}
                    </p>

                    <p className="mt-2 text-sm text-zinc-500">
                      Order Date:{" "}
                      {new Date(order.createdAt).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="text-right">
                   <span
  className={`rounded-full px-4 py-2 text-sm font-bold ${getStatusClass(
    order.status
  )}`}
>
  {order.status}
</span>

                    <p className="mt-4 text-2xl font-bold text-orange-600">
                      ₹{order.totalAmount}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="font-bold text-zinc-900">Ordered Items</h3>

                  <div className="mt-3 space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-2xl bg-orange-50 px-4 py-3"
                      >
                        <div>
                          <p className="font-semibold text-zinc-900">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-zinc-600">
                            {item.weight} × {item.quantity}
                          </p>
                        </div>

                        <p className="font-bold text-orange-600">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <form action={updateOrderStatus} className="mt-5 flex flex-wrap items-center gap-3">
                  <input type="hidden" name="orderId" value={order.id} />

                  <select
                    name="status"
                    defaultValue={order.status}
                    className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-700 outline-none focus:border-orange-500"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <button
                    type="submit"
                    className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                  >
                    Update Status
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}