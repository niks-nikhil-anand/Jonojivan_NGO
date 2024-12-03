import BlogSection from "@/components/frontend/ui/(Banners)/BlogSection";
import FAQsSection from "@/components/frontend/ui/FAQsSection";
import CampaignCards from "@/components/frontend/ui/CampaignCards";
import DonationForm from "@/components/frontend/ui/DonationForm";
import FooterBanner from "@/components/frontend/ui/FooterBanner";
import HeroSection from "@/components/frontend/ui/HeroSection";
import OrganizationInfo from "@/components/frontend/ui/OrganitationInfo";
import WhoWeAre from "@/components/frontend/ui/WhoWeAre";
import CausesSection from "@/components/frontend/ui/(Banners)/BannerText01";

export default function Home() {
  return (
    <>
      <HeroSection />
      <DonationForm/>
      <CausesSection/>
      <WhoWeAre />
      <CampaignCards />
      <OrganizationInfo/>
      <FAQsSection />
      <BlogSection />
      <FooterBanner/>
    </>
  );
}
