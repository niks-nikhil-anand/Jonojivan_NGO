import FirstRow from '@/components/adminPanel/dashboard/FirstRow'
import ThirdRow from '@/components/adminPanel/dashboard/SecondRow'
import React from 'react'

const page = () => {
  return (
    <div className='px-4 py-6'>
      <FirstRow/>
      <ThirdRow/>
    </div>
  )
}

export default page