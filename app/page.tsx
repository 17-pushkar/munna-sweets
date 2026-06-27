import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Map from "@/components/Map";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <Hero />

     
       {/* Featured Products */}
      <section id="sweets" className="py-20">
        <div className="mx-auto max-w-7xl px-6">

          <SectionTitle
  title="Our Special Sweets"
  subtitle="Freshly prepared every day using premium ingredients and traditional recipes."
/>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ProductCard
  name="Gulab Jamun"
  price="₹320 / kg"
  image="/gulab-jamun.webp"
  description="Soft milk dumplings soaked in delicious sugar syrup."
  badge="⭐ Best Seller"
/>

<ProductCard
  name="Rasgulla"
  price="₹300 / kg"
  image="/rasgulla.webp"
  description="Fresh cottage cheese balls prepared every day."
  badge="🔥 Most Popular"
/>

<ProductCard
  name="Kaju Katli"
  price="₹900 / kg"
  image="/kaju-katli.webp"
  description="Premium cashew sweet made with the finest ingredients."
  badge="👑 Premium"
/>

           
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <div id="about">
  <About />
</div>

      <Testimonials />

      <Gallery />

      <div id="contact">
  <Contact />
</div>

<Map />

      <Footer />

      <WhatsAppButton />

    </main>
  );
}