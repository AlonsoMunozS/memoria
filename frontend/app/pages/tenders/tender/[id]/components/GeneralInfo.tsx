import { Accordion, AccordionTab } from "primereact/accordion";
import { Tender } from "../../models/Tender";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
interface tenderProps {
    tender: Tender | undefined
}
const GeneralInfo = ({ tender }: tenderProps) => {
    return (
        <div>
            <Accordion>
                <AccordionTab header="Ver información general" >
                    {tender && <div className="contenedor-tenderInfo">
                        <div className="part1"><p><strong>ID:</strong> {tender.id}</p>
                            <p><strong>Nombre:</strong>{tender.name}</p>
                            <p><strong>SAFI:</strong> {tender.safi}</p>
                            <p><strong>Provincia:</strong> {tender.province}</p>
                            <p><strong>Comuna:</strong> {tender.commune}</p>
                            <p><strong>Dirección:</strong> {tender.address}</p>
                        </div>
                        <div className="part2">
                            <Divider layout="vertical" />
                        </div>
                        <div className="part3">
                            <p><strong>Fecha de Creación:</strong> {tender.createdAt}</p>
                            <p><strong>Creado Por:</strong> {tender.createdBy}</p>
                            <p><strong>Etapa Actual:</strong> {tender.currentStage}</p>
                            <p><strong>ID en Mercado Público:</strong> {tender.mercadoPublicoId}</p>
                            <p><strong>Categoría:</strong> {tender.category}</p>
                            <p><strong>Empresas Asociadas:</strong> {tender.companies ? tender.companies : "Ninguna"}</p>
                        </div>
                    </div>}
                </AccordionTab>
            </Accordion>

        </div>
    );
}

export default GeneralInfo;