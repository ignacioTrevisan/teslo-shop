import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface Props {
  children: React.ReactNode
}
export const Providers = ({ children }: Props) => {


  return (
    <PayPalScriptProvider options={{ clientId: "test" }}>

      <SessionProvider>{children}</SessionProvider>
    </PayPalScriptProvider>
  )
}