'use client'
import React from 'react'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import BetterAuthActionButton from '@/components/auth/BetterAuthActionButton'

const page = () => {
  const {data: session, isPending: loading} = authClient.useSession()
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
  <div className='flex flex-col items-center justify-center'>
    {
      session == null ? (
        <>
          <h1 className='text-4xl font-bold'>Landing page</h1>
          <Button size='lg'>
            <Link href='/signin'>Sign in</Link>
          </Button>
        </>
      ) : (
        <>
          <h1 className='text-4xl font-bold'>Landing page</h1>
          <p className='text-lg'>{session?.user?.email}</p>
          <p className='text-lg'>{session?.user?.name}</p>
          <p className='text-lg'>{session?.user?.id}</p>

          <BetterAuthActionButton size='lg' variant='destructive' action={() => authClient.signOut()}>
            Log Out
          </BetterAuthActionButton>
        </>
      )
    }
  </div>
    </div>
  )
}

export default page