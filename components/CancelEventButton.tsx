"use client";

import { useState } from "react";
import { Ban } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { refundEventTickets } from "@/actions/refundEventTickets";

export default function CancelEventButton({
  eventId,
}: {
  eventId: Id<"events">;
}) {
  const [isCancelling, setIsCancelling] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const cancelEvent = useMutation(api.events.cancelEvent);

  const handleCancel = async () => {
    if (
      !confirm(
        "Êtes-vous sûr de vouloir annuler cet événement ? Tous les billets seront remboursés et l'événement sera annulé définitivement."
      )
    ) {
      return;
    }

    setIsCancelling(true);
    try {
      await refundEventTickets(eventId);
      await cancelEvent({ eventId });
      toast({
        title: "Evènement annulé",
        description: "Tous les billets ont été remboursés avec succès."
      });
      router.push("/seller/events");
    } catch (error) {
      console.error("Failed to cancel event:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Échec de l'annulation de l'événement. Veuillez réessayer.",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={isCancelling}
      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
    >
      <Ban className="w-4 h-4" />
      <span>{isCancelling ? "En cours..." : "Annuler l'évènement"}</span>
    </button>
  );
}
