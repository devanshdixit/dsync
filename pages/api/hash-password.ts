// /pages/api/hash-password.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

type Data = {
  hashedPassword?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required!' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      res.status(200).json({ hashedPassword });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong!' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed!' });
  }
}
