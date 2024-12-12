"use client"
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import {useCookies} from "next-client-cookies"
export default function getCurrentUser(){
    const cookies = useCookies()
    const id = cookies.get("auth")
    const user = useQuery(api.users.getUserById, { userId:id? id:'' });
    return user
}