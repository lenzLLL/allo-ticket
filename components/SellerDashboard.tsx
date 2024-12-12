"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Spinner from "./Spinner";
import { createStripeConnectLoginLink } from "@/actions/createStripeConnectLoginLink";
import { AccountStatus, getStripeConnectAccountStatus } from "@/actions/getStripeConnectAccountStatus";
import { CalendarDays, Cog, Plus } from "lucide-react";
import { createStripeConnectAccountLink } from "@/actions/createStripeConnectAccountLink";
import { createStripeConnectCustomer } from "@/actions/createStripeConnectCustomer";
import { useCookies } from "next-client-cookies";

export default function SellerDashboard() {
  const [accountCreatePending, setAccountCreatePending] = useState(false);
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);
  const [error, setError] = useState(false);
  const [accountStatus, setAccountStatus] = useState<AccountStatus | null>(
    null
  );
  const router = useRouter();
  const cookies = useCookies()
  const id = cookies.get("auth")
  const user = useQuery(api.users.getUserById, { userId:id? id:'' });
  const stripeConnectId = useQuery(api.users.getUsersStripeConnectId, {
    userId: user?.userId || "",
  });

  const isReadyToAcceptPayments =
    accountStatus?.isActive && accountStatus?.payoutsEnabled;

  useEffect(() => {
    if (stripeConnectId) {
      fetchAccountStatus();
    }
  }, [stripeConnectId]);

  if (stripeConnectId === undefined) {
    return <Spinner />;
  }

  const handleManageAccount = async () => {
    try {
      if (stripeConnectId && accountStatus?.isActive) {
        const loginUrl = await createStripeConnectLoginLink(stripeConnectId);
        window.location.href = loginUrl;
      }
    } catch (error) {
      console.error("Error accessing Stripe Connect portal:", error);
      setError(true);
    }
  };

  const fetchAccountStatus = async () => {
    if (stripeConnectId) {
      try {
        const status = await getStripeConnectAccountStatus(stripeConnectId);
        setAccountStatus(status);
      } catch (error) {
        console.error("Error fetching account status:", error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-800 px-6 py-8 text-white">
        <h2 className="text-2xl font-bold">Seller Dashboard</h2>
        <p className="text-blue-100 mt-2">
        Gérez votre profil de vendeur et vos paramètres de paiement.
        </p>
      </div>

      {/* Main Content */}
      {isReadyToAcceptPayments && (
        <>
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Vendez des billets pour vos événements.
            </h2>
            <p className="text-gray-600 mb-8">
            Listez vos billets à vendre et gérez vos annonces.
            </p>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex justify-center gap-4">
                <Link
                  href="/seller/new-event"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Créer un évènement
                </Link>
                <Link
                  href="/seller/events"
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <CalendarDays className="w-5 h-5" />
                  Voir mes évènements
                </Link>
              </div>
            </div>
          </div>

          <hr className="my-8" />
        </>
      )}

      <div className="p-6">
        {/* Account Creation Section */}
        {!stripeConnectId && !accountCreatePending && (
          <div className="text-center py-8">
            <h3 className="text-xl font-semibold mb-4">
            Commencez à accepter les paiements.
            </h3>
            <p className="text-gray-600 mb-6">
            Créez votre compte vendeur pour commencer à recevoir des paiements en toute sécurité via Stripe.
            </p>
            <button
              onClick={async () => {
                setAccountCreatePending(true);
                setError(false);
                try {
                  await createStripeConnectCustomer();
                  setAccountCreatePending(false);
                } catch (error) {
                  console.error(
                    "Error creating Stripe Connect customer:",
                    error
                  );
                  setError(true);
                  setAccountCreatePending(false);
                }
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Créer un compte vendeur.
            </button>
          </div>
        )}

        {/* Account Status Section */}
        {stripeConnectId && accountStatus && (
          <div className="space-y-6">
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Account Status Card */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Account Statut du compte
                </h3>
                <div className="mt-2 flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      accountStatus.isActive
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  />
                  <span className="text-lg font-semibold">
                    {accountStatus.isActive ? "Active" : "Pending Setup"}
                  </span>
                </div>
              </div>

              {/* Payments Status Card */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Payment Capability
                </h3>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center">
                    <svg
                      className={`w-5 h-5 ${
                        accountStatus.chargesEnabled
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-2">
                      {accountStatus.chargesEnabled
                        ? "Can accept payments"
                        : "Cannot accept payments yet"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className={`w-5 h-5 ${
                        accountStatus.payoutsEnabled
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-2">
                      {accountStatus.payoutsEnabled
                        ? "Can receive payouts"
                        : "Cannot receive payouts yet"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements Section */}
            {accountStatus.requiresInformation && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-yellow-800 mb-3">
                  Required Information
                </h3>
                {accountStatus.requirements.currently_due.length > 0 && (
                  <div className="mb-3">
                    <p className="text-yellow-800 font-medium mb-2">
                      Action Required:
                    </p>
                    <ul className="list-disc pl-5 text-yellow-700 text-sm">
                      {accountStatus.requirements.currently_due.map((req) => (
                        <li key={req}>{req.replace(/_/g, " ")}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {accountStatus.requirements.eventually_due.length > 0 && (
                  <div>
                    <p className="text-yellow-800 font-medium mb-2">
                      Eventually Needed:
                    </p>
                    <ul className="list-disc pl-5 text-yellow-700 text-sm">
                      {accountStatus.requirements.eventually_due.map(
                        (req) => (
                          <li key={req}>{req.replace(/_/g, " ")}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                {/* Only show Add Information button if there are requirements */}
                {!accountLinkCreatePending && (
                  <button
                    onClick={async () => {
                      setAccountLinkCreatePending(true);
                      setError(false);
                      try {
                        const { url } =
                          await createStripeConnectAccountLink(
                            stripeConnectId
                          );
                        router.push(url);
                      } catch (error) {
                        console.error(
                          "Error creating Stripe Connect account link:",
                          error
                        );
                        setError(true);
                      }
                      setAccountLinkCreatePending(false);
                    }}
                    className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                   Compléter les exigences.
                  </button>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              {accountStatus.isActive && (
                <button
                  onClick={handleManageAccount}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Cog className="w-4 h-4 mr-2" />
                  Tableau De Bord
                </button>
              )}
              <button
                onClick={fetchAccountStatus}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Actualiser le statut.
              </button>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-lg">
                Impossible d'accéder au tableau de bord Stripe. Veuillez d'abord compléter toutes les exigences.
              </div>
            )}
          </div>
        )}

        {/* Loading States */}
        {accountCreatePending && (
          <div className="text-center py-4 text-gray-600">
          Création de votre compte vendeur...
          </div>
        )}
        {accountLinkCreatePending && (
          <div className="text-center py-4 text-gray-600">
            Préparation de la configuration du compte...
          </div>
        )}
      </div>
    </div>
  </div>
  )
}
