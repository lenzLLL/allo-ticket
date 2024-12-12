import { redirect } from "next/navigation";
import SellerEventList from "@/components/SellerEventList";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArrowLeft, Plus } from "lucide-react";
import { useCookies } from "next-client-cookies";
export default async function SellerEventsPage() {
  const cookies = useCookies()
  const id = cookies.get("auth")
  const user = useQuery(api.users.getUserById, { userId:id? id:'' });
  if (!user?.userId) redirect("/");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/seller"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mes évènements</h1>
                <p className="mt-1 text-gray-500">
                Gérez vos annonces d'événements et suivez les ventes.
                </p>
              </div>
            </div>
            <Link
              href="/seller/new-event"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Créer un événement
            </Link>
          </div>
        </div>

        {/* Event List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <SellerEventList />
        </div>
      </div>
    </div>
  );
}
