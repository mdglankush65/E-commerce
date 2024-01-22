import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import dotenv from 'dotenv';
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SK || 'sk_test_51OaaivSChOYHnSweyzy1r6g9bPjxBWgPJEIPQBQVMS3QxA5v2iNQD1Ejqw59l4F8f1PDhR2p2T7P2cHG23Qg9ncU00myJZ56J7');

export default async function handler(req, res) {
  console.log(process.env.STRIPE_SK, process.env.PUBLIC_URL);
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }
  const {
    name, email, city,
    postalCode, streetAddress, country,
    cartProducts,
  } = req.body;
  await mongooseConnect();
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toString() === productId);
    const quantity = productsIds.filter(id => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items, name, email, city, postalCode,
    streetAddress, country, paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: ( 'http://localhost:3000/') + '/cart?success=1',
    cancel_url: ('http://localhost:3000/') + '/cart?canceled=1',
    metadata: { orderId: orderDoc._id.toString(), test: 'ok' },
  });
  res.json({
    url: session.url,
  })
}

// process.env.PUBLIC_URL ||
// process.env.PUBLIC_URL || 