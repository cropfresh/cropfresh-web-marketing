// Phase 1 English master copy. Commercial claims require owner evidence.
export const homepageMessage = {
  title: "CropFresh | Farm-to-Business Agritech",
  eyebrow: "Farm-to-business agritech",
  headline: "Fresh produce.",
  headlineContinuation: "From farms to businesses.",
  definition: "CropFresh is a farm-to-business agritech platform.",
  description:
    "CropFresh is a farm-to-business agritech platform being built to help farmers sell produce, businesses source it, and delivery partners move it.",
  supportingCopy:
    "We're building a simpler way for farmers to sell their harvest, businesses to source produce, and delivery partners to bring them together.",
  availability:
    "Product preview — demonstrations use sample information. Service availability, fees, and payment terms need separate confirmation.",
};

// These links describe today's routes. Public farmer/buyer landing pages and
// separate /demo routes are planned in the Phase 2 migration contract.
export const audiencePaths = [
  {
    id: "farmer",
    title: "For farmers",
    intent: "I grow produce",
    benefit: "Give your harvest a clearer path to buyers.",
    description:
      "See how to describe your crop, quantity, and harvest. Explore a sample listing journey built around the farmer.",
    status: "Interactive demo",
    action: "Explore the farmer demo",
    href: "/farmers",
  },
  {
    id: "buyer",
    title: "For buyers",
    intent: "I source produce",
    benefit: "Find the information your business needs.",
    description:
      "Explore sample produce listings, quality details, and price information for restaurants, retailers, and other food businesses.",
    status: "Interactive demo",
    action: "Explore the buyer demo",
    href: "/buyers",
  },
  {
    id: "hauler",
    title: "For delivery partners",
    intent: "I deliver produce",
    benefit: "Be part of the journey from farm to business.",
    description:
      "Learn about the proposed pickup and delivery workflow, then discuss your area, vehicle, and interest in joining.",
    status: "Program overview",
    action: "Explore delivery opportunities",
    href: "/haulers",
  },
] as const;
