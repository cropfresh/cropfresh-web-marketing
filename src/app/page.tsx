import { Navbar, Footer } from "@/components/sections";
import { AgricultureHero } from "@/components/sections/AgricultureHero";
import { AgricultureStory, HarvestJourney, FarmTools, FarmTechnology, CropFreshFAQ } from "@/components/sections/AgricultureSections";
import { AudiencePaths } from "@/components/sections/AudiencePaths";
import { ParticipationNextSteps } from "@/components/sections/ParticipationNextSteps";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="agri-home" id="main-content">
        <AgricultureHero />
        <AudiencePaths />
        <AgricultureStory />
        <HarvestJourney />
        <FarmTools />
        <FarmTechnology />
        <CropFreshFAQ />
        <ParticipationNextSteps />
      </main>
      <Footer />
    </>
  );
}
