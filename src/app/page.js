import BlogSection from "@/components/frontend/ui/(Banners)/BlogSection";
import FAQsSection from "@/components/frontend/ui/FAQsSection";
import CampaignCards from "@/components/frontend/ui/CampaignCards";
import DonationForm from "@/components/frontend/ui/DonationForm";
import FooterBanner from "@/components/frontend/ui/FooterBanner";
import HeroSection from "@/components/frontend/ui/HeroSection";
import OrganizationInfo from "@/components/frontend/ui/OrganitationInfo";
import CausesSection from "@/components/frontend/ui/(Banners)/BannerText01";
import ChildSponsorshipSection from "@/components/frontend/ui/ChildSponsorshipSection";
import Testimonials from "@/components/frontend/ui/Testimonials";
import CTA from "@/components/frontend/ui/CTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <DonationForm/>
      <CausesSection/>
      <ChildSponsorshipSection/>
      <CampaignCards />
      <OrganizationInfo/>
      <FAQsSection />
      <BlogSection />
      <Testimonials/>
      {/* <CTA/> */}
      <FooterBanner/>
    </>
  );
}
