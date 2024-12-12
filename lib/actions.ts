"use server"
import { Id } from "@/convex/_generated/dataModel";
import { cookies } from "next/headers";

export default async function setCookies(id:string){
    const cookieStore = await cookies()
    cookieStore.set("auth",id,{expires:new Date(new Date().getTime() + 1000 * 60 * 60 * 24)})
}

export async function getUserId(){
    const cookieStore = await cookies()
    const id = cookieStore.get("auth")?.value
    return id
}