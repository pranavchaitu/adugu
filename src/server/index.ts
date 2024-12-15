import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { TRPCError } from '@trpc/server'
import { privateProcedure, publicProcedure, router } from './trpc'
import { z } from "zod"

export const appRouter = router({
    authCallback : publicProcedure.query(async () => {
        const { getUser } = getKindeServerSession()
        const user = await getUser()
        if(!user.email || !user.id) {
            throw new TRPCError({code : "UNAUTHORIZED"})
        }
        const dbUser = await db.user.findFirst({
            where : {
                id : user.id
            }
        })
        
        if(!dbUser) {
            await db.user.create({
                data : {
                    id : user.id,
                    email : user.email
                }
            })
        } 
        return {
            success : true
        }
    }),
    getUserFiles : privateProcedure.query(async ({ctx}) => {
        return await db.file.findMany({
            where : {
                userId : ctx.userId
            }
        })
    }),
    deleteFile : privateProcedure.input(z.object({
        id : z.string()
    })).mutation(async ({ ctx,input }) => {
        const { userId } = ctx
        const file = await db.file.findFirst({
            where : {
                id : input.id,
                userId
            }
        }) 
        if(!file) {
            throw new TRPCError({code : "NOT_FOUND"})
        }       
        await db.file.delete({
            where : {
                id : input.id,
            }
        })
        return file
    }),
    getFile : privateProcedure.input(z.object({
        key : z.string()
    })).mutation( async ({ ctx,input }) => {
        const { userId } = ctx
        const file = await db.file.findFirst({
            where : {
                key : input.key,
                userId
            }
        })
        if(!file) throw new TRPCError({code : "UNAUTHORIZED"})
        return file
    })
})

export type AppRouter = typeof appRouter