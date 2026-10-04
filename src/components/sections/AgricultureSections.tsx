import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sprout, Store, Truck, ClipboardCheck, Leaf, Mic, ScanLine, IndianRupee, MapPin, Package } from "lucide-react";
import { Container } from "@/components/ui";

export function AgricultureStory() {
  const benefits = [
    { icon: Sprout, title: "A clearer way to sell", text: "Help farmers describe their harvest and explore a path to business buyers." },
    { icon: Store, title: "A more informed way to source", text: "Bring crop, quantity, quality, and pricing information into the buyer's decision." },
    { icon: Truck, title: "A coordinated way to deliver", text: "Connect pickup needs, vehicle details, and delivery expectations." },
  ];
  return (
    <section id="solutions" aria-labelledby="cropfresh-story-heading" className="agri-section agri-section-sage">
      <Container>
        <div className="agri-story-grid">
          <figure className="agri-story-photo">
            <Image src="/images/farmer-hero-bg.jpg" alt="Illustrative farmer in a tomato field, surrounded by growing crops at sunset" fill sizes="(min-width: 900px) 45vw, 90vw" />
            <figcaption><Leaf size={18} aria-hidden="true" /> Agriculture is the heart of the story.</figcaption>
          </figure>
          <div>
            <p className="agri-eyebrow">What is CropFresh?</p>
            <h2 id="cropfresh-story-heading" className="agri-heading">A connected journey for every harvest.</h2>
            <p className="agri-description">From the person growing a crop to the business buying it, fresh produce depends on people working together. CropFresh is building the tools to make those connections simpler.</p>
            <div className="agri-story-benefits">
              {benefits.map(({ icon: Icon, title, text }) => (
                <div key={title}><span className="agri-icon"><Icon size={22} aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p></div></div>
              ))}
            </div>
            <a href="#how-it-works" className="agri-text-link">Follow the produce journey <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function HarvestJourney() {
  const steps = [
    { icon: Sprout, title: "List the harvest", text: "Start with the crop, quantity, location, and harvest details.", status: "Listing demo" },
    { icon: ClipboardCheck, title: "Review the details", text: "Understand produce information and the proposed quality-review process.", status: "Planned quality review" },
    { icon: Store, title: "Connect with buyers", text: "Explore sample sourcing needs, listings, and price breakdowns.", status: "Buyer demo" },
    { icon: Truck, title: "Coordinate delivery", text: "Confirm pickup, vehicle fit, delivery windows, and payment terms.", status: "Planned coordination" },
  ];
  return (
    <section id="how-it-works" aria-labelledby="harvest-journey-heading" className="agri-section">
      <Container>
        <div className="agri-section-header"><p className="agri-eyebrow">From harvest to handover</p><h2 id="harvest-journey-heading" className="agri-heading">The farm-to-business journey, made clear.</h2><p className="agri-description">Four simple steps explain the product vision. Demos use sample data; real services and commercial terms require confirmation.</p></div>
        <ol className="agri-journey-grid">
          {steps.map(({ icon: Icon, title, text, status }, index) => (
            <li key={title}>
              <div className="agri-journey-top"><span className="agri-journey-icon"><Icon size={30} strokeWidth={1.5} aria-hidden="true" /></span><span className="agri-step-number">0{index + 1}</span></div>
              <h3>{title}</h3><p>{text}</p><span className="agri-status">{status}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function FarmTools() {
  const tools = [
    { icon: Sprout, title: "For your harvest", text: "Explore how crop details, quantities, and sample offers come together in the farmer workflow.", href: "/farmers", action: "Explore the farmer demo" },
    { icon: Store, title: "For your business", text: "Browse sample produce and explore the information that could support a sourcing decision.", href: "/buyers", action: "Explore the buyer demo" },
  ];
  return (
    <section id="products" aria-labelledby="farm-tools-heading" className="agri-section agri-tools-section">
      <Container>
        <div className="agri-tools-grid">
          <div><p className="agri-eyebrow">Simple tools. Familiar journeys.</p><h2 id="farm-tools-heading" className="agri-heading">Built around the harvest.<br />Designed for the people.</h2><p className="agri-description">See the product in action through browser demos. Farmer and buyer experiences use sample information; app releases are still subject to confirmation.</p>
            <div className="agri-tools-links">{tools.map(({ icon: Icon, title, text, href, action }) => <article key={title}><Icon size={25} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p><Link href={href} className="agri-text-link">{action}<ArrowRight size={16} aria-hidden="true" /></Link></div></article>)}</div>
          </div>
          <div className="agri-produce-preview">
            <div className="agri-preview-topline"><span><Leaf size={16} aria-hidden="true" /> Harvest overview</span><span className="agri-status">Sample preview</span></div>
            <Image src="/images/harvest-basket.svg" alt="Illustrated wooden basket of tomatoes, leafy greens, carrots, and cabbage" width={480} height={380} sizes="(min-width: 900px) 440px, 85vw" />
            <h3>A harvest is more than a listing.</h3><p>It starts with useful information.</p>
            <ul><li><Leaf size={18} aria-hidden="true" /><span>Crop &amp; variety</span></li><li><Package size={18} aria-hidden="true" /><span>Quantity &amp; grade</span></li><li><MapPin size={18} aria-hidden="true" /><span>Origin &amp; pickup details</span></li></ul>
            <p className="agri-sample-caption">Illustrative interface — not available inventory</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function FarmTechnology() {
  const features = [
    { icon: Mic, title: "Make listing simpler", text: "Explore how assisted entry could help capture crop and harvest details. Voice availability depends on the configured service.", status: "Assisted-entry demo" },
    { icon: ScanLine, title: "Make quality clearer", text: "The proposed workflow brings produce photos and inspection information into view. Grading capability needs validation.", status: "Planned quality workflow" },
    { icon: IndianRupee, title: "Make pricing understandable", text: "An illustrative calculator explains possible price components. Sample calculations are not live market quotes.", status: "Illustrative pricing demo" },
  ];
  return (
    <section id="technology" aria-labelledby="farm-technology-heading" className="agri-section agri-technology-section">
      <Container>
        <div className="agri-technology-header"><div><p className="agri-eyebrow">Agriculture first. Technology in support.</p><h2 id="farm-technology-heading" className="agri-heading">Useful technology.<br />Rooted in real farm needs.</h2></div><p>AI is part of the approach. The purpose is easier produce information, clearer sourcing decisions, and better coordination between people.</p></div>
        <div className="agri-technology-grid">{features.map(({ icon: Icon, title, text, status }) => <article key={title}><Icon size={30} strokeWidth={1.5} aria-hidden="true" /><h3>{title}</h3><p>{text}</p><span className="agri-status">{status}</span></article>)}</div>
        <Link href="/ai" className="agri-text-link">Explore the AI demo <ArrowRight size={18} aria-hidden="true" /></Link>
      </Container>
    </section>
  );
}

export function CropFreshFAQ() {
  const questions = [
    { question: "What exactly is CropFresh?", answer: "CropFresh is a farm-to-business agritech platform being built to connect farmers, produce-buying businesses, and delivery partners. The product vision brings produce listings, sourcing information, and delivery coordination into one journey." },
    { question: "Who is CropFresh for?", answer: "Farmers who want to describe and sell their harvest; restaurants, retailers, and other food businesses that source produce; and delivery partners interested in moving it between them." },
    { question: "Can I buy or sell real produce in the demos?", answer: "The farmer and buyer browser experiences use sample data. Creating a demo listing or offer does not place a real order, notify a real buyer, or make a payment. Availability and commercial terms need separate confirmation." },
    { question: "Which crops and locations are supported?", answer: "Crop and location availability must be confirmed with the team. The product previews do not establish service coverage, supply availability, delivery windows, or a published fee schedule." },
  ];
  return (
    <section id="faq" aria-labelledby="cropfresh-faq-heading" className="agri-section">
      <Container><div className="agri-faq-grid"><div><p className="agri-eyebrow">A little more clarity</p><h2 id="cropfresh-faq-heading" className="agri-heading">Good questions.<br />Straightforward answers.</h2><p className="agri-description">Understand the people, purpose, and current preview before choosing your next step.</p></div><div className="agri-faq-list">{questions.map(({ question, answer }) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></Container>
    </section>
  );
}
