import Link from "next/link";
import { MapPin, Wallet, ClipboardCheck, Truck, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui";

const topics = [
  {
    icon: MapPin,
    title: "Crop and location",
    description: "Check whether your crop, quantity, area, and delivery lane can be supported. A demo does not establish service coverage.",
  },
  {
    icon: Wallet,
    title: "Fees and payment",
    description: "Review included charges, applicable deductions, settlement conditions, and payment timing before making a commitment.",
  },
  {
    icon: ClipboardCheck,
    title: "Quality and inspection",
    description: "Agree on grading criteria, inspection requirements, and how quality concerns would be handled. Sample grades are illustrative.",
  },
  {
    icon: Truck,
    title: "Delivery and participation",
    description: "Confirm vehicle fit, pickup requirements, and delivery windows. Registering interest does not guarantee loads or earnings.",
  },
];

export function ParticipationNextSteps() {
  return (
    <section id="participation" aria-labelledby="participation-heading" className="agri-section agri-participation-section">
      <Container>
        <div className="agri-section-header">
          <p className="agri-eyebrow">Your next chapter starts here</p>
          <h2 id="participation-heading" className="agri-heading">
            Find your place in a connected harvest.
          </h2>
          <p className="agri-description">
            Explore the experience for your role. Before participating, confirm
            the details that matter to your farm, business, or delivery route.
          </p>
        </div>
        <div className="agri-participation-grid">
          {topics.map((topic) => (
            <article key={topic.title}>
              <topic.icon size={26} aria-hidden="true" />
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/#choose-role" className="agri-button agri-button-harvest">
            Find your path with CropFresh
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
