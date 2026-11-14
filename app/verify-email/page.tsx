import { InfoIcon, CircleX, CircleArrowRight } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Check your email</CardTitle>
              <CardDescription>
                We sent a verification link to the email address you provided.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert>
                <CircleArrowRight />
                <AlertTitle>Next step</AlertTitle>
                <AlertDescription>
                  <p>Open your inbox and click the verification link.</p>
                  <p>
                    Once you do, your email will be verified and you&apos;ll be
                    signed in automatically.
                  </p>
                </AlertDescription>
              </Alert>
              <Alert>
                <CircleX />
                <AlertTitle>Didn&apos;t get the email?</AlertTitle>
                <AlertDescription>
                  Check your spam or junk folder and if you spelled it
                  correctly.
                </AlertDescription>
              </Alert>
              <Alert>
                <InfoIcon />
                <AlertTitle>Need another link?</AlertTitle>
                <AlertDescription>
                  Every time you try to sign in with an unverified email
                  address, we&apos;ll send you a new verification link.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
