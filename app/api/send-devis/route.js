import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

const CONTACT_RECIPIENT = 'contact@emtp-btp.com';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return Response.json({ error: 'Aucun fichier n’a été envoyé.' }, { status: 400 });
    }

    if (file.size > 18 * 1024 * 1024) {
      return Response.json({ error: 'Le fichier dépasse la limite de 18 Mo.' }, { status: 413 });
    }

    const fullName = formData.get('fullName');
    const company = formData.get('company');
    const role = formData.get('role');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const mission = formData.get('mission');
    const details = formData.get('details');

    if (!fullName || !company || !role || !email || !phone || !mission || !details) {
      return Response.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const safeName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(uploadDir, safeName);
    await writeFile(filePath, buffer);

    const fileUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/uploads/${safeName}`;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Site EMTP" <${process.env.SMTP_USER}>`,
      to: CONTACT_RECIPIENT,
      replyTo: String(email),
      subject: `[Demande de devis] ${fullName}`,
      text: `Nom: ${fullName}\nEntreprise: ${company}\nRôle: ${role}\nEmail: ${email}\nTéléphone: ${phone}\nMission: ${mission}\n\n${details}\n\nPièce jointe: ${file.name} (${fileUrl})`,
      html: `
        <p><strong>Nom:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Entreprise:</strong> ${escapeHtml(company)}</p>
        <p><strong>Rôle:</strong> ${escapeHtml(role)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Téléphone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Mission:</strong> ${escapeHtml(mission)}</p>
        <p><strong>Détails:</strong></p>
        <p>${escapeHtml(details).replace(/\n/g, '<br>')}</p>
        <p><strong>Pièce jointe:</strong> <a href="${fileUrl}">${escapeHtml(file.name)}</a></p>
      `,
      attachments: [
        {
          filename: file.name,
          content: buffer,
        },
      ],
    });

    return Response.json({
      success: true,
      fileName: safeName,
      url: `/uploads/${safeName}`,
    });
  } catch (error) {
    console.error('Devis error:', error);
    return Response.json({ error: 'Échec de l’envoi de la demande.' }, { status: 500 });
  }
}
