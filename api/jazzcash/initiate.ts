import type { NextApiRequest, NextApiResponse } from "next";

// This is a sample. Replace with your JazzCash Merchant Info and Logic
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { amount, name, email, phone } = req.body;

 
  const paymentUrl = `https://sandbox.jazzcash.com.pk/payment?amount=${amount}&name=${name}&email=${email}&phone=${phone}`;

  return res.status(200).json({ paymentUrl });
}
