"use client";

import { useState } from "react";
import ProductGridCard from "@/components/ProductGridCard";

type Product = {
  name: string;
  slug: string;
  price: string;
  image: string;
  description: string;
  category: string;
  ingredients: string[];
  badge?: string | null;
  weightOptions: {
    weight: string;
    price: number;
  }[];
};

export default function ProductsClient({ products }: { products: Product[] }) {
  const categories = ["All", ...new Set(products.map((product) => product.category))];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price-low") return a.weightOptions[2].price - b.weightOptions[2].price;
      if (sortBy === "price-high") return b.weightOptions[2].price - a.weightOptions[2].price;
      return 0;
    });

  return (
    <main className="min-h-screen bg-orange-50 px-6 py-24">
      <section className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-wide text-orange-500">Our Menu</p>

          <h1 className="mt-3 text-4xl font-bold text-zinc-900">
            All Sweets & Products
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-600">
            Explore our freshly prepared sweets made with traditional recipes and premium ingredients.
          </p>

          <div className="mx-auto mt-8 max-w-md">
            <input
              type="text"
              placeholder="Search sweets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-orange-200 bg-white px-5 py-3 text-zinc-900 placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div className="mt-6 flex justify-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-orange-200 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            >
              <option value="default">Sort: Default</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? "bg-orange-600 text-white"
                    : "bg-white text-zinc-700 hover:bg-orange-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="mt-14 rounded-3xl bg-white p-10 text-center shadow-md">
            <h2 className="text-2xl font-bold text-zinc-900">No products found</h2>
            <p className="mt-3 text-zinc-600">
              Try searching with a different sweet name or category.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductGridCard
                key={product.slug}
                name={product.name}
                slug={product.slug}
                price={product.price}
                image={product.image}
                description={product.description}
                category={product.category}
                ingredients={product.ingredients}
                badge={product.badge ?? undefined}
                weightOptions={product.weightOptions}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}