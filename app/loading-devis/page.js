'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'



export default function LoadingDevis() {

  const router = useRouter()



  useEffect(() => {


    const timer = setTimeout(() => {

      router.push('/demande-devis')

    }, 1000)

    return () => clearTimeout(timer)

  }, [router])



  return (

    <div className="h-screen bg-[#0B2545] flex items-center justify-center">

      <div className="animate-spin h-16 w-16 border-4 border-white"></div>

    </div>

  )

}