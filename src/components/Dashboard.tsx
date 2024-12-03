'use client'

import { trpc } from "@/app/_trpc/client";
import UploadButton from "./UploadButton";
import { Ghost, Loader2, MessageSquare, Plus, Trash } from "lucide-react";
import Skeleton from "react-loading-skeleton"
import Link from "next/link"
import { format } from "date-fns"
import { Button } from "./ui/button"; 
import { useState } from "react";

function Dashboard() {
    const [currentDeletingFile,setCurrentDeletingFile] = useState<string | null>(null)
    const utils = trpc.useContext()
    const {data : files,isLoading} = trpc.getUserFiles.useQuery()
    const { mutate : deleteFile } = trpc.deleteFile.useMutation({
        onSuccess : () => {
            utils.getUserFiles.invalidate()
        },
        onMutate : ({ id }) => {
            setCurrentDeletingFile(id)
        },
        onSettled() {
            setCurrentDeletingFile(null)
        }
    })
    

    return (
        <main className="max-w-7xl md:p-10 p-4 mx-auto">
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center items-start justify-between pb-2 sm:pb-0 border-gray-200 border-b sm:gap-0">
                <h1 className="mb-3 font-bold text-5xl text-gray-900 dark:text-gray-400">
                    My Files
                </h1>
                <UploadButton />
            </div>
            {/* files */}
            { files && files.length != 0 ? (
                <ul className="mt-8 gap-6 divide-y divide-zinc-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {files.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((file) => {
                        return (
                            <li key={file.id} className="col-span-1 divide-gray-200 rouded-lg bg-white dark:bg-gray-300 dark:text-black shadow transition hover:shadow-lg">
                                <Link href={`/dashboard/${file.id}`} className="flex flex-col gap-2">
                                    <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                                        <div className="w-10 h-10 rounded-full flex-shrink-0 bg-gradient-to-r from-cyan-500 to-blue-500"/>
                                        <h3 className="truncate text-lg font-medium text-zinc-800">
                                            {file.name}
                                        </h3>
                                    </div>
                                </Link>
                                <div className="px-6 py-2 grid grid-cols-3 place-items-center gap-6 text-xs text-zinc-500">
                                    <div className="flex gap-2 items-center">
                                        <Plus className="w-4 h-4"/>
                                        <p>{format(new Date(file.createdAt),'MM yyyy')}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4"/>
                                        mocked
                                    </div>
                                    <Button
                                        onClick={() =>
                                        deleteFile({ id: file.id })
                                        }
                                        size='sm'
                                        className='w-full'
                                        variant='destructive'>
                                        {file.id == currentDeletingFile ? (
                                            <Loader2 className="h-4 w-4 animate-spin"/>
                                        ) :(
                                            <Trash className='h-4 w-4' />
                                        )}
                                    </Button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            ) : isLoading ? (
                <Skeleton count={3} height={100} className="my-2"/>
            ) :  (
                <div className="mt-16 gap-2 flex flex-col items-center">
                    <Ghost className="h-8 w-8 text-zinc-800"/>   
                    <h3 className="font-semibold text-xl">
                        Pretty empty around here
                    </h3>
                    <p>Let&apos;s upload your first PDF.</p>
                </div>
              )}
        </main>
    )
}

export default Dashboard;