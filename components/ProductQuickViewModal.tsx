"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

type WeightOption = {
  weight: string;
  price: number;
};

type ProductQuickViewModalProps = {
  name: string;
  slug: string;
  price: string;
  image: string;
  description: string;
  category: string;
  ingredients: string[];
  stock: number;
  weightOptions: WeightOption[];
  onClose: () => void;
};

export default function ProductQuickViewModal({
  name,
  slug,
  image,
  description,
  category,
  ingredients,
  stock,
  weightOptions,
  onClose,
}: ProductQuickViewModalProps) {
  const [selectedWeight, setSelectedWeight] = useState(weightOptions[0]);
  const { addToCart } = useCart();

  const isOutOfStock = stock <= 0;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-3xl bg-white p-6 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-2xl font-bold text-zinc-500 hover:text-zinc-900"
        >
          ×
        </button>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative h-72 overflow-hidden rounded-2xl md:h-96">
            <Image src={image} alt={name} fill className="object-cover" />

            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-red-600">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          <div>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-600">
              {category}
            </span>

            <h2 className="mt-4 text-3xl font-bold text-zinc-900">{name}</h2>

            <p className="mt-3 text-2xl font-bold text-orange-600">
              ₹{selectedWeight.price}
            </p>

            <p className="mt-4 text-zinc-600">{description}</p>

            <div className="mt-5">
              <h3 className="font-semibold text-zinc-900">Select Weight</h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {weightOptions.map((option) => (
                  <button
                    key={option.weight}
                    type="button"
                    onClick={() => setSelectedWeight(option)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      selectedWeight.weight === option.weight
                        ? "border-orange-600 bg-orange-600 text-white"
                        : "border-orange-200 text-zinc-700 hover:bg-orange-50"
                    }`}
                  >
                    {option.weight}
                  </button>
                ))}
              </div>
            </div>

            <h3 className="mt-6 font-semibold text-zinc-900">Ingredients</h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {ingredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700"
                >
                  {ingredient}
                </span>
              ))}
            </div>

            <button
              disabled={isOutOfStock}
              onClick={() => {
                if (isOutOfStock) return;

                addToCart({
                  name,
                  slug,
                  price: selectedWeight.price,
                  weight: selectedWeight.weight,
                  image,
                  quantity: 1,
                });

                toast.success(`${name} ${selectedWeight.weight} added to cart!`);
              }}
              className={`mt-8 flex items-center justify-center gap-2 rounded-full px-7 py-3 font-semibold transition ${
                isOutOfStock
                  ? "cursor-not-allowed bg-zinc-200 text-zinc-500"
                  : "bg-orange-600 text-white hover:bg-orange-700"
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}