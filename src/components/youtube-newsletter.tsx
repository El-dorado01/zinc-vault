import * as React from "react";
import NewsletterForm from "./newsletter-form";

export default function NewsletterSection() {
  return (
    <section className="w-full py-15 bg-[#DD3929] dark:bg-[#DD3929]/70">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 uppercase">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-center text-white mb-8">
          Stay updated with the latest tips, tricks, and news for your YouTube
          journey!
        </p>
        <NewsletterForm formWidth="full" />
      </div>
    </section>
  );
}
