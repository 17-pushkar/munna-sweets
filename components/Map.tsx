export default function Map() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-3xl shadow-2xl">
          <iframe
            src="https://www.google.com/maps?q=Bahadurgarh,Haryana,India&output=embed"
            width="100%"
            height="450"
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </div>
    </section>
  );
}