import nodemailer from 'nodemailer'

/* Gmail SMTP from her own address with an app password (spec §3): free,
   needs no domain, and the confirmation arrives from her rather than from
   a no-reply address. */
export function gmailMailer({ user, pass, fromName }) {
  const transport = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } })
  return {
    send: ({ to, subject, text, replyTo }) =>
      transport.sendMail({ from: fromName ? `"${fromName}" <${user}>` : user, to, subject, text, replyTo }),
  }
}
