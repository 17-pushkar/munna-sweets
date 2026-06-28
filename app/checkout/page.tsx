"use client";

import { useState } from "react";
import OrderSummary from "@/components/OrderSummary";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cartItems } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/orders", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name,
    phone,
    address,
    totalAmount: totalPrice,
    items: cartItems,
  }),
});

    const message = `Hello Munna Sweets, I want to place an order:

Name: ${name}
Phone: ${phone}
Address: ${address}

Order:
${cartItems
  .map((item) => `${item.name} x ${item.quantity} = ${item.price}`)
  .join("\n")}

Total: ₹${totalPrice}`;

    window.open(
  `https://wa.me/919999999999?text=${encodeURIComponent(message)}`,
  "_blank"
);

window.location.href = "/order-success";
  };

  return (
    <main className="min-h-screen bg-orange-50 px-6 py-24">
      <section className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-zinc-900">Checkout</h1>
        <p className="mt-3 text-zinc-600">
          Enter your details to place your order on WhatsApp.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="grid gap-5">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-xl border border-orange-200 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="rounded-xl border border-orange-200 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />

            <textarea
              placeholder="Delivery Address"
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="rounded-xl border border-orange-200 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />

            <button
              type="submit"
              className="rounded-full bg-orange-600 py-3 font-semibold text-white transition hover:bg-orange-700"
            >
              Place Order on WhatsApp
            </button>
          </form>

          <OrderSummary />
        </div>
      </section>
    </main>
  );
}