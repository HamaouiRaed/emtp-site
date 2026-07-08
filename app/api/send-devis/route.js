import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return Response.json({ error: 'Aucun fichier n’a été envoyé.' }, { status: 400 });
    }

    if (file.size > 50 * 1024 * 1024) {
      return Response.json({ error: 'Le fichier dépasse la limite de 50 Mo.' }, { status: 413 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const safeName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(uploadDir, safeName);
    await writeFile(filePath, buffer);

    return Response.json({
      success: true,
      fileName: safeName,
      url: `/uploads/${safeName}`,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: 'Échec de l’envoi du fichier.' }, { status: 500 });
  }
}
