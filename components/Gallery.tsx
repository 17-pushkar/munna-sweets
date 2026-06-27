import Image from "next/image";
import SectionTitle from "./SectionTitle";

const galleryImages = [
  "/gulab-jamun.webp",
  "/rasgulla.webp",
  "/kaju-katli.webp",
  "/hero-sweets.webp",
  "/gulab-jamun.webp",
  "/rasgulla.webp",
];

export default function Gallery() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">

        <SectionTitle
          title="Our Sweet Gallery"
          subtitle="Take a look at some of our freshly prepared delicious sweets."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl shadow-lg transition duration-300 hover:scale-105"
            >
              <Image
                src={image}
                alt={`Gallery Image ${index + 1}`}
                width={500}
                height={350}
                className="h-72 w-full object-cover"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}