import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_KEY ?? "", {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});

export const createCheckoutSession = async ({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1QOHVfEtKfjdG8hSYhp3EPry",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=false`,
    customer_email: userEmail,
    metadata: {
      userId,
    },
  });
  return session;
};
