"use client";
// import { createStripeCheckoutSession } from "@/app/actions/createStripeCheckoutSession";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Ticket } from "lucide-react";
import ReleaseTicket from "./ReleaseTicket";
import { useCookies } from "next-client-cookies";
import { createStripeCheckoutSession } from "@/actions/createStripeCheckoutSession";
import ReleaseTicketTravel from "./ReleaseTicketTravel";
function PurchaseTicketTravel({ travelId }: { travelId: Id<"travel"> }){
    const router = useRouter();
    
  const cookies = useCookies()
  const id = cookies.get("auth")
  const user = useQuery(api.users.getUserById, { userId:id? id:'' });
    const queuePosition = useQuery(api.WaitingListT.getQueuePosition, {
      travelId,
      userId: user?.userId ?? "",
    });

    const [timeRemaining, setTimeRemaining] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const offerExpiresAt = queuePosition?.offerExpiresAt ?? 0;
  const isExpired = Date.now() > offerExpiresAt;

  useEffect(() => {
    const calculateTimeRemaining = () => {
      if (isExpired) {
        setTimeRemaining("Expired");
        return;
      }

      const diff = offerExpiresAt - Date.now();
      const minutes = Math.floor(diff / 1000 / 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (minutes > 0) {
        setTimeRemaining(
          `${minutes} minute${minutes === 1 ? "" : "s"} ${seconds} seconde${
            seconds === 1 ? "" : "s"
          }`
        );
      } else {
        setTimeRemaining(`${seconds} seconde${seconds === 1 ? "" : "s"}`);
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [offerExpiresAt, isExpired]);
  const handlePurchase = async () => {
    if (!user) return;

    try {
      // setIsLoading(true);
      // const { sessionUrl } = await createStripeCheckoutSession({
      //   eventId,
      // });

      // if (sessionUrl) {
      //   router.push(sessionUrl);
      // }
      alert("cool")
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  };
  if (!user || !queuePosition || queuePosition.status !== "offered") {
    return null;
  }

  return(
    <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-200">
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <Ticket className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Ticket Reservé
              </h3>
              <p className="text-sm text-gray-500">
                Expire dans {timeRemaining}
              </p>
            </div>
          </div>

          <div className="text-sm text-gray-600 leading-relaxed">
          Un billet a été réservé pour vous. Complétez votre achat avant l'expiration du minuteur pour garantir votre place à cet événement.
          </div>
        </div>
      </div>

      <button
        onClick={handlePurchase}
        disabled={isExpired || isLoading}
        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg font-bold shadow-md hover:from-amber-600 hover:to-amber-700 transform hover:scale-[1.02] transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg"
      >
        {isLoading
          ? "Redirecting to checkout..."
          : "Achetez votre billet maintenant.→"}
      </button>

      <div className="mt-4">
        <ReleaseTicketTravel travelId={travelId} waitingListId={queuePosition._id} />
      </div>
    </div>
  </div>
  ) 
}

export default PurchaseTicketTravel