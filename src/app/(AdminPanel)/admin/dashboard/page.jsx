import FirstRow from '@/components/adminPanel/dashboard/FirstRow'
import SecondRow from '@/components/adminPanel/dashboard/SecondRow'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 p-8 space-y-8">
      <FirstRow/>
      <SecondRow/>
    </div>
  )
}

export default page