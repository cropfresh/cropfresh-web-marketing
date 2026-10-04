"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sprout, Store, Truck, Play } from "lucide-react";
import { Container } from "@/components/ui";
import { homepageMessage } from "@/data/marketing";
import { trackCTAClick } from "@/lib/analytics";

export function AgricultureHero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="agri-hero">
      <Container>
        <div className="agri-hero-grid">
          <div className="agri-hero-copy">
            <p className="agri-eyebrow"><Sprout size={18} aria-hidden="true" />{homepageMessage.eyebrow}</p>
            <h1 id="hero-heading" className="agri-hero-heading">
              <span>{homepageMessage.headline}</span>{" "}
              {homepageMessage.headlineContinuation}
            </h1>
            <p className="agri-hero-definition">{homepageMessage.definition}</p>
            <p className="agri-hero-description">{homepageMessage.supportingCopy}</p>
            <div className="agri-hero-actions">
              <Link href="/#choose-role" className="agri-button agri-button-harvest" onClick={() => trackCTAClick("hero_choose_role", "hero_section", "/#choose-role")}>
                Find your path <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a href="#how-it-works" className="agri-button agri-button-outline" onClick={() => trackCTAClick("hero_workflow", "hero_section", "#how-it-works")}>
                <Play size={15} aria-hidden="true" /> See how it works
              </a>
            </div>
            <ul className="agri-hero-roles" aria-label="Who CropFresh is for">
              <li><Sprout size={17} aria-hidden="true" /> Farmers</li>
              <li><Store size={17} aria-hidden="true" /> Food businesses</li>
              <li><Truck size={17} aria-hidden="true" /> Delivery partners</li>
            </ul>
          </div>
          <figure className="agri-hero-visual">
            <div className="agri-farm-photo">
              <Image src="/images/hero/farmer.png" alt="Illustration of a farmer standing among green crops in warm evening light" fill priority sizes="(min-width: 1280px) 520px, (min-width: 900px) 45vw, 90vw" />
              <div className="agri-photo-caption"><Sprout size={22} aria-hidden="true" /><span>Rooted in agriculture.<br /><strong>Built around people.</strong></span></div>
            </div>
            <div className="agri-harvest-art" aria-hidden="true">
              <Image src="/images/harvest-basket.svg" alt="" width={250} height={198} />
              <span>Every harvest has a journey.</span>
            </div>
            <figcaption>Illustrative farm and produce artwork</figcaption>
          </figure>
        </div>
        <div className="agri-value-chain" aria-label="CropFresh connects the produce journey">
          <p>One connected<br /><strong>produce journey.</strong></p>
          <div><Sprout aria-hidden="true" /><span><strong>Grow &amp; list</strong>Farmers and their harvest</span></div>
          <ArrowRight className="agri-chain-arrow" aria-hidden="true" />
          <div><Store aria-hidden="true" /><span><strong>Discover &amp; source</strong>Businesses and their needs</span></div>
          <ArrowRight className="agri-chain-arrow" aria-hidden="true" />
          <div><Truck aria-hidden="true" /><span><strong>Pick up &amp; deliver</strong>Partners and their routes</span></div>
        </div>
        <p className="agri-preview-note"><span>Platform preview</span> {homepageMessage.availability.replace("Product preview — ", "")}</p>
      </Container>
    </section>
  );
}
