'use server'

import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { ClientUploadedFileData } from "uploadthing/types"

async function createFile(file : ClientUploadedFileData<null>) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: user.id,
          url: file.url,
          uploadStatus: "PROCESSING",
        },
    })
}

export default createFile