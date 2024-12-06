import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import QRCode from 'qrcode';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, description, date, location, hours, time } = req.body;

      // Generate a unique barcode
      const qrData = `EVENT-${date.replace(/\//g, '')}-${title.replace(/\s+/g, '-')}`;
      const qrCodeUrl = await QRCode.toDataURL(qrData);

      // Save the event to the database
      const event = await prisma.event.create({
        data: {
          title,
          description,
          date,
          location,
          hours,
          time,
          qr: qrCodeUrl,
        },
      });

      return res.status(200).json({ success: true, event });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Failed to create event.' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }
}
