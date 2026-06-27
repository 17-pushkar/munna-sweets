import Image from "next/image";
import Link from "next/link";

type ProductGridCardProps = {
  name: string;
  slug: string;
  price: string;
  image: string;
  description: string;
  category: string;
  badge?: string;
};

export default function ProductGridCard({
  name,
  slug,
  price,
  image,
  description,
  category,
  badge,
}: ProductGridCardProps) {
  return (
    <Link
      href={`/products/${slug}`}
      className="group overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-64">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
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

        <p className="mt-4 text-xl font-bold text-orange-600">{price}</p>
      </div>
    </Link>
  );
}