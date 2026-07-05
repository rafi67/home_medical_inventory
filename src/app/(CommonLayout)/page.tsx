import HeroSection from "@/components/modules/HeroSection/HeroSection";
import FeaturesSection from "@/components/modules/FeaturesSection/FeaturesSection";

const LandingPage = () => {
  return (
    <>
      <HeroSection />

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything you need to manage your medicine cabinet
            </h2>
            <p className="text-muted-foreground">
              Simple tools designed to keep your family safe and your health
              essentials organized.
            </p>
          </div>
          <FeaturesSection />
        </div>
      </section>
    </>
  );
};

export default LandingPage;