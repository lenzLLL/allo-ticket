"use client";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { WAITING_LIST_STATUS } from "@/convex/constants";
import Spinner from "./Spinner";
import { Clock, OctagonXIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ConvexError } from "convex/values";

export default function JoinQueueTravel({
    travelId,
    userId,
    num
  }: {
    travelId: Id<"travel">;
    userId: string;
    num:string[]
  }) {
    const availability = useQuery(api.travel.getTravelAvailability, { travelId});
    const userTicket = useQuery(api.ticketst.getUserTicketForTravel, {
        travelId,
        userId,
    });
   const { toast } = useToast();
   const joinWaitingList = useMutation(api.travel.joinWaitingList);
   const travel = useQuery(api.travel.getById, { travelId });
   const isTravelOwner = false;
   const queuePosition = useQuery(api.WaitingListT.getQueuePosition, {
    travelId,
    userId,
  });
   const handleJoinQueue = async () => {
    try {
      if(num.length === 0){
        toast({
          variant: "destructive",
          title: "Oh, Une erreur s'est produite!",
          description: "Veillez choisir au moins un siège",
          duration: 5000,
        });
        return
      }
      const result = await joinWaitingList({ travelId, userId,num });
      if (result.success) {
        console.log("Successfully joined waiting list");
      }
    } catch (error) {
      if (
        error instanceof ConvexError &&
        error.message.includes("joined the waiting list too many times")
      ) {
        toast({
          variant: "destructive",
          title: "Slow down there!",
          description: error.data,
          duration: 5000,
        });
      } else {
        console.error("Error joining waiting list:", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Failed to join queue. Please try again later.",
        });
      }
    }
  };
  if (queuePosition === undefined || availability === undefined || !travel) {
    return <Spinner />;
  }
  if (userTicket) {
    return null;
  }
  let depart = travel?.depart? travel.depart:0
  const isPastTravel = depart < Date.now();
  return (  <div className="w-full">
  {(!queuePosition ||
    queuePosition.status === WAITING_LIST_STATUS.EXPIRED ||
    (queuePosition.status === WAITING_LIST_STATUS.OFFERED &&
      queuePosition.offerExpiresAt &&
      queuePosition.offerExpiresAt <= Date.now())) && (
    <>
      {isTravelOwner ? (
        <div className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg">
          <OctagonXIcon className="w-5 h-5" />
          <span>Vous ne pouvez pas acheter de billet pour votre propre événement.</span>
        </div>
      ) : isPastTravel ? (
        <div className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed">
          <Clock className="w-5 h-5" />
          <span>Le voyage est terminé.</span>
        </div>
      ) :availability.purchasedCount >= availability?.totalTickets ? (
        <div className="w-full text-center p-4">
          <p className="text-lg font-semibold text-red-600">
          Désolé, tous les billets ont été vendus.
          </p>
        </div>
      ) : (
        <button
          onClick={handleJoinQueue}
          disabled={isPastTravel || isTravelOwner}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Acheter le ticket
        </button>
      )}
    </>
  )}
</div>
);

}