"use client";
import React,{useEffect,FormEvent} from 'react'
import {ConfirmationResult,RecaptchaVerifier,signInWithPhoneNumber} from "firebase/auth"
import {auth} from "@/firebase"
import {InputOTP,InputOTPGroup,InputOTPSeparator,InputOTPSlot} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Nom obligatoire"),
  email: z.string().min(1, "Contact obligatoire"),
  location: z.string().min(1, "Localisation obligatoire"),
});

type FormData = z.infer<typeof formSchema>;

interface InitialUserData {
  _id: Id<"events">;
  name: string;
  email: string;
  location: string;
}

interface EventFormProps {
  mode: "create" | "edit";
  initialData?: InitialUserData;
}

export default function SignupForm({ mode, initialData }: EventFormProps) {
  const createUser = useMutation(api.users.create);
  const updateUser = useMutation(api.users.updateUser);
  const router = useRouter();
  const { toast } = useToast();
  // const [phoneNumber,setPhoneNumber] = useState("")
  const [error,setError] = useState<String|null>(null)
  const [success,setSuccess] = useState("")
  const [resendCountdown,setResendCountdown] = useState(0)
  const [recaptchapVerifier,setRecaptchapVerifier] = useState<RecaptchaVerifier|null>(null)
  const [confirmationResult,setConfirmationResult] = useState<ConfirmationResult|null>(null)
  const [isPending,startTransition] = useTransition()
  const [otp,setOtp] = useState<string>("")
  // Image upload
  useEffect(
    ()=>{
        let timer: NodeJS.Timeout
        if(resendCountdown>0){
            timer = setTimeout(()=>setResendCountdown(resendCountdown - 1),1000)    
        }
        return ()=>clearTimeout(timer)
    },[resendCountdown]
  )
  const verifyOtp = async () =>{
    startTransition(
      async ()=>{
          setError("")
          if(!confirmationResult){
              return
          }
          try{
              const r = await confirmationResult.confirm(otp)
              if(r.user.uid){
              const eventId = await createUser({
                name:form.getValues("name"),
                location:form.getValues("location"),
                email:form.getValues("email"),
                userId:r.user.uid
              });
              router.push(`/`);
              }
          }
          catch(error:any){
              setError("La vérification de l'OTP a échoué")
          }
      }
    )
  }
  useEffect(
    ()=>{
        const recaptchapVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
              size:"invisible"
          }
      )
      setRecaptchapVerifier(recaptchapVerifier)
      return () => {
          recaptchapVerifier.clear()
      }  // Code qui utilise l'objet window
        
    },[auth]
  )
  useEffect(
  ()=>{
      if(otp.length === 6){
          verifyOtp()
      } 
  },[otp]
  )
const requestOtp = async (e?: FormEvent<HTMLFormElement>) =>{
    e?.preventDefault()
    
    startTransition(
      async () => {
         setError("")
         if(!recaptchapVerifier){
             return setError("Le Recapchat n'est pas initialisé") 
         }
         try{
             const confirmationResult = await signInWithPhoneNumber(auth,form.getValues("email").toString())
             setConfirmationResult(confirmationResult)
             setSuccess("L'OTP a été renouvelé avec success")
         }
         catch(error:any){
             console.log(error)
             if(error.code === "auth/invalid-phone-number"){
                 setError("Numéro de téléphone invalide!")
             }
             else if(error.code === "auth/too-many-requests")
             {
                 setError("Plusieurs requêtes ont été lancées, Veillez ressayer plus tard")
             }
             else{
              setError("Une erreur s'est produite, veillez recommencer!")
             }

             setResendCountdown(0) 
         }        
      }
    )
}
const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      location:initialData?.location??"",
      email:initialData?.email??"",
    },
});

  async function onSubmit(values: FormData) {
    setResendCountdown(60)
    startTransition(async () => {
      try {
      
        // Handle image deletion/update in edit mode
        if(!success && mode === "create"){
          if(!recaptchapVerifier){
            toast({
              variant: "destructive",
              title: "Recaptchap n'est pas initialisé",
              description: "There was a problem with your request.",
            });
            return 
          }
   
          setError("")
          const confirmationResult = await signInWithPhoneNumber(auth,"+237671434007",recaptchapVerifier)
          setConfirmationResult(confirmationResult)
          setSuccess("L'OTP a été renouvelé avec success")
          return
        }
        else{
          if (!initialData) {
            throw new Error("Initial user data is required for updates");
          }

          // Update event details
          await updateUser({
            ...values,
            userId:"df"
          });

          // Update image - this will now handle both adding new image and removing existing image
        

          toast({
            title: "Données modifiées",
            description: "Les données de votre compte ont été modifiées avec succès.",
          });

          router.push(`/`);
  
        }
      } catch (error:any) {
        let msg =""
        console.error("Failed to handle event:", error);
        console.log(error)
        if(error.code === "auth/invalid-phone-number" || error.code === "auth/argument-error"){
            msg ="Numéro de téléphone invalide!"
        }
        else if(error.code === "auth/too-many-requests")
        {
            setError("Plusieurs requêtes ont été lancées, Veillez ressayer plus tard")
        }
        else{
         setError("Une erreur s'est produite, veillez recommencer!")
        }

        setResendCountdown(0) 
        toast({
          variant: "destructive",
          title: msg,
          description: "There was a problem with your request.",
        });
      }
    });
  }
  async function submit(){
    await form.handleSubmit(onSubmit)
  }




  
  return (
    <>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Form fields */}
     {!confirmationResult &&   <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de téléphone*</FormLabel>
                <FormControl>
                  <Input  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pays*</FormLabel>
                <FormControl>
                  <Input  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>}
        {
            confirmationResult && (
                <InputOTP maxLength={6} value = {otp} onChange={(value)=>setOtp(value)}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0}/>
                        <InputOTPSlot index={1}/>
                        <InputOTPSlot index={2}/>
                    </InputOTPGroup>
                    <InputOTPSeparator/>
                    <InputOTPGroup>
                        <InputOTPSlot index={3}/>
                        <InputOTPSlot index={4}/>
                        <InputOTPSlot index={5}/>
                    
                    </InputOTPGroup>   
                </InputOTP>
            )
        }
    <div id="recaptcha-container"/>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-purple-800 hover:to-blue-900 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Veillez patienter...
            </>
          ) : mode === "create" ? (
            "S'enregistrer"
          ) : (
            "Modifier"
          )}
        </Button>
      </form>
    </Form>
  
    </>
  );
}
