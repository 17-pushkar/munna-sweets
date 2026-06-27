import Image from "next/image";
import { Heart } from "lucide-react";

type ProductCardProps = {
  name: string;
  price: string;
  image: string;
  description: string;
  badge?: string;
};

export default function ProductCard({
  name,
  price,
  image,
  description,
  badge,
}: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
     <div className="relative">
        <button className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow-md transition hover:scale-110 hover:bg-orange-100">
  <Heart className="h-5 w-5 text-orange-600" />
</button>

  {badge && (
    <span className="absolute left-4 top-4 z-10 rounded-full bg-orange-600 px-3 py-1 text-sm font-semibold text-white">
      {badge}
    </span>
  )}

  <Image
    src={image}
    alt={name}
    width={400}
    height={300}
    className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
  />
</div>

      <div className="p-5">
        <h3 className="text-2xl font-bold">{name}</h3>
        <div className="mt-2 flex items-center gap-1 text-yellow-500">
  ★★★★★
  <span className="ml-2 text-sm text-gray-500">(4.9)</span>
</div>

        <p className="mt-2 text-gray-600">
          {description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-orange-600">
            {price}
          </span>

          <button className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700">
            Order
          </button>
        </div>
      </div>
    </div>
  );
}