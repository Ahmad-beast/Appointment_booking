import Navbar from "@/components/Navbar";
import ClosedTodayBanner from "@/components/ClosedTodayBanner";
import HeroSection from "@/components/HeroSection";
import ServicesOverview from "@/components/ServicesOverview";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedDoctors from "@/components/FeaturedDoctors";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ClosedTodayBanner />
      <HeroSection />
      <ServicesOverview />
      <WhyChooseUs />
      <FeaturedDoctors />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
