// Component Imports
import { Suspense } from "react"
import OtpUser from "@/app/components/OtpUser"

const VerifyEmailWithOtp = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <OtpUser />
    </Suspense>
  )
}

export default VerifyEmailWithOtp
