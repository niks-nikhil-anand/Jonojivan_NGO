import FirstRow from '@/components/adminPanel/dashboard/FirstRow'
import SecondRow from '@/components/adminPanel/dashboard/SecondRow'
import React from 'react'

const page = () => {
  return (
    <div className="h-[calc(100vh-6rem)] overflow-y-auto bg-gray-50/50 p-8 space-y-8 no-scrollbar">
      <div className=" mx-auto space-y-8">
        <FirstRow/>
        <SecondRow/>
      </div>
    </div>
  )
}

export default page