import Navbar from '@/components/comp-582'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <Navbar />
    <div>{children}</div>
    </>
  )
}

export default layout