import { createClient } from 'next-sanity';
import { NextResponse } from 'next/server';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN, // The secret token we made earlier
  useCdn: false,
  apiVersion: '2024-01-01',
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Create the document in Sanity
    const result = await client.create({
      _type: 'order', // We need to make this schema next!
      orderDate: new Date().toISOString(),
      status: 'new',
      customerName: "Guest User", // You'd get this from auth later
      dimensions: data.dimensions,
      pattern: { _type: 'reference', _ref: data.patternId },
      batting: data.batting,
      services: data.services,
      totalPrice: data.total
    });

    return NextResponse.json({ message: 'Order created', id: result._id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Error creating order' }, { status: 500 });
  }
}