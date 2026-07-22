'use client'
import { useEffect } from 'react'

export default function TestEnv() {
  useEffect(() => {
    console.log(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
  }, [])

  return <div>Ouvre la console navigateur (F12 → Console)</div>
}
