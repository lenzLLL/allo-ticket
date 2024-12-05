"use server";

import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { stripe } from "@/lib/stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function createStripeConnectCustomer() {
  const user = {id:"user_2iRXPsQAaVYYfAQ2XLQXemvJrzI"}
  

  if (!user.id) {
    throw new Error("Not authenticated");
  }

  // Check if user already has a connect account
  const existingStripeConnectId = await convex.query(
    api.users.getUsersStripeConnectId,
    {
      userId:user.id,
    }
  );

  if (existingStripeConnectId) {
    return { account: existingStripeConnectId };
  }

  // Create new connect account
  const account = await stripe.accounts.create({
    type: "express",
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  // Update user with stripe connect id
  await convex.mutation(api.users.updateOrCreateUserStripeConnectId, {
    userId:user.id,
    stripeConnectId: account.id,
  });

  return { account: account.id };
}