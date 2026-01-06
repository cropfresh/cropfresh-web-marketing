import { Container, Button, Card } from "@/components/ui";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[#1a2744]" />

        {/* Content */}
        <Container className="relative z-10 text-center py-20">
          {/* Tagline */}
          <p className="text-primary font-display font-medium text-lg mb-4 tracking-wide uppercase">
            The Future of Agriculture
          </p>

          {/* Headline */}
          <h1 className="heading-display heading-xl mb-6 max-w-4xl mx-auto">
            <span className="text-gradient">Rewriting</span> the Code of{" "}
            <br className="hidden md:block" />
            Agriculture
          </h1>

          {/* Subheadline */}
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            CropFresh connects farmers directly with buyers. Quality-verified
            produce, AI-powered pricing, instant payments, and full
            traceability from farm to fork.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="primary" size="lg">
              I&apos;m a Farmer
            </Button>
            <Button variant="secondary" size="lg">
              I&apos;m a Buyer
            </Button>
            <Button variant="ghost" size="lg">
              I&apos;m a Hauler
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: "500+", label: "Farmers" },
              { value: "100+", label: "Buyers" },
              { value: "2,000+", label: "Deliveries" },
              { value: "₹25L+", label: "Farmer Earnings" },
            ].map((stat) => (
              <Card key={stat.label} variant="glass" className="p-4 text-center">
                <p className="text-primary text-2xl md:text-3xl font-display font-bold">
                  {stat.value}
                </p>
                <p className="text-muted text-sm mt-1">{stat.label}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Placeholder for additional sections */}
      <section className="py-20">
        <Container>
          <div className="text-center">
            <h2 className="heading-display heading-lg text-gradient mb-4">
              The Problems We Solve
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Coming soon: Full landing page content with animations.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
