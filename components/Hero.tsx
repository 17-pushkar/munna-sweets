import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 py-24">
      <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl"></div>
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-yellow-200/40 blur-3xl"></div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow">
            <Star className="h-4 w-4 fill-orange-500" />
            Trusted Sweet Shop Since 1995
          </div>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-950 lg:text-7xl">
            Fresh Indian
            <span className="block text-orange-600">Sweets Daily</span>
          </h1>

          <p className="mt-6 max-w-xl text-xl leading-8 text-gray-600">
            Celebrate every occasion with handcrafted sweets made from premium
            ingredients, pure taste, and traditional recipes.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="flex items-center gap-2 rounded-xl bg-orange-600 px-7 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-700"
            >
              Explore Menu
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/#contact"
              className="rounded-xl border border-orange-600 bg-white px-7 py-4 font-semibold text-orange-600 transition hover:bg-orange-50"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-4 shadow">
              <BadgeCheck className="mb-2 h-6 w-6 text-orange-600" />
              <p className="font-bold">Pure Quality</p>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow">
              <Clock className="mb-2 h-6 w-6 text-orange-600" />
              <p className="font-bold">Fresh Daily</p>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow">
              <Star className="mb-2 h-6 w-6 text-orange-600" />
              <p className="font-bold">4.9 Rating</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-orange-300/20 blur-2xl"></div>

          <Image
            src="/hero-sweets.webp"
            alt="Fresh Indian sweets"
            width={650}
            height={650}
            priority
            className="relative w-full rounded-[2rem] border-8 border-white object-cover shadow-2xl transition duration-500 hover:scale-105 hover:rotate-1"
          />
        </div>
      </div>
    </section>
  );
}