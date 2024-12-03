import BlogSection from "@/components/frontend/ui/(Banners)/BlogSection";
import FAQsSection from "@/components/frontend/ui/FAQsSection";
import CampaignCards from "@/components/frontend/ui/CampaignCards";
import DonationForm from "@/components/frontend/ui/DonationForm";
import FooterBanner from "@/components/frontend/ui/FooterBanner";
import HeroSection from "@/components/frontend/ui/HeroSection";
import OrganizationInfo from "@/components/frontend/ui/OrganitationInfo";
import WhoWeAre from "@/components/frontend/ui/WhoWeAre";

export default function Home() {
  return (
    <>
      <HeroSection />
      <DonationForm/>
      {/* <BannerText01 /> */}
      <WhoWeAre />
      <CampaignCards />
      <OrganizationInfo/>
      <FAQsSection />
      <BlogSection />
      <FooterBanner/>
    </>
  );
}
