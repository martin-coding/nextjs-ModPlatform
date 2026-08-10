import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY as string)

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    html,
  })
}
