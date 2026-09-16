import { cn } from '@/utils'
import { SignIn, SignUp, useAuth } from '@clerk/nextjs'
import { getAuth } from '@clerk/nextjs/server'
import React from 'react'

export default function page() {
 

  return (
    <div className={cn(
      // flexbox
      "flex items-center justify-center",
      // heigth
      "min-h-screen",
      // background color 
      "bg-black"
    )}>
      <SignUp signInUrl='signin' />
    </div>
  )
}
