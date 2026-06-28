import { prisma } from "@/lib/prisma";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
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
        <h1 className="text-4xl font-bold text-zinc-900">Orders</h1>
        <p className="mt-2 text-zinc-600">Manage customer orders.</p>

        {orders.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-8 text-center shadow-md">
            <p className="text-zinc-600">No orders yet.</p>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="rounded-3xl bg-white p-6 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900">
                      {order.customer.name}
                    </h2>
                    <p className="text-zinc-600">{order.customer.phone}</p>
                    <p className="text-zinc-600">{order.customer.address}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-orange-600">
                      ₹{order.totalAmount}
                    </p>
                    <p className="text-sm font-semibold text-zinc-600">
                      {order.status}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t pt-4">
                  {order.items.map((item) => (
                    <p key={item.id} className="text-zinc-700">
                      {item.product.name} - {item.weight} × {item.quantity} = ₹
                      {item.price * item.quantity}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}