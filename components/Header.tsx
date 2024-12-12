"use client"
// import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/images/logo.png";
import SearchBar from "./SearchBar";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
function Header() {
  const cookies = useCookies()
  const router = useRouter()
  const id = cookies.get("auth")
  const logout = ()=>{
    cookies.remove("auth")
    router.refresh()
  }
  const user = useQuery(api.users.getUserById, { userId:id? id:'' });
  return (
    <div className="border-b">
      <div className="flex flex-col lg:flex-row items-center gap-4 p-4">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link href="/" className="font-bold shrink-0">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="w-24 lg:w-28"
            />
          </Link>

          <div className="lg:hidden">
            {/* <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal"> */}
                {user && <button onClick={logout} className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                  Déconnexion
                </button>}
              {/* </SignInButton>
            </SignedOut> */}
          </div>
        </div>

        {/* Search Bar - Full width on mobile */}
      
        <div className="w-full lg:max-w-2xl">
          <SearchBar />
        </div>
        <div className="hidden lg:block ml-auto">
          
           {user? <div className="flex items-center gap-3">
              <Link href="/seller">
                <button className="bg-gradient-to-r from-blue-500 hover:from-blue-600  to-purple-600 hover:to-purple-700 text-white px-3 py-1.5 text-sm rounded-lg  transition">
                  Devenir vendeur
                </button>
              </Link>

              <Link href="/tickets">
                <button className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                  Mes Tickets
                </button>
              </Link>
              
            </div>:
            <div className="flex items-center gap-3">
            <Link href="/sign-up">
              <button className="bg-gradient-to-r from-blue-500 hover:from-blue-600  to-purple-600 hover:to-purple-700 text-white px-3 py-1.5 text-sm rounded-lg  transition">
                S'enregsitrer
              </button>
            </Link>

            <Link href="/sign-in">
              <button className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                Se Connecter
              </button>
            </Link>
            
          </div>
            }
          

          
              
        
        </div>
       
        {/* Mobile Action Buttons */}
        <div className="lg:hidden w-full flex justify-center gap-3">
          
          {  user? <> <Link href="/seller" className="flex-1">
              <button className="w-full bg-gradient-to-r from-blue-500 hover:from-blue-600  to-purple-600 hover:to-purple-700 text-white px-3 py-1.5 text-sm rounded-lg  transition">
                Devenir vendeur
              </button>
            </Link>

            <Link href="/tickets" className="flex-1">
              <button className="w-full bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                Mes Tickets
              </button>
            </Link>
            </>: <> <Link href="/sing-up" className="flex-1">
              <button className="w-full bg-gradient-to-r from-blue-500 hover:from-blue-600  to-purple-600 hover:to-purple-700 text-white px-3 py-1.5 text-sm rounded-lg  transition">
                S'enregistrer
              </button>
            </Link>

            <Link href="/sign-in" className="flex-1">
              <button className="w-full bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                Se Connecter
              </button>
            </Link>
            </>

            }
    
        </div>
      </div>
    </div>
  );
}

export default Header;
