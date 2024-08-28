import CategoriesSection from '@/components/frontend/ui/CategorySection'
import HeroSection from '@/components/frontend/ui/HeroSection'
import ManualSlider from '@/components/frontend/ui/ManualSlider'
import ProductForSaleUser from '@/components/users/ui/ProductForSaleUser'
import React from 'react'

const page = () => {
  return (
    <div>
       <HeroSection/>
       <CategoriesSection/>
       <ProductForSaleUser/>
       <ManualSlider/>
    </div>
  )
}

export default page