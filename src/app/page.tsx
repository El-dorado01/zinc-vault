import HeroSection from "@/components/hero-section";
import RotatingCards from "@/components/rotating-cards";
import AppLayout from "@/layouts/app-layout";

export default function Home() {
  return (
    <>
      <AppLayout>
        <HeroSection />
        <RotatingCards />
      </AppLayout>
    </>
  );
}
