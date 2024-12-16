'use client'

import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Document,Page,pdfjs } from "react-pdf"
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useResizeDetector } from "react-resize-detector"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PageProps {
    url : string
}

function PdfRenderer({ url } : PageProps) {
    const { width,ref } = useResizeDetector()
    const { toast } = useToast();

    return <>
        <div ref={ref} className="flex-1 w-full max-h-screen"> 
            <div>
                feature bar
            </div>
            <Document 
                file={url}
                loading={
                    <div  className="flex justify-center">
                        <Loader2 className="my-24 w-6 h-6 animate-spin"/>
                    </div>
                }
                onLoadError={ () => (
                    toast({
                        title : "error loading PDF",
                        description : "please try again later",
                        variant : "destructive"
                    }))
                }
                >
                <Page 
                    pageIndex={1}
                    width={width ? width : 1}
                />
            </Document>
        </div>
    </>
}

export default PdfRenderer;