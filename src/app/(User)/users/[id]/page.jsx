import Banner1 from '@/components/frontend/ui/(Banners)/Banner1'
import Banner2 from '@/components/frontend/ui/(Banners)/Banner2'
import BannerText01 from '@/components/frontend/ui/(Banners)/BannerText01'
import BannerText02 from '@/components/frontend/ui/(Banners)/BannerText02'
import CategoriesSection from '@/components/frontend/ui/CategorySection'
import HeroSection from '@/components/frontend/ui/HeroSection'
import Marquee from '@/components/frontend/ui/Marquee'
import ProductCard from '@/components/frontend/ui/ProductForSale'
import WhoWeAre from '@/components/frontend/ui/WhoWeAre'
import React from 'react'

const page = () => {
  return (
    <div>
     <HeroSection/>
    <WhoWeAre/>
    <ProductCard/>
    <CategoriesSection/>
    <Marquee/>
    <Banner1/>
    <BannerText01/>
    <BannerText02/>
    <Banner2/>
    </div>
  )
}

export default page