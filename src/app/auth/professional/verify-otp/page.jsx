// Component Imports
import { Suspense } from "react"
import OtpPro from "@/app/components/OtpPro"

const VerifyEmailWithOtp = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <OtpPro />
    </Suspense>
  )
}

export default VerifyEmailWithOtp
