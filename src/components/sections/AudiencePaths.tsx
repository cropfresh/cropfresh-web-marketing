import Link from "next/link";
import { ArrowRight, Sprout, ShoppingCart, Truck } from "lucide-react";
import { Container } from "@/components/ui";
import { audiencePaths } from "@/data/marketing";

const icons = { farmer: Sprout, buyer: ShoppingCart, hauler: Truck };

export function AudiencePaths() {
  return (
    <section
      id="choose-role"
      aria-labelledby="choose-role-heading"
      className="agri-section agri-audience-section"
    >
      <Container>
        <div className="agri-section-header">
          <p className="agri-eyebrow">Your place in the produce journey</p>
          <h2 id="choose-role-heading" className="agri-heading">
            You grow it. You source it. You move it.
          </h2>
          <p className="agri-description">
            Different roles. One shared harvest. Choose the path that fits you.
          </p>
        </div>
        <div className="agri-audience-grid">
          {audiencePaths.map((path) => {
            const Icon = icons[path.id];
            return (
              <article key={path.id} className={`agri-audience-card agri-audience-${path.id}`}>
                <div className="agri-audience-top"><span className="agri-audience-icon"><Icon size={29} strokeWidth={1.5} aria-hidden="true" /></span><span className="agri-status">{path.status}</span></div>
                <p className="agri-card-eyebrow">{path.title}</p>
                <h3>{path.intent}</h3>
                <p className="agri-audience-benefit">{path.benefit}</p>
                <p className="agri-audience-description">{path.description}</p>
                <Link
                  href={path.href}
                  className="agri-text-link"
                >
                  {path.action}
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
        <p className="agri-section-note">Farmer and buyer demos use sample data. No real listings, orders, or payments are created.</p>
      </Container>
    </section>
  );
}
