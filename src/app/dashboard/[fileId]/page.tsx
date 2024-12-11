'use client'

import { trpc } from "@/app/_trpc/client"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { notFound, useRouter } from "next/navigation"

interface PageProps {
    params : {
        fileId : string
    }
}

async function Page({ params } : PageProps) {
    const { getUser } = getKindeServerSession()
    const router = useRouter()
    let file;
    const {mutate} = trpc.getFile.useMutation({
        onSuccess(f) {
            file = f
        }
    })
    const { fileId } = params
    mutate({
        key : fileId
    })
    const user = await getUser()
    if(!user || !user.id) {
        router.push(`/auth-callback?origin=dashboard/${fileId}`)
    }
    if(!file) return notFound()
    return <div>
        {params.fileId}
    </div>
}

export default Page