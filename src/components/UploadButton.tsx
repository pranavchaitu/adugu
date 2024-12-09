import { Cloud, File, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Dropzone from "react-dropzone"
import { useState } from "react"
import { Progress } from "./ui/progress"
import { useUploadThing } from "@/lib/uploadthing"
import { toast } from "@/hooks/use-toast"
import { trpc } from "@/app/_trpc/client"
import { useRouter } from "next/navigation"
import createFile from "@/lib/actions/createFile"

function UploadDropzone() {
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const { startUpload } = useUploadThing("pdfUploader")
  const router = useRouter()
  const { mutate : startPolling } = trpc.getFile.useMutation({
    onSuccess(file) {
      router.push(`/dashboard/${file.id}`)
    },
    retry : true,
    retryDelay : 500,
  })

  function startSimulatedProgress() {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if(uploadProgress >= 95) {
          clearInterval(interval)
          return prevProgress
        }
        return prevProgress + 5
      })
    },500)
    return interval
  }

  return <Dropzone multiple={false} onDrop={async (acceptedFile) => {
    setIsUploading(true)
    const progressInterval = startSimulatedProgress()
    // the upload thing call
    const res = await startUpload(acceptedFile)

    if(!res) {
      return toast({
        title : "Something went wrong",
        description : "Please try again later",
        variant : "destructive"
      })
    } 

    const [fileResponse] = res 

    const { key } = fileResponse
    if(!key) {
      return toast({
        title : "Something went wrong",
        description : "Please try again later",
        variant : "destructive"
      })
    }


    //custom create for db call
    createFile(fileResponse)

    clearInterval(progressInterval)
    setUploadProgress(100)
    startPolling({ key })

  }}>
    {({getRootProps, getInputProps, acceptedFiles}) => (
      <div {...getRootProps()}
        className="border border-dashed h-64 m-4 rounded-lg border-gray-300"
      >
        <div className="flex flex-col items-center justify-center w-full h-full rounded-lg gap-2">
          <Cloud className="w-5 h-5"/>
          <label htmlFor="dropzone-file"
            className="text-xs cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              <div>
                <span className="font-semibold">Click to upload{" "}</span>or drag and drop
              </div>
              {acceptedFiles && acceptedFiles[0] ? (
                <div className="px-2 flex gap-2 border divide-x-2 items-center divide-gray-200">
                  <div className="flex items-center">
                    <File className="w-4 h-4 text-blue-500"/>
                  </div>
                  <div>
                    <p className="p-2 text-xs pl-2">{acceptedFiles[0].name}</p>
                  </div>
                </div>            
              ):null}
              {isUploading ? (
                <Progress indicatorColor={
                  uploadProgress == 100 ? 'bg=green-500' : ""
                } value={uploadProgress} />
                // { uploadProgress == 100 ? (
                //   <div className="text-center">
                //     <Loader2 className="w-3 h-3 animate-spin"/>
                //     <div>Redirecting...</div>
                //   </div>
                // ) : null }
              ): null}
              <input {...getInputProps()} type="file" id="dropzone-file" className="hidden"/>
            </div>
            
          </label>
        </div>
      </div>
    )}
  </Dropzone>
}

function UploadButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle />
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  )
}

export default UploadButton