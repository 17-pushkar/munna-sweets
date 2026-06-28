"use client";

import Image from "next/image";
import { Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9998] bg-black/50">
      <div className="fixed right-0 top-0 z-[9999] h-screen w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-bold text-zinc-900">Your Cart</h2>

          <button onClick={onClose}>
            <X className="h-6 w-6 text-zinc-700" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="mt-8 text-center text-zinc-600">Your cart is empty.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.slug}-${item.weight}`}
                className="flex gap-4 rounded-2xl border border-orange-100 p-4"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-zinc-900">{item.name}</h3>

                  <p className="mt-1 text-sm text-zinc-500">
                    Weight: {item.weight}
                  </p>

                  <p className="mt-1 font-semibold text-orange-600">
                    ₹{item.price}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.slug, item.weight)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-200 text-orange-600"
                      >
                        -
                      </button>

                      <span className="font-semibold text-zinc-900">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.slug, item.weight)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-200 text-orange-600"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.slug, item.weight)}
                      className="rounded-full p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600"
                      title="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-6 border-t pt-5">
            <div className="flex items-center justify-between text-xl font-bold text-zinc-900">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

           <a
  href="/checkout"
  onClick={onClose}
  className="mt-5 block w-full rounded-full bg-green-600 py-3 text-center font-semibold text-white transition hover:bg-green-700"
>
  Proceed to Checkout
</a>
          </div>
        )}
      </div>
    </div>
  );
}