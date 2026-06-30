"use client";

import { Mail, MapPin, Phone, Clock } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function Contact() {
  return (
    <section id="contact" className="bg-orange-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Contact Us"
          subtitle="We'd love to hear from you. Visit our shop or get in touch with us."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-md">
              <MapPin className="h-8 w-8 text-orange-600" />
              <div>
                <h3 className="font-bold text-lg">Address</h3>
                <p className="text-gray-600">
                  Bahadurgarh, Haryana, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-md">
              <Phone className="h-8 w-8 text-orange-600" />
              <div>
                <h3 className="font-bold text-lg">Phone</h3>
                <p className="text-gray-600">
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-md">
              <Mail className="h-8 w-8 text-orange-600" />
              <div>
                <h3 className="font-bold text-lg">Email</h3>
                <p className="text-gray-600">
                  munnasweets@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-md">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <h3 className="font-bold text-lg">Opening Hours</h3>
                <p className="text-gray-600">
                  Monday – Sunday
                  <br />
                  8:00 AM – 10:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl bg-white p-8 shadow-md">
           <form
  className="space-y-5"
  onSubmit={(e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value;

    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value;

    const phone = (
      form.elements.namedItem("phone") as HTMLInputElement
    ).value;

    const message = (
      form.elements.namedItem("message") as HTMLTextAreaElement
    ).value;

    const text = `Hello Munna Sweets!

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`;

    window.open(
      `https://wa.me/92552 47406?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }}
>
              <input
  name="name"
  type="text"
  placeholder="Your Name"
  className="w-full rounded-lg border p-3 focus:border-orange-500 focus:outline-none"
/>

              <input
  name="email"
  type="email"
  placeholder="Email Address"
  className="w-full rounded-lg border p-3 focus:border-orange-500 focus:outline-none"
/>

              <input
  name="phone"
  type="tel"
  placeholder="Phone Number"
  className="w-full rounded-lg border p-3 focus:border-orange-500 focus:outline-none"
/>

              <textarea
  name="message"
  rows={5}
  placeholder="Your Message"
  className="w-full rounded-lg border p-3 focus:border-orange-500 focus:outline-none"
/>

              <button
                type="submit"
                className="w-full rounded-lg bg-orange-600 py-3 font-semibold text-white transition hover:bg-orange-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}