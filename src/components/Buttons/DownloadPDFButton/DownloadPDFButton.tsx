import { PDFDownloadLink } from "@react-pdf/renderer";
import SaveToPDF from "../../SaveToPDF/SaveToPDF";
import { ConvertProps } from "../../../Interfaces/types";


export default function DownloadPDFButton({TestToConvert}:ConvertProps) {
  return (
    <PDFDownloadLink document={<SaveToPDF TestToConvert={TestToConvert}/>} fileName="cool Stuff">
        {({loading})=>(loading?<button disabled>Creating PDF</button>:<button>Download PDF</button>)}
    </PDFDownloadLink>
  )
}
