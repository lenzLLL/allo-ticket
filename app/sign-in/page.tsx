"use client"
import dynamic from 'next/dynamic';

// Dynamically import your component with SSR disabled
const SigninForm= dynamic(() => import('@/components/signinForm'), { ssr: false });

export default function SignIn() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
          <h2 className="text-2xl font-bold">Se Connecter</h2>
          <p className="text-blue-100 mt-2">
            Veillez remplir les informations ci-dessous!
          </p>
        </div>

        <div className="p-6">
          <SigninForm  />
        </div>
      </div>
    </div>
  );
}
