"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "convex/react";
import {useCookies} from "next-client-cookies"
import { useState, useTransition } from 'react';
import { useEffect } from "react";
import { Label } from "./ui/label";


export default function SigninForm() {
   const router = useRouter();
   const { toast } = useToast();
   const [isPending,startTransition] = useTransition()
   const cookies = useCookies()
   const [email,setEmail] = useState("")


  async function sendData(){
  //  const getUser = useQuery(api.users.getUserByPhone,{email:""})   
    
    startTransition(
      async () => {
        try{
             if(email){
              cookies.set("email",email)
              router.push("/login")
             }
             else{
              toast({
                variant: "destructive",
                title: "Veillez entrer un numéro de téléphone",
                 description: "",
               }); 
             }
        }
        catch(error){

        }
      }
    )
  }


  
  return (
    <>
      
        {/* Form fields */}
       <div className="space-y-4 mb-5">
           <Label className="mb-3">Numéro de téléphone*</Label>
           <Input name="email" placeholder='Exemple (+237671434007) veillez respectez le format!'  value = {email} onChange={(e)=>setEmail(e.target.value)}/>

         
        </div>


        <Button
          type="button"
          onClick={()=>sendData()}
          disabled={isPending}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-purple-800 hover:to-blue-900 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Veillez patienter...
            </>
          ) : "Se Connecter"}
        </Button>
  
  
    </>
  );
}
