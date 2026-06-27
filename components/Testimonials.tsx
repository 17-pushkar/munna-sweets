import SectionTitle from "./SectionTitle";

const testimonials = [
  {
    name: "Rahul Sharma",
    review:
      "The sweets were absolutely delicious and fresh. My family loved the Gulab Jamun!",
  },
  {
    name: "Priya Verma",
    review:
      "Excellent quality and very hygienic. Munna Sweets is our first choice for every festival.",
  },
  {
    name: "Amit Gupta",
    review:
      "Great taste, reasonable prices, and friendly staff. Highly recommended!",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-orange-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <SectionTitle
          title="What Our Customers Say"
          subtitle="The love and trust of our customers inspire us every day."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl bg-white p-8 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-4 text-2xl text-yellow-500">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-gray-600 italic">
                "{testimonial.review}"
              </p>

              <h3 className="mt-6 text-xl font-bold">
                {testimonial.name}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}