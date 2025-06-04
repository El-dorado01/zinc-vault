import React from "react";
import NewsletterForm from "@/components/newsletter-form";
import YouTubeHero from "@/components/youtube-hero";
import NewsletterSection from "@/components/youtube-newsletter";
import ServicesSection from "@/components/youtube-services";
import YouTubeTestimonials from "@/components/youtube-testimonials";

const YouTubeAutomationPage = () => {
  // const youTubeColor = "#FF0000"; // YouTube red color
  // #DD3929
  return (
    <>
      <YouTubeHero />
      <ServicesSection />
      {/* <section className="w-full">
        <Image
          src="/youtube-bg/services-bg.png"
          alt="Services Background"
          width={1280}
          height={720}
          className="w-full object-cover h-[400px] opacity-80"
        />
        <div className="relative z-10">
          <NewsletterSection />
        </div>
      </section> */}
      <NewsletterSection />
      <YouTubeTestimonials />
      <section className="flex flex-col items-start justify-start w-full max-w-6xl mx-auto px-4 py-10 space-y-3">
        <div className="w-full flex flex-col md:flex-row space-x-10 space-y-5">
          <div className="flex-2/3 flex flex-col gap-5">
            <h2 className="text-xl font-bold text-shadow-sm uppercase">Background</h2>
            <span className="text-sm text-gray-600">
              Zinc Tube is your ultimate partner for YouTube success, offering
              expert services in automation, promotion, and monetization. We
              streamline your workflow with advanced tools for video editing,
              scheduling, and posting, saving you time while boosting
              efficiency. Our targeted promotion strategies, including SEO and
              ad campaigns, skyrocket your channel&apos;s visibility and
              subscriber count. Plus, we guide you through monetization,
              maximizing earnings from ads, sponsorships, and merchandise. Let
              Zinc Tube elevate your YouTube journey with proven solutions!
            </span>
          </div>
          <div className="flex-1/3 flex flex-col gap-5">
            <h2 className="text-xl font-bold uppercase">Newsletter</h2>
            <p className="text-sm text-gray-600">
              Stay updated with the latest tips, tricks, and news for your
              YouTube journey!
            </p>
            <NewsletterForm formWidth="half" />
          </div>
        </div>
      </section>
      {/* <div className="h-[calc(100vh-72px)] flex flex-col items-center justify-center space-y-1 w-full max-w-6xl mx-auto px-4 text-center">
        <Construction className="size-12 animate-pulse" />
        <h1 className="font-bold text-3xl"> Under Construction </h1>
        <p className="text-muted-foreground">
          We are working hard to bring this page to life. Please check back soon!
        </p>
      </div> */}
    </>
  );
};

export default YouTubeAutomationPage;
