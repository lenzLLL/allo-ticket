import { getConvexClient } from "@/lib/convex";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import Ticket from "@/components/Ticket";

async function TicketSuccess() {
  const user = {id:"user_2iRXPsQAaVYYfAQ2XLQXemvJrzI"}
  if (!user.id) redirect("/");

  const convex = getConvexClient();
  const tickets = await convex.query(api.events.getUserTickets, { userId:user.id });
  const latestTicket = tickets[tickets.length - 1];

  if (!latestTicket) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
          Achat de billets réussi !
          </h1>
          <p className="mt-2 text-gray-600">
          Votre billet a été confirmé et est prêt à être utilisé.
          </p>
        </div>

        <Ticket ticketId={latestTicket._id} />
      </div>
    </div>
  );
}

export default TicketSuccess;
