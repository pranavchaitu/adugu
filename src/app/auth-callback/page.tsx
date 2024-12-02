'use client'

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";

function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')

  try {
    const { data } = trpc.authCallback.useQuery()
    if(data?.success) {
      router.push(origin ? `/${origin}` : '/dashboard')
    } else {
      router.push('/sign-in')
    }
  } catch (error) { 
    router.push('/sign-in')
  }
  
  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="animate-spin h-8 w-8 text-zinc-800"/>
        <h3 className="text-xl font-semibold">
          Setting up your account...
        </h3>
        <p>you will be redirected automatically</p>
      </div>
    </div>
  )
}

export default Page;