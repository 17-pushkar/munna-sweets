import { Award, HeartHandshake, Truck, ShieldCheck } from "lucide-react";
import SectionTitle from "./SectionTitle";

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "We use the finest ingredients to prepare every sweet.",
  },
  {
    icon: HeartHandshake,
    title: "Trusted Since 1995",
    description: "Serving delicious sweets with love for generations.",
  },
  {
    icon: Truck,
    title: "Fresh Every Day",
    description: "Our sweets are prepared fresh daily for the best taste.",
  },
  {
    icon: ShieldCheck,
    title: "Pure & Hygienic",
    description: "Made in a clean and hygienic kitchen with utmost care.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-orange-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <SectionTitle
          title="Why Choose Munna Sweets?"
          subtitle="Every sweet is prepared with passion, purity, and tradition."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
              >
                <Icon className="mb-4 h-12 w-12 text-orange-600" />

                <h3 className="text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}