import Image from "next/image";
import Link from "next/link";
import SectionTitle from "./SectionTitle";

export default function About() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="About Munna Sweets"
          subtitle="Bringing sweetness to every celebration with traditional recipes and premium quality ingredients."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Side */}
          <div>
            <Image
              src="/hero-sweets.webp"
              alt="About Munna Sweets"
              width={600}
              height={450}
              className="rounded-3xl shadow-xl object-cover"
            />
          </div>

          {/* Right Side */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900">
              Tradition, Taste & Trust
            </h3>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              For years, Munna Sweets has been preparing authentic Indian sweets
              using traditional methods and the finest ingredients. Every sweet
              is crafted with care to ensure freshness, purity, and unforgettable
              taste.
            </p>

            <p className="mt-4 text-lg leading-8 text-gray-600">
              Whether it's a festival, wedding, birthday, or family gathering,
              our sweets add happiness to every occasion.
            </p>

            <Link
  href="/products"
  className="mt-8 inline-block rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
>
  Learn More
</Link>
          </div>
        </div>
      </div>
    </section>
  );
}