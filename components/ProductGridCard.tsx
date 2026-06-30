"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductQuickViewModal from "./ProductQuickViewModal";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

type WeightOption = {
  weight: string;
  price: number;
};

type ProductGridCardProps = {
  name: string;
  slug: string;
  price: string;
  image: string;
  description: string;
  category: string;
  ingredients: string[];
  badge?: string;
  stock: number;
  weightOptions: WeightOption[];
};

export default function ProductGridCard({
  name,
  slug,
  price,
  image,
  description,
  category,
  ingredients,
  badge,
  stock,
  weightOptions,
}: ProductGridCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(weightOptions[0]);
  const { addToCart } = useCart();

  const isOutOfStock = stock <= 0;

  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-md transition hover:shadow-xl">
      <div className="relative h-64">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-red-600">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {badge && (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
              {badge}
            </span>
          )}

          <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-600">
            {category}
          </span>
        </div>

        <h2 className="mt-4 text-2xl font-bold text-zinc-900">{name}</h2>

        <p className="mt-2 text-zinc-600">{description}</p>

        <p className="mt-4 text-xl font-bold text-orange-600">
          ₹{selectedWeight.price}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
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

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/products/${slug}`}
            className="rounded-full bg-orange-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-700"
          >
            View Details
          </Link>

          <button
            type="button"
            onClick={() => setIsQuickViewOpen(true)}
            className="rounded-full border border-orange-300 px-5 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-100"
          >
            Quick View
          </button>

          <button
            type="button"
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
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
              isOutOfStock
                ? "cursor-not-allowed border-zinc-300 bg-zinc-100 text-zinc-400"
                : "border-green-300 text-green-700 hover:bg-green-50"
            }`}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>

      {isQuickViewOpen && (
        <ProductQuickViewModal
          name={name}
          slug={slug}
          price={price}
          image={image}
          description={description}
          category={category}
          ingredients={ingredients}
          stock={stock}
          weightOptions={weightOptions}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </div>
  );
}