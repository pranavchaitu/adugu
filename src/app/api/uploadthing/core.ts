import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({
    pdf: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const  { getUser } = getKindeServerSession()
      const user = await getUser()
      if(!user || !user.id) {
        throw new UploadThingError({code : "FORBIDDEN"})
      }
      return {
        userId : user.id
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: file.url,
          uploadStatus: "PROCESSING",
         },
      })
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
