"use server";

import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function getStripeConnectAccount() {
  const user = {id:"user_2iRXPsQAaVYYfAQ2XLQXemvJrzI"}
  

  if (!user.id) {
    throw new Error("Not authenticated");
  }

  const stripeConnectId = await convex.query(
    api.users.getUsersStripeConnectId,
    {
      userId:user.id,
    }
  );

  return {
    stripeConnectId: stripeConnectId || null,
  };
}
