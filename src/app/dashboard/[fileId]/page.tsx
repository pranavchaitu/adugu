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
    const user = await getUser()
    const router = useRouter()
    const { fileId } = params
    if(!user || !user.id) {
        router.push(`/auth-callback?origin=dashboard/${fileId}`)
    }
    const file = await db.file.findFirst({
        where : {
            id : fileId,
            userId : user.id
        }
    })
    if(!file) return notFound()
    return <div>
        {params.fileId}
    </div>
}

export default Page