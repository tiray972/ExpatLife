import Stripe from 'stripe';

// Initialisez Stripe avec votre clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15', // Assurez-vous de définir la version API Stripe
});

export async function POST(req) {
  try {
    const { items } = await req.json(); // Parsez le corps de la requête

    // Créez une session de paiement Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
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
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
    });

    // Répondez avec l'ID de la session
    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Erreur Stripe:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function OPTIONS() {
  // CORS configuration (si nécessaire)
  return new Response(null, {
    status: 204,
    headers: {
      'Allow': 'POST, OPTIONS',
      'Access-Control-Allow-Origin': '*', // Remplacez par votre domaine si besoin
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
export async function GET() {
  return new Response(
    JSON.stringify({ message: "Utilisez POST pour accéder à cette route." }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}
