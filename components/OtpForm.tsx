"use client"
import React,{useEffect, useState, useTransition,FormEvent} from 'react'
import {ConfirmationResult,RecaptchaVerifier,signInWithPhoneNumber} from "firebase/auth"
import {auth} from "@/firebase"
import { useRouter } from 'next/navigation'
import {InputOTP,InputOTPGroup,InputOTPSeparator,InputOTPSlot} from "@/components/ui/input-otp"
import { Input } from './ui/input'
import { Button } from './ui/button'
export default function OtpForm() {
  const router = useRouter()
  const [phoneNumber,setPhoneNumber] = useState("")
  const [error,setError] = useState<String|null>(null)
  const [success,setSuccess] = useState("")
  const [resendCountdown,setResendCountdown] = useState(0)
  const [recaptchapVerifier,setRecaptchapVerifier] = useState<RecaptchaVerifier|null>(null)
  const [confirmationResult,setConfirmationResult] = useState<ConfirmationResult|null>(null)
  const [isPending,startTransition] = useTransition()
  const [otp,setOtp] = useState<string>("")
  useEffect(
    ()=>{
        let timer: NodeJS.Timeout
        if(resendCountdown>0){
            timer = setTimeout(()=>setResendCountdown(resendCountdown - 1),1000)    
        }
        return ()=>clearTimeout(timer)
    },[resendCountdown]
  )
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
        }
    },[auth]
  )
  const verifyOtp = async () =>{
      startTransition(
        async ()=>{
            setError("")
            if(!confirmationResult){
                return
            }
            try{
                await confirmationResult.confirm(otp)
            }
            catch(error:any){
                setError("La vérification de l'OTP a échoué")
            }
        }
      )
  }
  useEffect(
    ()=>{
        if(otp.length === 6){
            verifyOtp()
        } 
    },[otp]
  )
  const requestOtp = async (e?: FormEvent<HTMLFormElement>) =>{
      e?.preventDefault()
      setResendCountdown(60)
      startTransition(
        async () => {
           setError("")
           if(!recaptchapVerifier){
               return setError("Le Recapchat n'est pas initialisé") 
           }
           try{
               const confirmationResult = await signInWithPhoneNumber(auth,phoneNumber,recaptchapVerifier)
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
  return (
    <div>
        {
            !confirmationResult && (
                <form>
                    <Input className='text-black' type='tel' value = {phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                    <Button
                        disabled = {!phoneNumber || isPending || resendCountdown >0}
                        onClick={()=>requestOtp()}
                        className='mt-5'
                    >
                        {
                            resendCountdown>0?"Renvoyer l'OTP dans "+resendCountdown+" secondes":isPending?"Sending...":"Envoyer l'OTP"
                        }
                    </Button>
                </form>
            )
        }
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
        <div className='p-10 text-center'>
            {error && <p className='text-red-500'>{error}</p>}
            {success && <p className='text-green-500'>{success}</p>}
        </div>
        <div className='recaptcha-container'/>
    </div>
  )
}
