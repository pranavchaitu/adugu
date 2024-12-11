import { Document,pdfjs } from "react-pdf"
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface PageProps {
    url : string
}

function PdfRenderer({ url } : PageProps) {
    return <>
        <Document 
            file={url}
        />
    </>
}

export default PdfRenderer;