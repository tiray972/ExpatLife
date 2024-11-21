'use client';
import { loadStripe } from '@stripe/stripe-js';

// Chargez Stripe avec votre clé publique
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // Créez une session de paiement
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [
          { name: 'Produit 1', price: 5000, quantity: 1 }, // Exemple d'article
        ],
      }),
    });

    const { sessionId } = await response.json();

    // Redirigez l'utilisateur vers Stripe Checkout
    const result = await stripe.redirectToCheckout({ sessionId });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Paiement</h1>
      <button
        onClick={handleCheckout}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Payer maintenant
      </button>
    </div>
  );
}
