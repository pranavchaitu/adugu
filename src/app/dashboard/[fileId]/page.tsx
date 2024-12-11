import PdfRenderer from "@/components/pdfRenderer"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { notFound, redirect } from "next/navigation"

interface PageProps {
    params : {
        fileId : string
    }
}

async function Page({ params } : PageProps) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const { fileId } = params
    if(!user || !user.id) {
        redirect(`/auth-callback?origin=dashboard/${fileId}`)
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
        <div className="grid grid-cols-1 md:grid-cols-5 h-screen">
            <div className="border md:col-span-3">
                <PdfRenderer url={file.url} />
            </div>
            <div className="border md:col-span-2">chat section</div>
        </div>
    </div>
}

export default Page