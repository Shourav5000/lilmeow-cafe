const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { amount, guests, package: pkg, name, email } = req.body;

    if (!amount || !email || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      receipt_email: email,
      metadata: {
        customer_name: name,
        guests: String(guests),
        package: pkg,
        business: "Lil' Meow Cafe",
      },
      description: `Lil' Meow Cafe — ${pkg} for ${guests} guest(s)`,
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });

  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({ error: error.message });
  }
};
