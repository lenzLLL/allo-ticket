"use client"
import dynamic from 'next/dynamic';
import Loading from '../loading';
import { useQuery } from 'convex/react';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import { api } from '@/convex/_generated/api';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
// Dynamically import your component with SSR disabled
const SigninForm= dynamic(() => import('@/components/signinForm'), { ssr: false });

export default function SignIn() {
 const router = useRouter()
 const cookies = useCookies()
 const email = cookies.get("email")
 let data = email? email:""
 const getUser = useQuery(api.users.getUserByPhone,{email:data})
 const {toast} = useToast()
 useEffect(
    ()=>{
        setTimeout(
            ()=>{
                if(getUser){
                    cookies.set("auth",getUser.userId)
                }
                if(!getUser){
                    router.push("/sign-in")
                     toast({
                                     variant: "destructive",
                                     title: "L'utilisateur ayant ce numéro de téléphone n'existe pas dans la base de données",
                                      description: "Veillez vérifer votre contact et recommencer s'il vous plaît.",
                    });  
                  } 
                  else{
                     toast({
                         title: "Connexion réussie",
                          description: "Bienvenue sur AlloTicket.",
                 });
                  cookies.set("auth",getUser.userId)  
                  router.push("/")
                  router.refresh()
                  }
            },1500
        )
      
    },[getUser]
 )
 return (
    <div className="max-w-3xl mx-auto p-6">
     <Loading/>
    </div>
  );
}
