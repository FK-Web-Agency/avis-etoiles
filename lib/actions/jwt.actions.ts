"use server";

import jwt from 'jsonwebtoken';

export async function encodedValue(value: any) {
  const secret = 'your-secret-key'; // Remplacez par votre clé secrète
  const token = jwt.sign(value, secret);
  return token;
}
