// /pages/api/login.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { makeHasuraAdminRequest } from '../../config/fetch-requests';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

type Data = {
  message: string;
  token?: string;
  user?: {
    id: number;
    email: string;
    fullName: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { email, password, fullName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Fetch the user from Hasura
      const response = await makeHasuraAdminRequest(`
        mutation($email: String!, $password: String!, $fullName: String!) {
          insert_asyncnewui_users_one(object: {email: $email, password_hash: $password, full_name: $fullName}) {
            id
            password_hash
            email
            full_name
          }
        }
      `, {
        variables:{
        email,
        password: hashedPassword,
        fullName,
      },});
      const user = response.data.insert_asyncnewui_users_one;

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials!' });
      }

      // Check the password
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);

      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials!' });
      }

      // Create a token
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({
        message: 'Login successful!',
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong!' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed!' });
  }
}
