import BlogSection from "@/components/frontend/ui/(Banners)/BlogSection";
import FAQsSection from "@/components/frontend/ui/FAQsSection";
import CampaignCards from "@/components/frontend/ui/CampaignCards";
import DonationForm from "@/components/frontend/ui/DonationForm";
import FooterBanner from "@/components/frontend/ui/FooterBanner";
import HeroSection from "@/components/frontend/ui/HeroSection";
import OrganizationInfo from "@/components/frontend/ui/OrganitationInfo";
import ChildSponsorshipSection from "@/components/frontend/ui/ChildSponsorshipSection";
import Testimonials from "@/components/frontend/ui/Testimonials";
import CausesSection from "@/components/frontend/ui/(Banners)/CausesSection";
import ProgramsSections from "@/components/frontend/ui/ProgramsSections";
import MissionVisionSection from "@/components/frontend/ui/MissionVisionSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <DonationForm/>
      {/* <ProgramsSections/>   */}
      <CausesSection/>
      <CampaignCards />
      {/* <ChildSponsorshipSection/> */}
      <OrganizationInfo/>
      <BlogSection />
      <MissionVisionSection/>
      <FAQsSection />
      <Testimonials/>
     
    </>
  );
}
