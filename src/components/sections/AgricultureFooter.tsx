import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";

const navigation = [
  { title: "Your journey", links: [{ label: "Farmer demo", href: "/farmers" }, { label: "Buyer demo", href: "/buyers" }, { label: "Delivery partners", href: "/haulers" }, { label: "Choose your role", href: "/#choose-role" }] },
  { title: "Explore CropFresh", links: [{ label: "How it works", href: "/#how-it-works" }, { label: "Product previews", href: "/#products" }, { label: "AI demo", href: "/ai" }, { label: "Questions & answers", href: "/#faq" }] },
  { title: "Get to know us", links: [{ label: "About CropFresh", href: "/about" }, { label: "Stories & resources", href: "/blog" }, { label: "Contact the team", href: "/contact" }, { label: "Before participating", href: "/#participation" }] },
];

export function AgricultureFooter() {
  return (
    <footer className="agri-footer">
      <Container>
        <div className="agri-footer-grid">
          <div className="agri-footer-brand">
            <Link href="/" aria-label="CropFresh home"><Image src="/logo/logo_horizontal_web.png" alt="CropFresh" width={160} height={26} /></Link>
            <h2>Rooted in agriculture.<br />Connected by purpose.</h2>
            <p>A farm-to-business agritech platform being built around farmers, food businesses, and the delivery partners who bring them together.</p>
          </div>
          {navigation.map((group) => <nav key={group.title} aria-label={group.title}><h3>{group.title}</h3><ul>{group.links.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul></nav>)}
        </div>
        <div className="agri-footer-bottom">
          <p>© {new Date().getFullYear()} CropFresh. All rights reserved.</p>
          <p>Platform previews use sample information. Service availability, fees, and payment terms require separate confirmation.</p>
        </div>
      </Container>
    </footer>
  );
}
