import {
  Navbar,
  HeroSection,
  ProblemsSolved,
  SolutionsSection,
  HowItWorks,
  ProductsSection,
  AITechnology,
  TestimonialsCarousel,
  ImpactStats,
  Footer,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemsSolved />
        <SolutionsSection />
        <HowItWorks />
        <ProductsSection />
        <AITechnology />
        <TestimonialsCarousel />
        <ImpactStats />
      </main>
      <Footer />
    </>
  );
}
