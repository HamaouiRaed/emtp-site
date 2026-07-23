import nodemailer from 'nodemailer'

const CONTACT_RECIPIENT = 'contact@emtp-btp.com'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json()

    if (!name || !email || !phone || !subject || !message) {
      return Response.json({ error: 'Tous les champs sont requis.' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Site EMTP" <${process.env.SMTP_USER}>`,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `[Site EMTP] ${subject}`,
      text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\n\n${message}`,
      html: `
        <p><strong>Nom:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Téléphone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Sujet:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return Response.json({ error: "Échec de l'envoi du message." }, { status: 500 })
  }
}
