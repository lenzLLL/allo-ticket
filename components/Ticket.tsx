"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import {
  CalendarDays,
  IdCard,
  MapPin,
  Ticket as TicketIcon,
  User,
} from "lucide-react";
import QRCode from "react-qr-code";
import Spinner from "./Spinner";
import { useStorageUrl } from "@/lib/utils";
import Image from "next/image";

export default function Ticket({ ticketId }: { ticketId: Id<"tickets"> }) {
  const ticket = useQuery(api.tickets.getTicketWithDetails, { ticketId });
  const user = useQuery(api.users.getUserById, {
    userId: ticket?.userId ?? "",
  });
  const imageUrl = useStorageUrl(ticket?.event?.imageStorageId);

  if (!ticket || !ticket.event || !user) {
    return <Spinner />;
  }

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-xl border ${ticket.event.is_cancelled ? "border-red-200" : "border-gray-100"}`}
    >
      {/* Event Header with Image */}
      <div className="relative">
        {imageUrl && (
          <div className="relative w-full aspect-[21/9] ">
            <Image
              src={imageUrl}
              alt={ticket.event.name}
              fill
              className={`object-cover object-center ${ticket.event.is_cancelled ? "opacity-50" : ""}`}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/90" />
          </div>
        )}
        <div
          className={`px-6 py-4 ${imageUrl ? "absolute bottom-0 left-0 right-0" : ticket.event.is_cancelled ? "bg-red-600" : "bg-blue-600"} `}
        >
          <h2
            className={`text-2xl font-bold ${imageUrl || !imageUrl ? "text-white" : "text-black"}`}
          >
            {ticket.event.name}
          </h2>
          {ticket.event.is_cancelled && (
            <p className="text-red-300 mt-1">Cet èvènement a été annulé</p>
          )}
        </div>
      </div>

      {/* Ticket Content */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - Event Details */}
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <CalendarDays
                className={`w-5 h-5 mr-3 ${ticket.event.is_cancelled ? "text-red-600" : "text-blue-600"}`}
              />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">
                  {new Date(ticket.event.eventDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center text-gray-600">
              <MapPin
                className={`w-5 h-5 mr-3 ${ticket.event.is_cancelled ? "text-red-600" : "text-blue-600"}`}
              />
              <div>
                <p className="text-sm text-gray-500">Localisation</p>
                <p className="font-medium">{ticket.event.location}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-600">
              <User
                className={`w-5 h-5 mr-3 ${ticket.event.is_cancelled ? "text-red-600" : "text-blue-600"}`}
              />
              <div>
                <p className="text-sm text-gray-500">Titulaire du billet</p>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-600 break-all">
              <IdCard
                className={`w-5 h-5 mr-3 ${ticket.event.is_cancelled ? "text-red-600" : "text-blue-600"}`}
              />
              <div>
                <p className="text-sm text-gray-500">Identifiant du propriétaire</p>
                <p className="font-medium">{user.userId}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-600">
              <TicketIcon
                className={`w-5 h-5 mr-3 ${ticket.event.is_cancelled ? "text-red-600" : "text-blue-600"}`}
              />
              <div>
                <p className="text-sm text-gray-500">Prix du ticket</p>
                <p className="font-medium">£{ticket.event.price.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Right Column - QR Code */}
          <div className="flex flex-col items-center justify-center border-l border-gray-200 pl-6">
            <div
              className={`bg-gray-100 p-4 rounded-lg ${ticket.event.is_cancelled ? "opacity-50" : ""}`}
            >
              <QRCode value={ticket._id} className="w-32 h-32" />
            </div>
            <p className="mt-2 text-sm text-gray-500 break-all text-center max-w-[200px] md:max-w-full">
              Ticket ID: {ticket._id}
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
             Informations Importantes
          </h3>
          {ticket.event.is_cancelled ? (
            <p className="text-sm text-red-600">
              Cet événement a été annulé. Un remboursement sera traité s'il n'a pas déjà été effectué.
            </p>
          ) : (
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Veuillez arriver au moins 30 minutes avant l'événement.</li>
              <li>• Ayez votre code QR de billet prêt pour le scan.              </li>
              <li>• Ce billet est non transférable.</li>
            </ul>
          )}
        </div>
      </div>

      {/* Ticket Footer */}
      <div
        className={`${ticket.event.is_cancelled ? "bg-red-50" : "bg-gray-50"} px-6 py-4 flex justify-between items-center`}
      >
        <span className="text-sm text-gray-500">
        Date d'achat: {new Date(ticket.purchasedAt).toLocaleString()}
        </span>
        <span
          className={`text-sm font-medium ${ticket.event.is_cancelled ? "text-red-600" : "text-blue-600"}`}
        >
          {ticket.event.is_cancelled ? "Annulé" : "Billet Valide"}
        </span>
      </div>
    </div>
  );
}
