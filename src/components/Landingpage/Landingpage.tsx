import Hero from "./Hero";
import Features from "./Features";
import Showcase from "./Showcase";
import CTA from "./CTA";

const LandingPage = () => {
  return (
    <main className="flex flex-col">
      {/* Hero: full screen with intro */}
      <section className="w-full">
        <Hero />
      </section>

      {/* Features: 3-4 cards with benefits */}
      <section className="w-full py-24 px-6 sm:px-10 bg-white">
        <Features />
      </section>

      {/* Showcase: visual product display or highlight */}
      <section className="w-full py-24 px-6 sm:px-10 bg-gray-50">
        <Showcase />
      </section>

      {/* CTA: newsletter or signup */}
      <section className="w-full py-24 px-6 sm:px-10 bg-gray-100">
        <CTA />
      </section>
    </main>
  );
};

export default LandingPage;
