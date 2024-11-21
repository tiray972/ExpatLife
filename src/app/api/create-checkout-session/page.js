import Stripe from 'stripe';

// Initialisez Stripe avec votre clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Créez une session de paiement Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.items.map((item) => ({
          price_data: {
            currency: 'usd', // Remplacez par votre devise (ex: 'eur')
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100, // Prix en centimes
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      // Répondez avec l'ID de la session
      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
