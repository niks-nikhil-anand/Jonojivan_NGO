import Banner1 from "@/components/frontend/ui/(Banners)/Banner1";
import Banner2 from "@/components/frontend/ui/(Banners)/Banner2";
import CategoriesSection from "@/components/frontend/ui/CategorySection";
import HeroSection from "@/components/frontend/ui/HeroSection";
import Marquee from "@/components/frontend/ui/Marquee";
import ProductCard from "@/components/frontend/ui/ProductForSale";

export default function Home() {
  return (
    <>
    <HeroSection/>
    <ProductCard/>
    <CategoriesSection/>
    <Marquee/>
    <Banner1/>
    <Banner2/>
    </>
  );
}
