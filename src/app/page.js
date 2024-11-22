import HeroSection from "@/components/frontend/ui/HeroSection";
import WhoWeAre from "@/components/frontend/ui/WhoWeAre";
import ProductCard from "@/components/frontend/ui/ProductForSale";
import CategoriesSection from "@/components/frontend/ui/CategorySection";
import Marquee from "@/components/frontend/ui/Marquee";

// Banner Components
import Banner1 from "@/components/frontend/ui/(Banners)/Banner1";
import BannerText01 from "@/components/frontend/ui/(Banners)/BannerText01";
import DonationForm from "@/components/frontend/ui/DonationForm";
import OrganizationInfo from "@/components/frontend/ui/OrganitationInfo";
import BlogSection from "@/components/frontend/ui/(Banners)/BlogSection";
import FAQsSection from "@/components/frontend/ui/(Banners)/FAQsSection";

export default function Home() {
  return (
    <>
      {/* Hero and Section components */}
      <HeroSection />
      <DonationForm/>
      <BannerText01 />
      <WhoWeAre />
      {/* <ProductCard />
      <CategoriesSection />
      <Marquee /> */}
      
      {/* Banner Components */}
      <Banner1 />
      <OrganizationInfo/>
      <FAQsSection />
      <BlogSection />
    </>
  );
}
