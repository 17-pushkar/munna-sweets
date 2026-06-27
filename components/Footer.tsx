import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-orange-500">
              Munna Sweets
            </h2>

            <p className="mt-4 text-gray-400">
              Serving authentic Indian sweets with love, quality and tradition
              since 1995.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold">Quick Links</h3>

            <div className="mt-4 flex flex-col gap-2 text-gray-400">
              <Link href="/">Home</Link>
              <Link href="#">Products</Link>
              <Link href="#">About</Link>
              <Link href="#">Contact</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold">Contact</h3>

            <div className="mt-4 space-y-3 text-gray-400">

              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>munnasweets@gmail.com</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>Bahadurgarh, Haryana</span>
              </div>

            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-semibold">
              Follow Us
            </h3>

            <div className="mt-5">
  <p className="text-gray-400">
    Facebook & Instagram links coming soon.
  </p>
</div>
          </div>

        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
          © 2026 Munna Sweets. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}